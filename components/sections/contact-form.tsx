"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { sendContact } from "@/app/actions/contact";
import type { ContactState } from "@/lib/contact-schema";
import { needs } from "@/lib/site";
import { ButtonArrow, buttonClass } from "@/components/ui/button";

const field =
  "w-full rounded-xl border-[1.5px] border-givre-2 bg-givre px-4 py-3.5 text-[0.95rem] font-medium text-ink outline-none transition-colors placeholder:text-acier/70 focus:border-electrik focus:bg-white aria-invalid:border-[#e0475b]";
const label = "grid gap-1.5 text-[0.85rem] font-semibold text-ink";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? <span id={id} className="text-[0.8rem] font-medium text-[#e0475b]">{msg}</span> : null;
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="relative grid place-items-center gap-4 rounded-[32px] bg-white p-10 text-center" role="status">
        <CheckCircle2 className="size-14 text-electrik" aria-hidden />
        <p className="font-title text-xl font-semibold text-ink">{state.message}</p>
      </div>
    );
  }

  // Soumission manuelle : évite que React vide les champs quand la validation échoue
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  };

  const e = state.errors ?? {};
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4 rounded-[32px] bg-white p-8 text-acier max-sm:p-[22px]">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Nom
          <input name="name" required autoComplete="name" placeholder="Jeanne Dupont" className={field}
            aria-invalid={!!e.name} aria-describedby={e.name ? "err-name" : undefined} />
          <FieldError id="err-name" msg={e.name} />
        </label>
        <label className={label}>
          Entreprise
          <input name="company" autoComplete="organization" placeholder="Votre société" className={field} />
        </label>
      </div>
      <label className={label}>
        Email
        <input name="email" type="email" required autoComplete="email" placeholder="jeanne@entreprise.fr" className={field}
          aria-invalid={!!e.email} aria-describedby={e.email ? "err-email" : undefined} />
        <FieldError id="err-email" msg={e.email} />
      </label>

      <fieldset>
        <legend className="mb-2 text-[0.85rem] font-semibold text-ink">Votre besoin</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="checkbox" name="needs" value={n} className="peer sr-only" />
              <span className="block rounded-full border-[1.5px] border-givre-2 bg-givre px-4 py-2 text-[0.85rem] font-semibold transition-colors peer-checked:border-electrik peer-checked:bg-electrik peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-electrik">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={label}>
        Votre projet
        <textarea name="message" rows={4} required placeholder="Quelques mots sur votre besoin, vos objectifs, vos délais…"
          className={`${field} resize-y`} aria-invalid={!!e.message} aria-describedby={e.message ? "err-message" : undefined} />
        <FieldError id="err-message" msg={e.message} />
      </label>

      {/* Champ piège anti-spam, invisible pour les humains */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <button type="submit" disabled={pending} className={buttonClass("primary", "md", "w-full")}>
        {pending ? (<><LoaderCircle className="size-4 animate-spin" aria-hidden /> Envoi en cours…</>) : (<>Envoyer ma demande <ButtonArrow /></>)}
      </button>
      <p role="status" aria-live="polite" className="min-h-[1.2em] text-center text-[0.9rem] text-[#e0475b]">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
