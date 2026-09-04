"use client";

import { tempo } from "@/lib/tempo";

const DURAKLAR = [60, 65, 70, 75, 80, 90, 100];

export function HedefSlider({
  hedef,
  mevcutToplam,
  kalanGun,
  onDegis,
}: {
  hedef: number;
  mevcutToplam: number;
  kalanGun: number;
  onDegis: (v: number) => void;
}) {
  const yakin = DURAKLAR.reduce((a, b) =>
    Math.abs(b - hedef) < Math.abs(a - hedef) ? b : a
  );
  const t = tempo(Math.max(hedef - mevcutToplam, 0), kalanGun);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <span className="etiket">Hedefi kaydır</span>
        <span className="flex items-center gap-2 text-[13px]" style={{ color: t.renk }}>
          <span aria-hidden>{t.isaret}</span>
          <span className="etiket" style={{ color: t.renk }}>{t.ad}</span>
        </span>
      </div>

      <input
        type="range"
        className="slider mt-4"
        min={DURAKLAR[0]}
        max={DURAKLAR[DURAKLAR.length - 1]}
        step={1}
        value={Math.min(Math.max(hedef, DURAKLAR[0]), 100)}
        aria-label="Hedef net"
        onChange={(e) => onDegis(Number(e.target.value))}
      />

      <div className="mt-3 flex justify-between">
        {DURAKLAR.map((d) => (
          <button
            key={d}
            onClick={() => onDegis(d)}
            className="sayi rounded-md px-2 py-1 text-[13px] transition-colors hover:text-[var(--text)]"
            style={{ color: yakin === d ? "var(--text)" : "var(--text-muted)" }}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[14px] text-[var(--text-secondary)]">
        Ayda {t.aylik} net, haftada {t.haftalik}. {t.cumle}
      </p>
    </div>
  );
}
