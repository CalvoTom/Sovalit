import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="pt-10 pb-8">
      <div className="container-site flex flex-wrap items-end justify-between gap-10 border-b-[1.5px] border-givre-2 pb-10">
        <Logo className="text-[clamp(3rem,9vw,6.5rem)]" />
        <div className="flex gap-16 max-sm:gap-10">
          <div className="grid content-start gap-2">
            <h2 className="mb-1.5 text-[0.8rem] tracking-[0.12em] uppercase">Services</h2>
            {["Sites vitrines", "Applications mobiles", "Outils internes"].map((s) => (
              <Link key={s} href="/#services" className="text-[0.95rem] transition-colors hover:text-electrik">{s}</Link>
            ))}
            <Link href="/#data" className="text-[0.95rem] transition-colors hover:text-electrik">Data & IA</Link>
          </div>
          <div className="grid content-start gap-2">
            <h2 className="mb-1.5 text-[0.8rem] tracking-[0.12em] uppercase">Contact</h2>
            <a href={site.phoneHref} className="text-[0.95rem] transition-colors hover:text-electrik">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="text-[0.95rem] transition-colors hover:text-electrik">{site.email}</a>
          </div>
        </div>
      </div>
      <div className="container-site flex flex-wrap justify-between gap-3 pt-6 text-[0.85rem]">
        <span>© {new Date().getFullYear()} Sovalit. Tous droits réservés.</span>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-electrik">Mentions légales</Link>
          <Link href="/#top" className="hover:text-electrik">Retour en haut ↑</Link>
        </div>
      </div>
    </footer>
  );
}
