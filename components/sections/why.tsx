import { KeyRound, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { reasons } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const icons = [UserRound, Sparkles, KeyRound, ShieldCheck];

export function Why() {
  return (
    <section className="section bg-givre">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-[72px]">
        <Reveal className="lg:sticky lg:top-[120px]">
          <Eyebrow>Pourquoi Sovalit</Eyebrow>
          <h2 className="h2">
            Un expert,
            <br />
            pas un intermédiaire.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[1.1rem]">
            Vous parlez directement à la personne qui conçoit et développe votre produit. Moins de réunions, plus de
            résultats.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={r.title} delay={(i % 2) * 0.08} className="rounded-[20px] bg-white p-8 shadow-soft">
                <span className="mb-6 grid size-[52px] place-items-center rounded-2xl bg-electrik text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mb-2.5 text-[1.35rem] font-semibold">{r.title}</h3>
                <p className="text-[0.95rem]">{r.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
