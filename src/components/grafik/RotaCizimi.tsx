import { tipikDagilim } from "@/lib/dagilim";
import { ENAZ, ENCOK, GECMIS, HEDEF, T, ms, type Olcu } from "./rotaOlcu";

const SIRA = Math.round(tipikDagilim(HEDEF).sira / 1000);

export function RotaCizimi({ o, kimlik }: { o: Olcu; kimlik: string }) {
  const y = (v: number) => o.ALT - ((v - ENAZ) / (ENCOK - ENAZ)) * (o.ALT - o.UST);
  const nokta = (i: number): [number, number] => [
    o.SOL + (i * (o.BUGUN_X - o.SOL)) / (GECMIS.length - 1),
    y(GECMIS[i]),
  ];
  const cizgi = GECMIS.map((_, i) => nokta(i).join(" ")).join(" L ");
  const alanYolu = `M ${o.SOL} ${o.ALT} L ${cizgi} L ${o.BUGUN_X} ${o.ALT} Z`;
  const yay = o.SON_X - o.BUGUN_X;
  const tahmin = `M ${o.BUGUN_X} ${y(60)} C ${o.BUGUN_X + yay * 0.46} ${y(61)}, ${o.SON_X - yay * 0.55} ${y(66)}, ${o.SON_X} ${y(HEDEF)}`;
  const gec = (v: number) => ({ ["--gecikme" as string]: ms(v) });

  return (
    <svg
      viewBox={`0 0 ${o.W} ${o.H}`}
      className="w-full"
      role="img"
      aria-label={`Dokuz deneme netinin seyri: bugün 60 net, sınav gününde hedef ${HEDEF} net, yaklaşık ${SIRA}.000. sıra`}
    >
      <defs>
        <linearGradient id={`alan-${kimlik}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.36" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`kirp-${kimlik}`}>
          <rect
            className="kirp"
            style={{ ["--kirp-x" as string]: `${o.BUGUN_X}px` }}
            x={o.BUGUN_X}
            y="0"
            width={o.W - o.BUGUN_X}
            height={o.H}
          />
        </clipPath>
      </defs>

      {[50, 60, 70, 79].map((v, i) => (
        <g key={v}>
          <line x1={o.SOL} y1={y(v)} x2={o.W - 10} y2={y(v)} stroke="var(--line-soft)"
            strokeWidth="1" className="ac-yatay"
            style={{ ["--sol" as string]: `${o.SOL}px`, ...gec(T.izgara + i * 90) }} />
          <text x={o.SOL - 12} y={y(v) + 6} textAnchor="end" fontSize={o.yazi.eksen}
            fill="var(--text-muted)" className="sayi solur" style={gec(T.izgara + i * 90)}>
            {v}
          </text>
        </g>
      ))}

      <path d={alanYolu} fill={`url(#alan-${kimlik})`} className="yuksel-alan"
        style={{ ["--taban" as string]: `${o.ALT}px`, ...gec(T.alan) }} />

      <path d={`M ${cizgi}`} fill="none" stroke="var(--brand)" strokeWidth={o.kalinlik}
        strokeLinecap="round" strokeLinejoin="round" className="cizim parilti"
        style={{ ["--u" as string]: "900", ...gec(T.cizgi) }} />

      {GECMIS.slice(0, -1).map((_, i) => {
        const [x, yy] = nokta(i);
        return (
          <circle key={i} cx={x} cy={yy} r={o.kalinlik + 1} fill="var(--ink)"
            stroke="var(--brand)" strokeWidth="2.5" className="pop"
            style={gec(T.nokta + i * 105)} />
        );
      })}

      <line x1={o.SOL} y1={y(HEDEF)} x2={o.W - 10} y2={y(HEDEF)} stroke="var(--brand)"
        strokeWidth="1.5" strokeDasharray="7 8" opacity="0.55" className="ac-yatay"
        style={{ ["--sol" as string]: `${o.SOL}px`, ...gec(T.hedef) }} />
      <text x={o.SOL + 8} y={y(HEDEF) - 12} fontSize={o.yazi.etiket} fill="var(--brand-light)"
        className="etiket solur" style={gec(T.hedef + 250)}>
        Hedef çizgisi
      </text>

      <g clipPath={`url(#kirp-${kimlik})`}>
        <path d={tahmin} fill="none" stroke="var(--brand)" strokeWidth={o.kalinlik - 0.5}
          strokeDasharray="13 12" strokeLinecap="round" opacity="0.9" />
      </g>

      <g className="pop" style={gec(T.bugun)}>
        <circle cx={o.BUGUN_X} cy={y(60)} r="11" fill="var(--brand)" className="ping"
          style={gec(T.bugun + 300)} />
        <circle cx={o.BUGUN_X} cy={y(60)} r="18" fill="none" stroke="var(--brand)"
          strokeWidth="2" opacity="0.35" />
        <circle cx={o.BUGUN_X} cy={y(60)} r="10" fill="var(--brand)" className="parilti" />
        <circle cx={o.BUGUN_X} cy={y(60)} r="3.5" fill="var(--ink)" />
      </g>
      <text x={o.BUGUN_X} y={y(60) + 40} textAnchor="middle" fontSize={o.yazi.etiket}
        fill="var(--brand-light)" className="etiket solur" style={gec(T.bugun + 200)}>
        Bugün
      </text>

      <circle cx={o.SON_X} cy={y(HEDEF)} r="16" fill="none" stroke="var(--brand)" strokeWidth="4"
        className="patlama" style={gec(T.varis + 120)} />
      <g className="pop" style={gec(T.varis)}>
        <circle cx={o.SON_X} cy={y(HEDEF)} r="9" fill="var(--brand)" className="parilti" />
        <circle cx={o.SON_X} cy={y(HEDEF)} r="3" fill="var(--ink)" />
      </g>

      {o.bayrak ? (
        <>
          <rect x={o.SON_X - 1.5} y={y(HEDEF) - 62} width="3" height="62" rx="1.5"
            fill="var(--brand)" className="direk" style={gec(T.bayrak)} />
          <path
            d={`M ${o.SON_X + 1} ${y(HEDEF) - 60} L ${o.SON_X + 46} ${y(HEDEF) - 49} L ${o.SON_X + 1} ${y(HEDEF) - 38} Z`}
            fill="var(--brand)" className="bayrak parilti" style={gec(T.bayrak + 320)} />
          <g className="solur" style={gec(T.bayrak + 520)}>
            <text x={o.SON_X + 62} y={y(HEDEF) - 4} fontSize={o.yazi.etiket}
              fill="var(--brand-light)" className="etiket">Bu netin karşılığı</text>
            <text x={o.SON_X + 62} y={y(HEDEF) + 30} fontSize={o.yazi.sonuc} fill="var(--text)"
              className="sayi">~{SIRA}.000</text>
            <text x={o.SON_X + 62} y={y(HEDEF) + 52} fontSize={o.yazi.etiket}
              fill="var(--text-muted)" className="etiket">sıra</text>
          </g>
        </>
      ) : (
        <g className="solur" style={gec(T.varis + 400)}>
          <text x={o.SOL - 2} y={38} fontSize={o.yazi.etiket} fill="var(--brand-light)"
            className="etiket">Bu netin karşılığı</text>
          <text x={o.SOL - 2} y={84} fontSize={o.yazi.sonuc} fill="var(--text)" className="sayi">
            ~{SIRA}.000
            <tspan fontSize={o.yazi.etiket} fill="var(--text-muted)" dx="12">sıra</tspan>
          </text>
        </g>
      )}

      {([[o.SOL, "26 May"], [o.BUGUN_X, "23 Haz"], [o.SON_X, "20 Haz 2027"]] as const).map(
        ([x, ad], i) => (
          <text key={ad} x={x} y={o.H - 14}
            textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
            fontSize={o.yazi.etiket - 1} fill="var(--text-muted)" className="etiket solur"
            style={gec(T.eksen + i * 90)}>
            {ad}
          </text>
        )
      )}
    </svg>
  );
}
