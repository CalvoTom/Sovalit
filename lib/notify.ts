import "server-only";
import nodemailer from "nodemailer";
import { site } from "./site";

export type ContactRequest = {
  name: string;
  company: string;
  email: string;
  needs: string[];
  message: string;
};

type Channel = { name: string; send: (r: ContactRequest) => Promise<void> };

/** Email via SMTP (OVH, Gmail…). Actif si SMTP_HOST, SMTP_USER et SMTP_PASS sont définis. */
function emailChannel(): Channel | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return {
    name: "email",
    send: async (r) => {
      await transporter.sendMail({
        from: `"Site Sovalit" <${SMTP_USER}>`,
        to: CONTACT_TO_EMAIL || site.email,
        replyTo: `"${r.name.replace(/"/g, "")}" <${r.email}>`,
        subject: `Nouveau projet — ${r.name}${r.company ? ` (${r.company})` : ""}`,
        text: [
          `Nom : ${r.name}`,
          `Entreprise : ${r.company || "-"}`,
          `Email : ${r.email}`,
          `Besoin : ${r.needs.join(", ") || "Non précisé"}`,
          "",
          r.message,
        ].join("\n"),
      });
    },
  };
}

/** Message WhatsApp via CallMeBot. Actif si CALLMEBOT_PHONE et CALLMEBOT_APIKEY sont définis. */
function whatsappChannel(): Channel | null {
  const phone = process.env.CALLMEBOT_PHONE?.replace(/[\s.-]/g, "");
  const apikey = process.env.CALLMEBOT_APIKEY?.trim();
  if (!phone || !apikey) return null;
  return {
    name: "whatsapp",
    send: async (r) => {
      const excerpt = r.message.length > 700 ? `${r.message.slice(0, 700)}…` : r.message;
      const text = [
        `*Nouvelle demande sur sovalit.com*`,
        `👤 ${r.name}${r.company ? ` (${r.company})` : ""}`,
        `✉️ ${r.email}`,
        `🧩 ${r.needs.join(", ") || "Besoin non précisé"}`,
        "",
        excerpt,
      ].join("\n");
      const url = new URL("https://api.callmebot.com/whatsapp.php");
      url.searchParams.set("phone", phone);
      url.searchParams.set("text", text);
      url.searchParams.set("apikey", apikey);
      const res = await fetch(url, { signal: AbortSignal.timeout(10_000), cache: "no-store" });
      const body = await res.text();
      // CallMeBot répond 200 même en cas de clé invalide : on vérifie aussi le contenu
      if (!res.ok || /error|invalid|not allowed/i.test(body)) {
        throw new Error(`CallMeBot ${res.status} : ${body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200)}`);
      }
    },
  };
}

/**
 * Transmet la demande sur tous les canaux configurés, en parallèle.
 * Renvoie true si au moins un canal a réussi ; null si aucun canal n'est configuré.
 */
export async function notifyContact(request: ContactRequest): Promise<boolean | null> {
  const channels = [emailChannel(), whatsappChannel()].filter((c): c is Channel => c !== null);
  if (channels.length === 0) {
    console.error("[contact] Aucun canal configuré : définissez les variables SMTP_* et/ou CALLMEBOT_*.");
    return null;
  }
  const results = await Promise.allSettled(channels.map((c) => c.send(request)));
  results.forEach((res, i) => {
    if (res.status === "rejected") console.error(`[contact] Échec du canal ${channels[i].name} :`, res.reason);
  });
  return results.some((res) => res.status === "fulfilled");
}
