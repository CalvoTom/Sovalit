import type { ServiceArt as Art } from "@/lib/site";

const clayBlue = "bg-[radial-gradient(circle_at_30%_25%,#6bb6ff,#0079e0_45%,#004f96_100%)]";
const clayWhite = "bg-[radial-gradient(circle_at_30%_20%,#ffffff,#e6e9f2_60%,#c9cedd_100%)]";
const clayAcier = "bg-[radial-gradient(circle_at_30%_20%,#8b91aa,#5a6078_55%,#3f4459)]";
const move = "transition-transform duration-700 ease-out-expo";
const up = `${move} group-hover:-translate-y-2 group-hover:-rotate-3`;
const down = `${move} group-hover:translate-y-1.5 group-hover:rotate-3`;

/** Petites illustrations « pâte à modeler » en CSS, animées au survol de la carte. */
export function ServiceArt({ art }: { art: Art }) {
  return (
    <div aria-hidden className="relative -mt-2 mb-7 h-[200px] max-sm:h-[170px] max-sm:origin-top-left max-sm:scale-[0.85]">
      {art === "web" && (
        <>
          <div className={`absolute top-[18px] left-0 h-40 w-[72%] rounded-[18px] bg-white p-4 shadow-soft ${up}`}>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => <i key={i} className="size-2.5 rounded-full bg-givre-2" />)}
            </div>
            <b className="mt-6 block h-3.5 w-[70%] rounded-lg bg-electrik" />
            <b className="mt-2.5 block h-3.5 w-[45%] rounded-lg bg-givre-2" />
          </div>
          <div className={`absolute top-[50px] right-[8%] size-[120px] rounded-full shadow-[0_24px_40px_-14px_rgb(0_121_224/0.6)] ${clayBlue} ${down}`} />
        </>
      )}
      {art === "mobile" && (
        <>
          <div className={`absolute top-0 left-[12%] h-[200px] w-[110px] -rotate-8 rounded-[26px] bg-ink px-3.5 py-[26px] shadow-[0_24px_40px_-18px_rgb(29_33_51/0.6)] ${up}`}>
            <b className="block h-10 rounded-[10px] bg-electrik" />
            <b className="mt-2.5 block h-3.5 rounded-[10px] bg-[#3a3f57]" />
            <b className="mt-2.5 block h-3.5 rounded-[10px] bg-[#3a3f57]" />
          </div>
          <div className={`absolute top-[70px] left-[44%] h-20 w-[200px] rotate-12 rounded-full shadow-[0_24px_40px_-18px_rgb(29_33_51/0.35)] ${clayWhite} ${down}`} />
        </>
      )}
      {art === "tools" && (
        <>
          <div className={`absolute top-[60px] left-[4%] size-[120px] -rotate-10 rounded-[22px] shadow-[0_24px_40px_-18px_rgb(29_33_51/0.4)] ${clayAcier} ${up}`} />
          <div className={`absolute top-2.5 left-[30%] size-[100px] rotate-14 rounded-full shadow-[0_24px_40px_-18px_rgb(29_33_51/0.4)] ${clayBlue} ${down}`} />
          <div className={`absolute top-20 left-[52%] h-[90px] w-[150px] -rotate-4 rounded-[22px] shadow-[0_24px_40px_-18px_rgb(29_33_51/0.4)] ${clayWhite} ${up}`} />
        </>
      )}
      {art === "data" && (
        <>
          <div className="flex h-full items-end gap-3.5 pl-1">
            {["40%", "65%", "50%", "90%"].map((h, i) => (
              <div
                key={i}
                style={{ height: h, transitionDelay: `${i * 60}ms` }}
                className={`w-11 rounded-[14px_14px_8px_8px] bg-[linear-gradient(180deg,rgb(255_255_255/0.95),rgb(255_255_255/0.55))] ${move} group-hover:scale-y-110 origin-bottom`}
              />
            ))}
          </div>
          <div className={`absolute top-2.5 right-[6%] size-[130px] rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffffff,#cfe6ff_40%,#5aa9f2_100%)] shadow-[0_30px_50px_-20px_rgb(0_0_0/0.4)] ${down}`} />
        </>
      )}
    </div>
  );
}
