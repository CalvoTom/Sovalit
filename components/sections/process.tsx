import { steps } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  return (
    <section id="methode" className="section scroll-mt-24">
      <div className="container-site">
        <Reveal className="mb-16 max-w-[720px]">
          <Eyebrow>Méthode</Eyebrow>
          <h2 className="h2">
            Simple, transparent,
            <br />
            sans mauvaise surprise.
          </h2>
        </Reveal>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08}
              className="rounded-[20px] bg-white px-7 pt-8 pb-9 ring-[1.5px] ring-inset ring-givre-2 transition-all duration-400 ease-out-expo hover:-translate-y-1 hover:ring-electrik"
            >
              <span className="mb-7 grid size-[52px] place-items-center rounded-full bg-electrik-soft font-title text-[1.2rem] font-bold text-electrik">
                {i + 1}
              </span>
              <h3 className="mb-2.5 text-[1.35rem] font-semibold">{s.title}</h3>
              <p className="text-[0.95rem]">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
