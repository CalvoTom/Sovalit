"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { site } from "@/lib/site";
import { notifyContact } from "@/lib/notify";

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
  if (formData.get("website")) return { status: "success", message: "Vous recevrez une réponse sous 24 h à l'adresse indiquée." };

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
    return { status: "error", message: "Certains champs sont à corriger.", errors };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Trop de demandes envoyées depuis cette connexion. Réessayez dans 10 minutes." };
  }

  const d = parsed.data;
  const sent = await notifyContact({ ...d, company: d.company ?? "" });
  if (sent === null) {
    return { status: "error", message: `L'envoi par formulaire n'est pas disponible. Écrivez directement à ${site.email}.` };
  }
  if (!sent) {
    return { status: "error", message: `La demande n'a pas pu être envoyée. Réessayez, ou écrivez à ${site.email}.` };
  }

  return { status: "success", message: "Vous recevrez une réponse sous 24 h à l'adresse indiquée." };
}
