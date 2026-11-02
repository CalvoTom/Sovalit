"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
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
        <div className="shell grid gap-8 pt-12 md:grid-cols-[1fr_auto] md:items-end md:gap-16 md:pt-20">
          <motion.h1 {...enter(0.05)} className="max-w-[14ch] text-[clamp(2.5rem,6vw,5.25rem)] leading-[1] tracking-[-0.045em] text-balance">
            Le digital qui fait grandir votre entreprise.
          </motion.h1>
          <motion.div {...enter(0.15)} className="flex flex-col items-start gap-5 md:items-end md:pb-2 md:text-right">
            <p className="max-w-[28ch] text-[1.05rem] text-ink/75">Sites, applications, outils internes et IA, faits sur mesure.</p>
            <LinkButton href="/#contact">Parler de votre projet</LinkButton>
          </motion.div>
        </div>

        <motion.div {...enter(0.3)} className="shell mt-auto flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between md:pb-8">
          <div className="text-ink/70">
            <p className="mb-3 text-sm text-ink/55">Technologies utilisées au quotidien</p>
            <TechLogos className="max-w-[640px]" />
          </div>
          <a
            href="#contact"
            className="group flex w-full max-w-[300px] items-center justify-between gap-4 rounded-[22px] bg-white/85 p-4 pl-5 shadow-[0_20px_50px_-24px_rgb(26_31_51/0.4)] backdrop-blur-md transition-colors hover:bg-white"
          >
            <span>
              <span className="block font-display font-semibold text-ink">Premier échange offert</span>
              <span className="text-sm">Réponse sous 24&nbsp;h, en visio ou par téléphone.</span>
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
