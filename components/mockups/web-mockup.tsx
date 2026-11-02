/** Aperçu d'un site vitrine (contenu d'exemple). */
export function WebMockup() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-40px_rgb(26_31_51/0.45)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b border-line bg-givre px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-md bg-white px-10 py-1 text-[11px] text-mute ring-1 ring-line">atelier-morel.fr</span>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between text-[11px] text-ink">
          <span className="font-display text-[13px] font-semibold">Atelier Morel</span>
          <span className="hidden gap-4 sm:flex"><span>Réalisations</span><span>Savoir-faire</span><span>Contact</span></span>
          <span className="rounded-full bg-ink px-3 py-1.5 text-white">Demander un devis</span>
        </div>
        <div className="mt-6 grid grid-cols-[1.1fr_1fr] gap-5">
          <div className="flex flex-col justify-center">
            <p className="font-display text-[clamp(1rem,2.2vw,1.6rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
              Menuiserie sur mesure à Lyon, depuis 1987.
            </p>
            <p className="mt-2 text-[11px] leading-snug">Cuisines, escaliers et agencements dessinés et fabriqués dans notre atelier.</p>
            <span className="mt-4 w-fit rounded-full bg-[#b5713a] px-3 py-1.5 text-[11px] text-white">Voir nos réalisations</span>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[linear-gradient(160deg,#e9d3b8,#c9935f_60%,#8a5530)]">
            <div className="absolute inset-x-4 bottom-4 h-1/3 rounded-lg bg-[linear-gradient(180deg,#f4e6d3,#dcbb95)] opacity-90" />
            <div className="absolute top-5 left-5 h-1/3 w-1/3 rounded-lg bg-white/25" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-[10px]">
          {["Devis sous 48 h", "Fabrication locale", "Pose incluse"].map((t) => (
            <span key={t} className="rounded-lg bg-givre px-3 py-2 text-ink">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
