import { steps } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="methode" className="shell scroll-mt-8 py-28 md:py-40">
      <SectionHeading
        title="Une méthode en quatre temps, sans effet tunnel."
        aside="Chaque étape se termine par quelque chose que vous pouvez voir, tester et valider avant de passer à la suivante."
      />
      <ol className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title}>
            {/* Escalier : chaque étape démarre un cran plus bas que la précédente */}
            <div className="relative h-44 overflow-hidden rounded-2xl border border-line bg-[repeating-linear-gradient(135deg,transparent_0_7px,#eef0f5_7px_8px)] sm:h-60">
              <div
                className="absolute inset-x-0 flex h-11 items-center bg-ink px-4 text-sm font-medium text-white"
                style={{ top: `calc(${i} * (100% - 2.75rem) / 3)` }}
              >
                {s.title}
              </div>
            </div>
            <p className="mt-4 text-sm text-mute">Étape {i + 1}</p>
            <h3 className="mt-1 mb-2 text-xl tracking-[-0.02em]">{s.title}</h3>
            <p className="max-w-[32ch] text-[0.95rem]">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
