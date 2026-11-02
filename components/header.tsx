"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/logo";

const ids = nav.map((n) => n.href.replace("/#", ""));

/** Repère la section visible pour faire glisser l'indicateur de la navigation. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => window.scrollY < 300 && setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

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
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div
        className={`mx-auto flex max-w-[860px] items-center justify-between gap-4 rounded-full bg-white/75 p-1.5 pl-3 ring-1 ring-ink/[0.06] backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-500 ${
          scrolled ? "shadow-[0_16px_40px_-16px_rgb(26_31_51/0.3)]" : "shadow-[0_8px_24px_-16px_rgb(26_31_51/0.2)]"
        }`}
      >
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center text-[0.93rem] md:flex">
          {nav.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 transition-colors ${isActive ? "text-ink" : "text-acier hover:text-ink"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 -z-10 rounded-full bg-givre ring-1 ring-line"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          className="group hidden h-10 items-center gap-2 rounded-full bg-ink pr-1.5 pl-4 text-[0.92rem] font-medium text-white transition-colors hover:bg-[#262c45] md:inline-flex"
        >
          Réserver un appel
          <span className="grid size-7 place-items-center rounded-full bg-white text-ink">
            <ArrowUpRightIcon weight="bold" className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="grid size-10 place-items-center rounded-full bg-ink text-white md:hidden"
        >
          {open ? <XIcon className="size-5" /> : <ListIcon className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-[860px] flex-col rounded-[24px] bg-white p-2 shadow-[0_24px_60px_-20px_rgb(26_31_51/0.35)] ring-1 ring-line md:hidden"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3.5 font-display text-lg text-ink hover:bg-givre">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)} className="mt-1 rounded-2xl bg-ink px-4 py-3.5 font-display text-lg text-white">
              Réserver un appel
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
