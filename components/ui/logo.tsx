import Link from "next/link";

export function Logo({ className = "text-[1.45rem] text-electrik" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Sovalit, accueil" className={`font-display leading-none font-bold tracking-[-0.06em] ${className}`}>
      Sovali<span className="tracking-normal">T</span>
    </Link>
  );
}
