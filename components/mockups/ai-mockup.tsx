import { FileTextIcon, PaperPlaneTiltIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";

/** Aperçu d'un assistant IA qui répond à partir des documents de l'entreprise (contenu d'exemple). */
export function AIMockup() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-white text-[12px] shadow-[0_40px_80px_-40px_rgb(26_31_51/0.45)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="grid size-6 place-items-center rounded-full bg-electrik text-white"><SparkleIcon weight="fill" className="size-3.5" /></span>
        <span className="font-display font-semibold text-ink">Assistant interne</span>
        <span className="ml-auto text-[10px] text-mute">1 240 documents indexés</span>
      </div>
      <div className="space-y-4 p-5">
        <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-white">
          Quel est le délai de préavis prévu dans le contrat de maintenance Durand ?
        </p>
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-givre px-4 py-3 text-ink">
          <p>
            Le contrat prévoit un préavis de <strong>3 mois</strong> avant la date anniversaire, notifié par lettre
            recommandée. La prochaine échéance est le 1er mars, la résiliation doit donc partir avant le 1er décembre.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Contrat_Durand_2024.pdf, p. 4", "Avenant_02.pdf, p. 1"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[10px] text-acier ring-1 ring-line">
                <FileTextIcon className="size-3" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="m-3 mt-0 flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-mute">
        Posez une question sur vos documents…
        <span className="ml-auto grid size-7 place-items-center rounded-lg bg-electrik text-white"><PaperPlaneTiltIcon weight="fill" className="size-3.5" /></span>
      </div>
    </div>
  );
}
