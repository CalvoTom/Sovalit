import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[28px] bg-electrik text-white/75 md:rounded-[36px]">
        <div className="shell grid gap-12 pt-16 md:grid-cols-[1.4fr_1fr_1fr] md:pt-20">
          <div>
            <p className="max-w-[30ch]">Pour les entreprises qui veulent des outils numériques à la hauteur de leur métier.</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium tracking-[-0.03em] text-white underline decoration-1 underline-offset-[10px] transition-opacity hover:opacity-80">
              {site.email}
            </a>
            <a href={site.phoneHref} className="mt-3 block text-white hover:underline">{site.phone}</a>
          </div>
          <nav aria-label="Plan du site" className="grid content-start gap-2.5">
            <p className="mb-1 text-sm text-white/55">Navigation</p>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-white hover:underline">{item.label}</Link>
            ))}
          </nav>
          <div className="grid content-start gap-2.5">
            <p className="mb-1 text-sm text-white/55">Informations</p>
            <Link href="/#contact" className="w-fit text-white hover:underline">Contact</Link>
            <Link href="/mentions-legales" className="w-fit text-white hover:underline">Mentions légales</Link>
          </div>
        </div>

        <div className="shell mt-16 flex flex-wrap justify-between gap-3 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Sovalit</span>
          <span>Conçu et développé par Sovalit</span>
        </div>

        {/* Logo géant, coupé par le bas de la carte */}
        <p aria-hidden className="pointer-events-none mt-6 -mb-[0.2em] text-center font-display text-[26vw] leading-[0.8] font-bold tracking-[-0.07em] text-white select-none">
          Sovali<span className="tracking-normal">T</span>
        </p>
      </div>
    </footer>
  );
}
