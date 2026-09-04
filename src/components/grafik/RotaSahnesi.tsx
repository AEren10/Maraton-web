import { siraTahminiSayi } from "@/data/siralama";

const W = 1200;
const H = 430;
const SOL = 96;
const BUGUN_X = 620;
const SON_X = 940;
const ALT = H - 62;
const UST = 58;

const ENAZ = 48;
const ENCOK = 80;
const y = (v: number) => ALT - ((v - ENAZ) / (ENCOK - ENAZ)) * (ALT - UST);

const GECMIS = [52, 54, 53, 56, 55, 58, 57, 59, 60];
const HEDEF = 72;
const TAHMIN = HEDEF;

/** Koreografi: ızgara → alan → çizgi → noktalar → bugün → hedef → tahmin → sınav günü. */
const T = {
  izgara: 0,
  alan: 500,
  cizgi: 560,
  nokta: 700,
  bugun: 1720,
  hedef: 2000,
  tahmin: 2300,
  varis: 2900,
  bayrak: 3080,
  eksen: 3500,
};

const nokta = (i: number): [number, number] => [
  SOL + (i * (BUGUN_X - SOL)) / (GECMIS.length - 1),
  y(GECMIS[i]),
];

const cizgi = GECMIS.map((_, i) => nokta(i).join(" ")).join(" L ");
const alanYolu = `M ${SOL} ${ALT} L ${cizgi} L ${BUGUN_X} ${ALT} Z`;
const tahminYolu = `M ${BUGUN_X} ${y(60)} C ${BUGUN_X + 150} ${y(61)}, ${SON_X - 190} ${y(66)}, ${SON_X} ${y(TAHMIN)}`;

const ms = (v: number) => `${v}ms`;

