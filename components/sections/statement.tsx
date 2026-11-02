"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { commitments } from "@/lib/site";

const text =
  "Un bon produit digital ne se remarque pas par sa décoration, mais par ce qu'il change au quotidien : des clients qui vous trouvent, des équipes qui gagnent du temps, des décisions prises sur des chiffres fiables.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, ["#c3c8d6", "#1a1f33"]);
  return <motion.span style={{ color }}>{children} </motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  // Le texte se colore mot à mot pendant le défilement
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <section className="shell py-28 md:py-40">
      <div className="grid gap-8 md:grid-cols-[1fr_3fr] md:gap-16">
        <p className="text-sm text-mute md:pt-3">Notre approche</p>
        <p ref={ref} className="font-display text-statement font-medium tracking-[-0.03em]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>

      <ul className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4 md:mt-32">
        {commitments.map((c) => (
          <li key={c.title} className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:not-first:border-l lg:not-first:pl-8">
            <h3 className="mb-2 text-xl tracking-[-0.02em]">{c.title}</h3>
            <p className="max-w-[30ch]">{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
