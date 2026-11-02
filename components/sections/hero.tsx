"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { LinkButton } from "@/components/ui/button";
import { TechLogos } from "@/components/ui/tech-logos";
import { Photo } from "@/components/ui/photo";
import { photos } from "@/lib/photos";

const hasPhoto = Boolean(photos.hero.src);

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Une seule séquence d'entrée, au chargement
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="pt-28 md:pt-32">
      <div className="shell grid gap-6 pb-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16 md:pb-12">
        <motion.h1 {...enter(0.05)} className="max-w-[17ch] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1] tracking-[-0.045em] text-balance">
          Le digital qui fait grandir votre entreprise.
        </motion.h1>
        <motion.div {...enter(0.15)} className="flex flex-col items-start gap-5 md:items-end md:text-right">
          <p className="max-w-[30ch] text-ink/75">Sites, applications, outils internes et IA, faits sur mesure.</p>
          <LinkButton href="/#contact">Parler de votre projet</LinkButton>
        </motion.div>
      </div>

      <motion.div {...enter(0.25)} className="px-3 sm:px-4">
        <div
          className={`relative isolate flex flex-col justify-end overflow-hidden rounded-[28px] md:rounded-[36px] ${
            hasPhoto ? "h-[72svh] max-h-[760px] min-h-[480px]" : "bg-ink pt-10"
          }`}
        >
          {hasPhoto && (
            <>
              <Photo photo={photos.hero} sizes="100vw" priority className="-z-10" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_20_36/0.7),rgb(16_20_36/0.15)_45%,transparent_70%)]" />
            </>
          )}
          <div className="shell flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between md:pb-8">
            <div className="text-white/85">
              <p className="mb-3 text-sm text-white/60">Technologies utilisées au quotidien</p>
              <TechLogos className="max-w-[640px]" />
            </div>
            <a
              href="#contact"
              className="group flex w-full max-w-[300px] items-center justify-between gap-4 rounded-[22px] bg-white p-4 pl-5 transition-colors hover:bg-givre"
            >
              <span>
                <span className="block font-display font-semibold text-ink">Premier échange offert</span>
                <span className="text-sm">Réponse sous 24&nbsp;h, en visio ou par téléphone.</span>
              </span>
              <span aria-hidden className="grid size-10 flex-none place-items-center rounded-full bg-electrik text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRightIcon weight="bold" className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
