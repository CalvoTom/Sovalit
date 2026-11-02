"use client";

import { motion, useReducedMotion } from "motion/react";
import { LinkButton } from "@/components/ui/button";
import { TechLogos } from "@/components/ui/tech-logos";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Une seule séquence d'entrée, au chargement
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="px-3 pt-20 sm:px-4">
      <div className="relative isolate flex min-h-[620px] flex-col gap-16 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#9cc4ee_0%,#bcd8f4_45%,#d6e7f8_100%)] md:min-h-[600px] md:rounded-[36px]">
        <div className="shell pt-12 md:pt-20">
          <motion.h1 {...enter(0.05)} className="max-w-[14ch] text-[clamp(2.5rem,6vw,5.25rem)] leading-[1] tracking-[-0.045em] text-balance">
            Le digital qui fait grandir votre entreprise.
          </motion.h1>
        </div>

        <div className="shell mt-auto flex flex-col-reverse gap-10 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
          <motion.div {...enter(0.3)} className="text-ink/70">
            <p className="mb-3 text-sm text-ink/55">Technologies utilisées au quotidien</p>
            <TechLogos className="max-w-[640px]" />
          </motion.div>
          <motion.div {...enter(0.15)} className="flex flex-col items-start gap-5 md:items-end md:text-right">
            <p className="max-w-[28ch] text-[1.1rem] text-ink/80">Sites, applications, outils internes et IA, faits sur mesure.</p>
            <LinkButton href="/#contact">Parler de votre projet</LinkButton>
            <p className="text-sm text-ink/55">Premier échange offert, réponse sous 24&nbsp;h.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
