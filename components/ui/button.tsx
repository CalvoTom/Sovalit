import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type Variant = "ink" | "paper" | "electrik";

const styles: Record<Variant, { btn: string; chip: string }> = {
  ink: { btn: "bg-ink text-white hover:bg-[#262c45]", chip: "bg-white text-ink" },
  paper: { btn: "bg-white text-ink hover:bg-givre", chip: "bg-ink text-white" },
  electrik: { btn: "bg-electrik text-white hover:bg-electrik-deep", chip: "bg-white text-electrik" },
};

export function buttonClass(variant: Variant = "ink", extra = "") {
  return `group inline-flex h-12 items-center gap-3 rounded-full pr-1.5 pl-5 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60 ${styles[variant].btn} ${extra}`;
}

/** Pastille ronde avec flèche, qui pivote au survol. */
export function ButtonChip({ variant = "ink" }: { variant?: Variant }) {
  return (
    <span aria-hidden className={`grid size-9 place-items-center rounded-full ${styles[variant].chip}`}>
      <ArrowUpRightIcon weight="bold" className="size-4 transition-transform duration-300 ease-out-expo group-hover:rotate-45" />
    </span>
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant = "ink", className = "", children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      <ButtonChip variant={variant} />
    </Link>
  );
}
