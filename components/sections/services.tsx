"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "@phosphor-icons/react";
import { services, type ServiceId } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { WebMockup } from "@/components/mockups/web-mockup";
import { MobileMockup } from "@/components/mockups/mobile-mockup";
import { ToolsMockup } from "@/components/mockups/tools-mockup";
import { AIMockup } from "@/components/mockups/ai-mockup";

const previews: Record<ServiceId, React.ReactNode> = {
  web: <WebMockup />,
  mobile: <MobileMockup />,
  tools: <ToolsMockup />,
  ai: <AIMockup />,
};

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

        <div className="relative min-h-[460px] overflow-hidden rounded-[28px] bg-[linear-gradient(170deg,#cfe3f7_0%,#eef4fb_55%,#f5f6fa_100%)] sm:min-h-[540px]">
          {services.map((s) => (
            <Tabs.Content key={s.id} value={s.id} forceMount className="absolute inset-0 outline-none data-[state=inactive]:pointer-events-none">
              <AnimatePresence>
                {s.id === active && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full items-center justify-center p-5 sm:p-10"
                  >
                    {previews[s.id]}
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Content>
          ))}
          <p className="absolute right-5 bottom-4 text-xs text-ink/50">Exemple d&apos;interface</p>
        </div>
      </Tabs.Root>
    </section>
  );
}
