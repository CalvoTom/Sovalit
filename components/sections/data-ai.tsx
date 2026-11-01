import { ArrowRight } from "lucide-react";
import { dataUseCases } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function DataAI() {
  return (
    <section id="data" className="section relative scroll-mt-24 overflow-hidden bg-electrik text-white/85">
      <div aria-hidden className="brand-ring -bottom-[520px] -left-[380px] w-[900px] -rotate-30 border-[150px] border-white/[0.07] border-t-transparent" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-[72px]">
        <Reveal>
          <Eyebrow light>Expertise Data & IA</Eyebrow>
          <h2 className="h2 mb-6 text-white">Vos données ont des choses à dire. On les fait parler.</h2>
          <p className="mb-9 max-w-[32rem] text-[1.1rem]">
            L&apos;IA n&apos;est utile que si elle résout un vrai problème. Grâce à une expertise approfondie en data science et
            en machine learning, je vous aide à identifier les cas d&apos;usage qui ont un impact réel, puis à les mettre en
            production.
          </p>
          <LinkButton href="/#contact" variant="light" arrow>
            Explorer un cas d&apos;usage
          </LinkButton>
        </Reveal>
        <ul className="grid gap-3.5">
          {dataUseCases.map((u, i) => (
            <Reveal as="li" key={u.title} delay={i * 0.08}
              className="flex items-start gap-[18px] rounded-[20px] bg-white/10 px-[26px] py-6 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15"
            >
              <span className="grid size-9 flex-none place-items-center rounded-full bg-white text-electrik">
                <ArrowRight className="size-4" aria-hidden />
              </span>
              <div>
                <h3 className="mb-1 text-[1.12rem] font-semibold tracking-[-0.01em] text-white">{u.title}</h3>
                <p className="text-[0.95rem]">{u.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
