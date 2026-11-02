import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";

const rows = [
  { id: "D-2041", client: "SCI Beaulieu", amount: "12 480 €", status: "Signé", tone: "bg-[#e3f5ea] text-[#1f7a45]" },
  { id: "D-2040", client: "Hôtel du Parc", amount: "8 950 €", status: "Envoyé", tone: "bg-[#e3f0fc] text-electrik" },
  { id: "D-2039", client: "Mairie de Caluire", amount: "23 100 €", status: "À relancer", tone: "bg-[#fdf1e1] text-[#a1600b]" },
  { id: "D-2038", client: "Pharmacie Centrale", amount: "3 620 €", status: "Brouillon", tone: "bg-givre text-acier" },
];

/** Aperçu d'un outil interne de suivi des devis (contenu d'exemple). */
export function ToolsMockup() {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl bg-white text-[11px] shadow-[0_40px_80px_-40px_rgb(26_31_51/0.45)] ring-1 ring-black/5">
      <aside className="hidden w-36 flex-none flex-col gap-1 border-r border-line bg-givre p-3 sm:flex">
        <span className="mb-3 px-2 font-display text-[12px] font-semibold text-ink">Morel Pro</span>
        {["Tableau de bord", "Devis", "Clients", "Planning", "Factures"].map((l) => (
          <span key={l} className={`rounded-lg px-2 py-1.5 ${l === "Devis" ? "bg-white font-semibold text-ink shadow-sm" : ""}`}>{l}</span>
        ))}
      </aside>
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">Devis en cours</p>
          <span className="rounded-full bg-ink px-3 py-1.5 text-white">Nouveau devis</span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-givre px-3 py-2 text-mute">
          <MagnifyingGlassIcon className="size-3.5" /> Rechercher un client, un numéro…
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[["En attente", "47 670 €"], ["Signés ce mois", "12"], ["Taux de signature", "64 %"]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line p-2.5">
              <p className="text-[10px]">{k}</p>
              <p className="font-display text-[15px] font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>
        <table className="mt-4 w-full text-left">
          <thead className="text-[10px] text-mute">
            <tr><th className="pb-2 font-normal">N°</th><th className="pb-2 font-normal">Client</th><th className="pb-2 font-normal">Montant</th><th className="pb-2 font-normal">Statut</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line text-ink">
                <td className="py-2 text-mute">{r.id}</td>
                <td className="py-2 font-medium">{r.client}</td>
                <td className="py-2">{r.amount}</td>
                <td className="py-2"><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${r.tone}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
