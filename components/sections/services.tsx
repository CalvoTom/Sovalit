"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "@phosphor-icons/react";
import { services, type ServiceId } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { photos } from "@/lib/photos";

export function Services() {
  const [active, setActive] = useState<ServiceId>("web");

  return (
    <section id="services" className="shell scroll-mt-8 pb-28 md:pb-40">
      <SectionHeading
        title="Du site vitrine à l'IA, un seul partenaire."
        aside="Quatre savoir-faire complémentaires, pour que votre site, vos applications et vos données fonctionnent ensemble."
      />

      <Tabs.Root value={active} onValueChange={(v) => setActive(v as ServiceId)} orientation="vertical" className="grid gap-8 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
        <Tabs.List aria-label="Services" className="flex flex-col border-t border-line">
          {services.map((s) => {
            const isActive = s.id === active;
            return (
              <Tabs.Trigger
                key={s.id}
                value={s.id}
                className="group border-b border-line py-6 text-left outline-none focus-visible:bg-givre"
              >
                <span className={`flex items-center justify-between font-display text-[1.6rem] font-semibold tracking-[-0.03em] transition-colors md:text-[1.9rem] ${isActive ? "text-ink" : "text-[#b7bccb] group-hover:text-acier"}`}>
                  {s.title}
                  <span aria-hidden className={`size-2.5 rounded-full transition-colors ${isActive ? "bg-electrik" : "bg-transparent"}`} />
                </span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-[44ch] pt-3">{s.text}</span>
                      <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] text-ink">
                        {s.points.map((p) => (
                          <span key={p} className="inline-flex items-center gap-1.5">
                            <CheckIcon weight="bold" className="size-3.5 text-electrik" /> {p}
                          </span>
                        ))}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-givre sm:min-h-[560px]">
          {services.map((s) => (
            <Tabs.Content key={s.id} value={s.id} forceMount className="absolute inset-0 outline-none data-[state=inactive]:pointer-events-none">
              <AnimatePresence>
                {s.id === active && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {photos[s.id].src ? (
                      <Photo photo={photos[s.id]} sizes="(min-width: 1024px) 60vw, 100vw" />
                    ) : (
                      <div className="flex h-full flex-col justify-end p-8 sm:p-12">
                        <p className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-ink">{s.title}</p>
                        <ul className="mt-6 grid gap-2 text-ink/80">
                          {s.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </section>
  );
}