export function RotaSahnesi() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Deneme netlerinin bugüne kadarki seyri ve sınav gününe uzanan tahmin eğrisi"
    >
      <defs>
        <linearGradient id="rota-alan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.36" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="rota-kirp">
          <rect className="kirp" x={BUGUN_X} y="0" width={SON_X - BUGUN_X + 90} height={H} />
        </clipPath>
      </defs>

      {[50, 60, 70, 79].map((v, i) => (
        <g key={v}>
          <line x1={SOL} y1={y(v)} x2={SON_X + 80} y2={y(v)} stroke="var(--line-soft)"
            strokeWidth="1" className="ac-yatay"
            style={{ ["--sol" as string]: `${SOL}px`, ["--gecikme" as string]: ms(T.izgara + i * 90) }} />
          <text x={SOL - 20} y={y(v) + 6} textAnchor="end" fontSize="17" fill="var(--text-muted)"
            className="sayi solur" style={{ ["--gecikme" as string]: ms(T.izgara + i * 90) }}>
            {v}
          </text>
        </g>
      ))}

      <path d={alanYolu} fill="url(#rota-alan)" className="yuksel-alan"
        style={{ ["--taban" as string]: `${ALT}px`, ["--gecikme" as string]: ms(T.alan) }} />

      <path d={`M ${cizgi}`} fill="none" stroke="var(--brand)" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round" className="cizim parilti"
        style={{ ["--u" as string]: "900", ["--gecikme" as string]: ms(T.cizgi) }} />

      {GECMIS.slice(0, -1).map((_, i) => {
        const [x, yy] = nokta(i);
        return (
          <circle key={i} cx={x} cy={yy} r="5" fill="var(--ink)" stroke="var(--brand)"
            strokeWidth="2.5" className="pop"
            style={{ ["--gecikme" as string]: ms(T.nokta + i * 105) }} />
        );
      })}

      <g className="pop" style={{ ["--gecikme" as string]: ms(T.bugun) }}>
        <circle cx={BUGUN_X} cy={y(60)} r="11" fill="var(--brand)" className="ping"
          style={{ ["--gecikme" as string]: ms(T.bugun + 300) }} />
        <circle cx={BUGUN_X} cy={y(60)} r="11" fill="var(--brand)" className="ping"
          style={{ ["--gecikme" as string]: ms(T.bugun + 1400) }} />
        <circle cx={BUGUN_X} cy={y(60)} r="18" fill="none" stroke="var(--brand)"
          strokeWidth="2" opacity="0.35" />
        <circle cx={BUGUN_X} cy={y(60)} r="10" fill="var(--brand)" className="parilti" />
        <circle cx={BUGUN_X} cy={y(60)} r="3.5" fill="var(--ink)" />
      </g>
      <text x={BUGUN_X} y={y(60) + 42} textAnchor="middle" fontSize="15"
        fill="var(--brand-light)" className="etiket solur"
        style={{ ["--gecikme" as string]: ms(T.bugun + 200) }}>
        Bugün
      </text>

      <line x1={SOL} y1={y(HEDEF)} x2={SON_X + 80} y2={y(HEDEF)} stroke="var(--brand)"
        strokeWidth="1.5" strokeDasharray="7 8" opacity="0.55" className="ac-yatay"
        style={{ ["--sol" as string]: `${SOL}px`, ["--gecikme" as string]: ms(T.hedef) }} />
      <text x={SOL + 10} y={y(HEDEF) - 14} fontSize="15" fill="var(--brand-light)"
        className="etiket solur" style={{ ["--gecikme" as string]: ms(T.hedef + 250) }}>
        Hedef çizgisi
      </text>

      <g clipPath="url(#rota-kirp)">
        <path d={tahminYolu} fill="none" stroke="var(--brand)" strokeWidth="3.5"
          strokeDasharray="13 12" strokeLinecap="round" opacity="0.9" />
      </g>

      <circle cx={SON_X} cy={y(HEDEF)} r="16" fill="none" stroke="var(--brand)" strokeWidth="4"
        className="patlama" style={{ ["--gecikme" as string]: ms(T.varis + 120) }} />

      <g className="pop" style={{ ["--gecikme" as string]: ms(T.varis) }}>
        <circle cx={SON_X} cy={y(HEDEF)} r="9" fill="var(--brand)" className="parilti" />
        <circle cx={SON_X} cy={y(HEDEF)} r="3" fill="var(--ink)" />
      </g>

      <rect x={SON_X - 1.5} y={y(HEDEF) - 62} width="3" height="62" rx="1.5" fill="var(--brand)"
        className="direk" style={{ ["--gecikme" as string]: ms(T.bayrak) }} />
      <path d={`M ${SON_X + 1} ${y(HEDEF) - 60} L ${SON_X + 46} ${y(HEDEF) - 49} L ${SON_X + 1} ${y(HEDEF) - 38} Z`}
        fill="var(--brand)" className="bayrak parilti"
        style={{ ["--gecikme" as string]: ms(T.bayrak + 320) }} />

      <g className="solur" style={{ ["--gecikme" as string]: ms(T.bayrak + 520) }}>
        <text x={SON_X + 62} y={y(HEDEF) - 4} fontSize="15" fill="var(--brand-light)" className="etiket">
          Bu netin karşılığı
        </text>
        <text x={SON_X + 62} y={y(HEDEF) + 30} fontSize="34" fill="var(--text)" className="sayi">
          ~{Math.round(siraTahminiSayi(HEDEF) / 1000).toLocaleString("tr-TR")}.000
        </text>
        <text x={SON_X + 62} y={y(HEDEF) + 52} fontSize="15" fill="var(--text-muted)" className="etiket">
          sıra
        </text>
      </g>

      {[
        [SOL, "26 May"],
        [BUGUN_X, "23 Haz"],
        [SON_X, "20 Haz 2027"],
      ].map(([x, ad], i) => (
        <text key={ad as string} x={x as number} y={H - 18}
          textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
          fontSize="14" fill="var(--text-muted)" className="etiket solur"
          style={{ ["--gecikme" as string]: ms(T.eksen + i * 90) }}>
          {ad}
        </text>
      ))}
    </svg>
  );
}
