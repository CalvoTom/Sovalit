"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { LinkButton } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-8 rounded-full bg-white/75 py-2.5 pr-2.5 pl-6 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-acier/10 transition-shadow duration-500 ${
          scrolled ? "shadow-[0_12px_40px_-12px_rgb(29_33_51/0.25)]" : "shadow-[0_8px_30px_-12px_rgb(29_33_51/0.15)]"
        }`}
      >
        <Logo />
        <nav aria-label="Navigation principale" className="ml-auto hidden gap-7 text-[0.95rem] font-medium md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-electrik">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <LinkButton href="/#contact" size="sm">
            Parlons projet
          </LinkButton>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="grid size-11 place-items-center rounded-full bg-electrik text-white md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 flex max-w-[1200px] flex-col gap-1 rounded-[20px] bg-white p-4 shadow-soft md:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl p-3 font-title font-semibold text-ink hover:bg-givre"
              >
                {item.label}
              </Link>
            ))}
            <LinkButton href="/#contact" onClick={() => setOpen(false)} className="mt-2">
              Parlons projet
            </LinkButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
