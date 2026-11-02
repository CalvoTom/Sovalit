import { WifiSlashIcon } from "@phosphor-icons/react/dist/ssr";

const jobs = [
  { time: "08:30", client: "Boulangerie Lenoir", place: "Villeurbanne", status: "Terminé", tone: "bg-[#e3f5ea] text-[#1f7a45]" },
  { time: "10:15", client: "Cabinet Arnaud", place: "Lyon 3e", status: "En cours", tone: "bg-[#e3f0fc] text-electrik" },
  { time: "14:00", client: "Résidence Les Tilleuls", place: "Bron", status: "À faire", tone: "bg-givre text-acier" },
  { time: "16:30", client: "Garage Perrin", place: "Vénissieux", status: "À faire", tone: "bg-givre text-acier" },
];

/** Aperçu d'une application mobile privée pour techniciens de terrain (contenu d'exemple). */
export function MobileMockup() {
  return (
    <div className="mx-auto w-[260px] rounded-[44px] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgb(26_31_51/0.6)]">
      <div className="overflow-hidden rounded-[36px] bg-givre">
        <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-ink">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-ink" />
          <span>100 %</span>
        </div>
        <div className="px-4 pt-4 pb-3">
          <p className="text-[11px]">Mardi 12 novembre</p>
          <p className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">Interventions</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] text-ink ring-1 ring-line">
            <WifiSlashIcon className="size-3" /> Hors connexion, synchronisé à 8:12
          </p>
        </div>
        <ul className="space-y-2 px-3 pb-4">
          {jobs.map((j) => (
            <li key={j.time} className="flex items-center gap-3 rounded-2xl bg-white p-3">
              <span className="font-display text-[12px] font-semibold text-ink">{j.time}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-ink">{j.client}</span>
                <span className="block text-[10px]">{j.place}</span>
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${j.tone}`}>{j.status}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-around border-t border-line bg-white px-4 pt-2.5 pb-5 text-[9px]">
          <span className="font-semibold text-electrik">Planning</span><span>Clients</span><span>Photos</span><span>Profil</span>
        </div>
      </div>
    </div>
  );
}
