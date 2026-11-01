import { LinkButton } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { HeroCanvas } from "@/components/three/hero-canvas";

export function Hero() {
  return (
    <section className="relative flex min-h-[940px] items-start overflow-hidden bg-white pt-[130px] pb-24 md:min-h-svh md:items-center md:pt-[140px]">
      {/* Grand « C » Givre en arrière-plan */}
      <div
        aria-hidden
        className="brand-ring top-[72%] -right-[70%] w-[min(1300px,140vw)] -translate-y-1/2 rotate-[25deg] border-[clamp(80px,13vw,190px)] border-givre border-r-transparent md:top-1/2 md:-right-[28%]"
      />
      <HeroCanvas />

      <div className="container-site pointer-events-none relative z-[2] [&_a]:pointer-events-auto">
        <Reveal>
          <Eyebrow>Studio produit digital · Data & IA</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-[11ch] text-[clamp(2.8rem,7.2vw,6rem)] leading-none font-extrabold tracking-[-0.045em]">
            Le digital qui fait <span className="text-electrik">grandir</span> votre entreprise.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-[34rem] text-[1.12rem]">
            Sites vitrines, applications mobiles privées, outils internes et solutions data&nbsp;&amp;&nbsp;IA. Conçus sur
            mesure, de l&apos;idée à la mise en production, avec un interlocuteur unique.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-wrap gap-3.5 max-sm:[&>a]:flex-[1_1_100%]">
          <LinkButton href="/#contact" arrow>
            Démarrer un projet
          </LinkButton>
          <LinkButton href="/#services" variant="ghost">
            Voir les services
          </LinkButton>
        </Reveal>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 z-[2] hidden h-[42px] w-[26px] -translate-x-1/2 rounded-full border-2 border-givre-2 md:block">
        <span className="absolute top-2 left-1/2 -ml-0.5 h-2 w-1 animate-scroll-dot rounded bg-electrik" />
      </div>
    </section>
  );
}
