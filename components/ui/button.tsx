import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "light";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-title font-semibold transition-all duration-400 ease-out-expo hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-electrik text-white shadow-blue hover:bg-electrik-dark",
  ghost: "bg-white text-ink ring-[1.5px] ring-inset ring-givre-2 hover:ring-acier",
  light: "bg-white text-electrik hover:shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)]",
};

const sizes = { md: "px-7 py-4 text-base", sm: "px-5 py-[11px] text-[0.92rem]" };

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonArrow() {
  return <ArrowRight aria-hidden className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1" />;
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant, size, arrow, className = "", children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      {arrow && <ButtonArrow />}
    </Link>
  );
}
