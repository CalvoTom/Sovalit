import { dataUseCases } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ForecastChart } from "@/components/mockups/forecast-chart";

export function DataAI() {
  return (
    <section id="data" className="scroll-mt-24 px-3 sm:px-4">
      <div className="rounded-[28px] bg-ink py-24 text-white/70 md:rounded-[36px] md:py-32">
        <div className="shell">
          <SectionHeading
            light
            title="Vos données savent déjà beaucoup de choses."
            aside="De la data science au service de cas concrets. On part de votre besoin, jamais de la technologie."
          />
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
            <ForecastChart />
            <div>
              <dl className="border-b border-white/10">
                {dataUseCases.map((u) => (
                  <div key={u.title} className="flex items-baseline justify-between gap-6 border-t border-white/10 py-5">
                    <dt className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">{u.title}</dt>
                    <dd className="text-right text-[0.95rem] text-white/60">{u.text}</dd>
                  </div>
                ))}
              </dl>
              <LinkButton href="/#contact" variant="paper" className="mt-8">
                Étudier un cas d&apos;usage
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
