"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { LinkButton } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="shell flex h-20 items-center justify-between gap-8">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 text-[0.95rem] text-ink md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 transition-colors hover:bg-givre">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <LinkButton href="/#contact">Réserver un appel</LinkButton>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="grid size-11 place-items-center rounded-full bg-ink text-white md:hidden"
        >
          {open ? <XIcon className="size-5" /> : <ListIcon className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mx-4 flex flex-col rounded-3xl bg-white p-3 shadow-[0_24px_60px_-20px_rgb(26_31_51/0.35)] ring-1 ring-line md:hidden"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3.5 font-display text-lg text-ink hover:bg-givre">
                {item.label}
              </Link>
            ))}
            <LinkButton href="/#contact" onClick={() => setOpen(false)} className="mt-2 justify-between">
              Réserver un appel
            </LinkButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
