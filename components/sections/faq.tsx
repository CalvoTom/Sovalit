"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon } from "@phosphor-icons/react";
import { faq } from "@/lib/site";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const columns = [faq.filter((_, i) => i % 2 === 0), faq.filter((_, i) => i % 2 === 1)];

  return (
    <section id="faq" className="shell scroll-mt-8 pb-28 md:pb-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-14 text-center md:mb-16">
        <h2 className="mx-auto max-w-[18ch] text-title">Les questions qu&apos;on nous pose souvent.</h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-balance">Une autre question ? Écrivez-nous, la réponse arrive sous 24 h.</p>
      </div>
      <div className="grid items-start gap-3 md:grid-cols-2">
        {columns.map((col, c) => (
          <Accordion.Root key={c} type="single" collapsible className="grid gap-3">
            {col.map((f) => (
              <Accordion.Item key={f.q} value={f.q} className="rounded-2xl bg-givre transition-colors data-[state=open]:bg-white data-[state=open]:ring-1 data-[state=open]:ring-line">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-medium text-ink">
                    {f.q}
                    <PlusIcon weight="bold" className="size-4 flex-none text-acier transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[collapse_250ms_ease-out] data-[state=open]:animate-[expand_300ms_cubic-bezier(0.16,1,0.3,1)]">
                  <p className="max-w-[52ch] px-6 pb-6">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        ))}
      </div>
    </section>
  );
}
