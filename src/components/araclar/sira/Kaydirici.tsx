"use client";

/** Tek bir oturumun netini sürüklemeye yarayan çubuk. */
export function Kaydirici({
  ad,
  aciklama,
  deger,
  tavan,
  renk,
  onDegis,
}: {
  ad: string;
  aciklama: string;
  deger: number;
  tavan: number;
  renk: string;
  onDegis: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="etiket">{ad}</span>
        <span className="sayi text-[26px] leading-none" style={{ color: renk }}>
          {deger}
          <span className="etiket ml-1.5" style={{ color: "var(--text-muted)" }}>
            / {tavan}
          </span>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={tavan}
        step={1}
        value={deger}
        aria-label={ad}
        onChange={(e) => onDegis(Number(e.target.value))}
        className="kaydirici mt-3 w-full"
        style={{
          ["--aksan" as string]: renk,
          ["--dolu" as string]: `${(deger / tavan) * 100}%`,
        }}
      />

      <p className="mt-2 text-[12px] text-[var(--text-muted)]">{aciklama}</p>
    </div>
  );
}
