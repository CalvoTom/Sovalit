import Link from "next/link";

/** Symbole de la marque : le « C » de Sovalit sur un carré Electrik. */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="18" fill="#0079E0" />
      <path d="M43.5 23.5A14 14 0 1 0 43.5 40.5" fill="none" stroke="#fff" strokeWidth="8.5" />
    </svg>
  );
}

/** Logo compact pour la navigation : symbole + nom. */
export function Logo() {
  return (
    <Link href="/" aria-label="Sovalit, accueil" className="flex items-center gap-2.5 rounded-full">
      <LogoMark />
      <span className="font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-ink">Sovalit</span>
    </Link>
  );
}
