import { dataUseCases } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ForecastChart } from "@/components/mockups/forecast-chart";

export function DataAI() {
  return (
    <section id="data" className="scroll-mt-8 px-3 sm:px-4">
      <div className="rounded-[28px] bg-ink py-24 text-white/70 md:rounded-[36px] md:py-32">
        <div className="shell">
          <SectionHeading
            light
            title="Vos données savent déjà beaucoup de choses."
            aside="Une expertise en data science et en machine learning, mise au service de problèmes concrets. On commence par le cas d'usage, jamais par la technologie."
          />
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
            <ForecastChart />
            <div>
              <dl className="grid sm:grid-cols-2">
                {dataUseCases.map((u) => (
                  <div key={u.title} className="border-t border-white/10 py-6 sm:pr-6">
                    <dt className="mb-1.5 font-display text-xl font-semibold tracking-[-0.02em] text-white">{u.title}</dt>
                    <dd className="text-[0.95rem]">{u.text}</dd>
                  </div>
                ))}
              </dl>
              <LinkButton href="/#contact" variant="paper" className="mt-6">
                Étudier un cas d&apos;usage
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
