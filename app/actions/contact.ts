"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { site } from "@/lib/site";

// Limite simple anti-abus : 5 envois par IP toutes les 10 minutes (mémoire du serveur).
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : rempli uniquement par les robots
  if (formData.get("website")) return { status: "success", message: "Merci, votre demande a bien été envoyée." };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    email: formData.get("email"),
    needs: formData.getAll("needs"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Merci de vérifier les champs indiqués.", errors };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Trop de demandes envoyées. Réessayez dans quelques minutes." };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP non configuré : définissez SMTP_HOST, SMTP_USER et SMTP_PASS.");
    return { status: "error", message: `L'envoi est momentanément indisponible. Écrivez-nous à ${site.email}.` };
  }

  const d = parsed.data;
  const port = Number(SMTP_PORT ?? 465);
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Site Sovalit" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || site.email,
      replyTo: `"${d.name.replace(/"/g, "")}" <${d.email}>`,
      subject: `Nouveau projet — ${d.name}${d.company ? ` (${d.company})` : ""}`,
      text: [
        `Nom : ${d.name}`,
        `Entreprise : ${d.company || "-"}`,
        `Email : ${d.email}`,
        `Besoin : ${d.needs.join(", ") || "Non précisé"}`,
        "",
        d.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] Échec de l'envoi :", err);
    return { status: "error", message: `L'envoi a échoué. Réessayez ou écrivez-nous à ${site.email}.` };
  }

  return { status: "success", message: "Merci ! Votre demande a bien été envoyée. Je vous réponds sous 24 h." };
}
