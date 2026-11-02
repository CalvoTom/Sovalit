"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { LinkButton } from "@/components/ui/button";
import { TechLogos } from "@/components/ui/tech-logos";
import { HeroCanvas } from "@/components/three/hero-canvas";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Une seule séquence d'entrée orchestrée, au chargement
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease } };

  return (
    <section className="px-3 pt-20 sm:px-4">
      <div className="relative isolate flex min-h-[760px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#9cc4ee_0%,#bcd8f4_45%,#d6e7f8_100%)] md:h-[calc(100svh-6rem)] md:max-h-[920px] md:min-h-[680px] md:rounded-[36px]">
        <div className="shell relative grid gap-8 pt-12 md:grid-cols-[1.35fr_1fr] md:items-start md:pt-16">
          <motion.h1 {...enter(0.05)} className="max-w-[13ch] text-display">
            Le digital qui fait grandir votre entreprise.
          </motion.h1>
          <motion.div {...enter(0.18)} className="max-w-[34ch] md:justify-self-end md:pt-3">
            <p className="text-[1.05rem] text-ink/80">
              Sites, applications mobiles privées, outils internes et IA, conçus et développés sur mesure par un seul
              interlocuteur, de l&apos;idée à la mise en ligne.
            </p>
            <LinkButton href="/#contact" className="mt-7">
              Parler de votre projet
            </LinkButton>
          </motion.div>
        </div>

        {/* Sur mobile, la 3D a sa propre zone ; sur grand écran, elle occupe toute la carte */}
        <div className="relative h-[300px] [mask-image:linear-gradient(to_bottom,black_75%,transparent)] md:absolute md:inset-0 md:-z-10 md:h-auto md:[mask-image:none]">
          <HeroCanvas />
        </div>

        <motion.div {...enter(0.4)} className="shell relative mt-auto flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between md:pb-8">
          <div className="text-ink/70">
            <p className="mb-3 text-sm text-ink/60">Technologies utilisées au quotidien</p>
            <TechLogos className="max-w-[640px]" />
          </div>
          <a
            href="#contact"
            className="group flex w-full max-w-[300px] items-center justify-between gap-4 rounded-[22px] bg-white/85 p-4 pl-5 shadow-[0_20px_50px_-24px_rgb(26_31_51/0.4)] backdrop-blur-md transition-colors hover:bg-white"
          >
            <span>
              <span className="block font-display font-semibold text-ink">Premier échange offert</span>
              <span className="text-sm">Réponse sous 24 h, en visio ou par téléphone.</span>
            </span>
            <span aria-hidden className="grid size-10 flex-none place-items-center rounded-full bg-electrik text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRightIcon weight="bold" className="size-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
