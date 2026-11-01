import Link from "next/link";

export function Logo({ className = "text-[1.6rem]" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Sovalit — accueil" className={`font-title font-extrabold leading-none tracking-[-0.06em] text-electrik ${className}`}>
      Sovali<span className="tracking-normal">T</span>
    </Link>
  );
}
