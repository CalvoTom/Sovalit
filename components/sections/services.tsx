import { services } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ServiceArt } from "./service-art";

export function Services() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="container-site">
        <Reveal className="mb-16 max-w-[720px]">
          <Eyebrow>Services</Eyebrow>
          <h2 className="h2">
            Du site vitrine à l&apos;IA,
            <br />
            un seul partenaire.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[1.1rem]">
            Quatre expertises complémentaires pour couvrir tout le cycle de vie de vos produits digitaux.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={(i % 2) * 0.08} as="article"
              className={`group relative overflow-hidden rounded-[32px] p-9 transition-[transform,box-shadow] duration-600 ease-out-expo hover:-translate-y-1.5 hover:shadow-soft max-sm:px-[22px] max-sm:py-7 ${
                s.accent ? "bg-electrik text-white/85" : "bg-givre"
              }`}
            >
              <ServiceArt art={s.art} />
              <span className={`font-title text-[0.9rem] font-semibold ${s.accent ? "text-white" : "text-electrik"}`}>{s.num}</span>
              <h3 className={`mt-2 mb-3 text-[1.6rem] font-semibold tracking-[-0.02em] ${s.accent ? "text-white" : ""}`}>{s.title}</h3>
              <p className="max-w-[30rem]">{s.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className={`rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold ${s.accent ? "bg-white/15 text-white" : "bg-white text-ink"}`}>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
