"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { sendContact } from "@/app/actions/contact";
import type { ContactState } from "@/lib/contact-schema";
import { needs } from "@/lib/site";
import { ButtonChip, buttonClass } from "@/components/ui/button";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-mute focus:border-electrik aria-invalid:border-[#d64545]";
const label = "grid gap-2 text-sm font-medium text-ink";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? <span id={id} className="text-[0.85rem] font-normal text-[#d64545]">{msg}</span> : null;
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  // Soumission manuelle : évite que React vide les champs quand la validation échoue
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="grid content-center justify-items-start gap-4 rounded-3xl bg-white p-10 ring-1 ring-line">
        <CheckCircleIcon weight="fill" className="size-12 text-electrik" />
        <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Demande envoyée.</p>
        <p>{state.message}</p>
      </div>
    );
  }

  const e = state.errors ?? {};
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Nom
          <input name="name" required autoComplete="name" placeholder="Jeanne Dupont" className={field}
            aria-invalid={!!e.name} aria-describedby={e.name ? "err-name" : undefined} />
          <FieldError id="err-name" msg={e.name} />
        </label>
        <label className={label}>
          Entreprise <span className="sr-only">(facultatif)</span>
          <input name="company" autoComplete="organization" placeholder="Facultatif" className={field} />
        </label>
      </div>
      <label className={label}>
        Email professionnel
        <input name="email" type="email" required autoComplete="email" placeholder="jeanne@entreprise.fr" className={field}
          aria-invalid={!!e.email} aria-describedby={e.email ? "err-email" : undefined} />
        <FieldError id="err-email" msg={e.email} />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Votre besoin</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="checkbox" name="needs" value={n} className="peer sr-only" />
              <span className="block rounded-full border border-line bg-white px-4 py-2 text-[0.92rem] text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-electrik">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={label}>
        Votre projet
        <textarea name="message" rows={5} required placeholder="Ce que vous souhaitez construire, pour qui, et dans quels délais."
          className={`${field} resize-y`} aria-invalid={!!e.message} aria-describedby={e.message ? "err-message" : undefined} />
        <FieldError id="err-message" msg={e.message} />
      </label>

      {/* Champ piège anti-spam, invisible pour les humains */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={pending} className={buttonClass("electrik")}>
          {pending ? "Envoi en cours" : "Envoyer la demande"}
          {pending ? (
            <span className="grid size-9 place-items-center rounded-full bg-white text-electrik"><CircleNotchIcon className="size-4 animate-spin" /></span>
          ) : (
            <ButtonChip variant="electrik" />
          )}
        </button>
        <p role="status" aria-live="polite" className="text-[0.92rem] text-[#d64545]">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
