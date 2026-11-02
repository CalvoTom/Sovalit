/** Graphique de prévision : historique, prévision et intervalle de confiance (données d'exemple). */
const history = [42, 45, 41, 48, 52, 50, 55, 58, 54, 61, 64, 62];
const forecast = [62, 67, 70, 68, 74, 77];
const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", "janv.", "févr.", "mars", "avr.", "mai"];

const W = 560;
const H = 240;
const min = 30;
const max = 90;
const step = W / (history.length + forecast.length - 2);
const px = (i: number) => i * step;
const py = (v: number) => H - ((v - min) / (max - min)) * H;

export function ForecastChart() {
  const hist = history.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  const start = history.length - 1;
  const fc = forecast.map((v, i) => `${px(start + i)},${py(v)}`).join(" ");
  const upper = forecast.map((v, i) => `${px(start + i)},${py(v + i * 1.6)}`);
  const lower = forecast.map((v, i) => `${px(start + i)},${py(v - i * 1.6)}`).reverse();

  return (
    <div className="rounded-[24px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Chiffre d&apos;affaires mensuel, en k€</p>
          <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">Prévision à 6 mois</p>
        </div>
        <div className="flex gap-5 text-xs text-white/70">
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-white" /> Historique</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 border-t-2 border-dashed border-[#5aa9f2]" /> Prévision</span>
        </div>
      </div>
      <svg viewBox={`-8 -8 ${W + 16} ${H + 36}`} className="w-full" role="img" aria-label="Exemple de courbe de prévision des ventes avec intervalle de confiance">
        {[40, 60, 80].map((v) => (
          <line key={v} x1={0} x2={W} y1={py(v)} y2={py(v)} stroke="white" strokeOpacity={0.08} />
        ))}
        <polygon points={[...upper, ...lower].join(" ")} fill="#0079e0" fillOpacity={0.35} />
        <polyline points={hist} fill="none" stroke="white" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={fc} fill="none" stroke="#5aa9f2" strokeWidth={2.5} strokeDasharray="6 6" strokeLinecap="round" />
        <line x1={px(start)} x2={px(start)} y1={0} y2={H} stroke="white" strokeOpacity={0.25} strokeDasharray="2 4" />
        <circle cx={px(start)} cy={py(history[start])} r={5} fill="#0079e0" stroke="white" strokeWidth={2} />
        {months.map((m, i) =>
          i % 2 === 0 ? (
            <text key={i} x={px(i)} y={H + 26} textAnchor="middle" fontSize={11} fill="white" fillOpacity={0.45}>{m}</text>
          ) : null,
        )}
      </svg>
    </div>
  );
}
