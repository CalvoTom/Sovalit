import type { ReactNode } from "react";

/** Titre de section : titre à gauche, texte d'accompagnement aligné à droite sur grand écran. */
export function SectionHeading({ title, aside, light = false }: { title: ReactNode; aside?: ReactNode; light?: boolean }) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
      <h2 className={`max-w-[16ch] text-title ${light ? "text-white" : ""}`}>{title}</h2>
      {aside && <p className={`max-w-[38ch] md:justify-self-end ${light ? "text-white/65" : ""}`}>{aside}</p>}
    </div>
  );
}
