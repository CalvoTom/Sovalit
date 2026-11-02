import Link from "next/link";

/** Logo Sovalit : nom en Sora, point final carré en bleu Electrik. */
export function Logo({ className = "text-[1.45rem]" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Sovalit, accueil" className={`rounded-md px-1 font-display leading-none font-semibold tracking-[-0.05em] text-ink ${className}`}>
      Sovalit<span className="text-electrik">.</span>
    </Link>
  );
}
