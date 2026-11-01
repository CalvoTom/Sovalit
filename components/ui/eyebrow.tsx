import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 inline-flex items-center gap-2.5 font-title text-[0.85rem] font-semibold uppercase tracking-[0.12em] ${light ? "text-white" : "text-electrik"}`}>
      <span aria-hidden className={`size-2 rounded-full bg-current ${light ? "shadow-[0_0_0_4px_rgb(255_255_255/0.2)]" : "shadow-[0_0_0_4px_rgb(0_121_224/0.15)]"}`} />
      {children}
    </p>
  );
}
