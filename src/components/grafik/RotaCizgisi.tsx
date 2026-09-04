"use client";

/** Mevcut netten hedef nete giden tek çizgi. Çizilme animasyonlu. */
export function RotaCizgisi({
  bas,
  son,
  yukseklik = 170,
}: {
  bas: number;
  son: number;
  yukseklik?: number;
}) {
  const w = 600;
  const h = yukseklik;
  const ust = 34;
  const alt = h - 34;
  const y1 = son > bas ? alt : (alt + ust) / 2;
  const y2 = son > bas ? ust : (alt + ust) / 2;
  const d = `M 12 ${y1} C ${w * 0.42} ${y1}, ${w * 0.58} ${y2}, ${w - 12} ${y2}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img"
      aria-label={`${bas} netten ${son} nete giden rota`}>
      <line x1="12" y1={y1} x2={w - 12} y2={y1} stroke="var(--line)" strokeWidth="1" />
      <path
        d={d}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="3"
        strokeLinecap="round"
        className="rota-cizgi"
        style={{ ["--uzunluk" as string]: "760" }}
      />
      <circle cx="12" cy={y1} r="5" fill="var(--down)" />
      <circle cx={w - 12} cy={y2} r="6" fill="var(--brand)" />
      <text x="12" y={y1 + 26} className="sayi" fontSize="17"
        fill="var(--text-muted)">{bas}</text>
      <text x={w - 12} y={y2 - 18} textAnchor="end" className="sayi" fontSize="26"
        fill="var(--text)">{son}</text>
    </svg>
  );
}
