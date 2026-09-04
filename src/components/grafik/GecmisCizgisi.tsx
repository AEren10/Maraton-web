"use client";

import type { Deneme } from "@/lib/gecmis";
import { tarihYazi } from "@/lib/gecmis";

const W = 600;
const H = 200;
const SOL = 34;
const ALT = H - 34;
const UST = 18;

/** Kaydedilen denemelerin seyri. Recharts yüklemeden, tek SVG. */
export function GecmisCizgisi({ denemeler }: { denemeler: Deneme[] }) {
  const netler = denemeler.map((d) => d.net);
  const enAz = Math.min(...netler);
  const enCok = Math.max(...netler);
  const yayilim = Math.max(enCok - enAz, 4);
  const taban = enAz - yayilim * 0.2;
  const tavan = enCok + yayilim * 0.2;

  const x = (i: number) =>
    SOL + (i * (W - SOL - 16)) / Math.max(denemeler.length - 1, 1);
  const y = (v: number) => ALT - ((v - taban) / (tavan - taban)) * (ALT - UST);

  const cizgi = denemeler.map((d, i) => `${x(i)} ${y(d.net)}`).join(" L ");
  const alan = `M ${SOL} ${ALT} L ${cizgi} L ${x(denemeler.length - 1)} ${ALT} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`Kaydedilen ${denemeler.length} denemenin net seyri: ${netler[0]} netten ${netler[netler.length - 1]} nete`}
    >
      <defs>
        <linearGradient id="gecmis-alan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[enCok, enAz].map((v) => (
        <g key={v}>
          <line x1={SOL} y1={y(v)} x2={W - 8} y2={y(v)} stroke="var(--line-soft)" strokeWidth="1" />
          <text x={SOL - 8} y={y(v) + 5} textAnchor="end" fontSize="13" fill="var(--text-muted)"
            className="sayi">
            {Math.round(v)}
          </text>
        </g>
      ))}

      <path d={alan} fill="url(#gecmis-alan)" />
      <path d={`M ${cizgi}`} fill="none" stroke="var(--brand)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className="parilti" />

      {denemeler.map((d, i) => (
        <circle key={d.id} cx={x(i)} cy={y(d.net)} r={i === denemeler.length - 1 ? 6 : 4}
          fill={i === denemeler.length - 1 ? "var(--brand)" : "var(--ink)"}
          stroke="var(--brand)" strokeWidth="2" />
      ))}

      <text x={SOL} y={H - 8} fontSize="12" fill="var(--text-muted)" className="etiket">
        {tarihYazi(denemeler[0].tarih)}
      </text>
      <text x={W - 8} y={H - 8} textAnchor="end" fontSize="12" fill="var(--text-muted)"
        className="etiket">
        {tarihYazi(denemeler[denemeler.length - 1].tarih)}
      </text>
    </svg>
  );
}
