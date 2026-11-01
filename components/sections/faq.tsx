import { Plus } from "lucide-react";
import { faq } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export function Faq() {
  // Données structurées pour Google (résultats enrichis)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="faq" className="section scroll-mt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-[72px]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="h2">Questions fréquentes</h2>
        </Reveal>
        <div className="grid gap-3">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-[20px] bg-givre px-7 transition-colors open:bg-electrik-soft">
                <summary className="relative cursor-pointer list-none py-6 pr-12 font-title text-[1.08rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="absolute top-1/2 right-0 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white text-electrik transition-transform duration-400 ease-out-expo group-open:rotate-45">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[40rem] pb-6">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
