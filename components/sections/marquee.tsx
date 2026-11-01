import { Fragment } from "react";
import { marquee } from "@/lib/site";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div aria-hidden className="relative z-[3] -mx-5 -mt-2.5 -rotate-[1.5deg] overflow-hidden bg-electrik py-[22px] text-white">
      <div className="flex w-max animate-marquee items-center gap-9 font-title text-[clamp(1.1rem,2vw,1.5rem)] font-semibold tracking-[-0.02em]">
        {items.map((label, i) => (
          <Fragment key={i}>
            <span>{label}</span>
            <i className="size-[18px] rotate-45 rounded-full border-[5px] border-white border-r-transparent" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
