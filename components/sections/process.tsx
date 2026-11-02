import { steps } from "@/lib/site";
import { photos } from "@/lib/photos";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="methode" className="shell scroll-mt-8 py-28 md:py-40">
      <SectionHeading
        title="Une méthode en quatre temps, sans effet tunnel."
        aside="On se parle, on se voit, on avance ensemble. Chaque étape se termine par quelque chose que vous pouvez tester et valider."
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[640px]">
          <Photo photo={photos.method} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <ol className="flex flex-col border-t border-line">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line py-8 lg:flex-1 lg:content-center">
              <span className="font-display text-sm font-medium text-electrik">Étape {i + 1}</span>
              <div>
                <h3 className="mb-2 text-2xl tracking-[-0.025em]">{s.title}</h3>
                <p className="max-w-[44ch]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
