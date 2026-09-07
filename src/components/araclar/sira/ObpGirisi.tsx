"use client";

import { obpKatkisi, VARSAYILAN_OBP_KATKISI } from "@/lib/yerlestirme";

/**
 * Diploma notu isteğe bağlı. Girilmezse ortalama bir katkı varsayılıyor;
 * girilince sıra gerçek OBP'ye göre kayıyor.
 */
export function ObpGirisi({
  not,
  onDegis,
}: {
  not: number | null;
  onDegis: (v: number | null) => void;
}) {
  const acik = not !== null;
  const katki = acik ? obpKatkisi(not) : VARSAYILAN_OBP_KATKISI;

  return (
    <div className="ic-kart p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div>
          <p className="etiket">Diploma notun</p>
          <p className="mt-1.5 text-[13px] text-[var(--text-secondary)]">
            İsteğe bağlı. Boş bırakırsan ortalama bir katkı varsayılır.
          </p>
        </div>
        <span className="sayi text-[22px]" style={{ color: "var(--tarih)" }}>
          +{Math.round(katki)}
          <span className="etiket ml-1.5" style={{ color: "var(--text-muted)" }}>puan</span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="number"
          min={50}
          max={100}
          step={0.5}
          inputMode="decimal"
          value={acik ? not : ""}
          placeholder="örn. 85"
          aria-label="Diploma notu"
          onChange={(e) => onDegis(e.target.value === "" ? null : Number(e.target.value))}
          className="sayi w-28 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-2.5 text-center text-[19px] outline-none focus:border-[rgba(255,255,255,0.3)]"
        />
        {acik ? (
          <button onClick={() => onDegis(null)} className="kucuk-btn etiket rounded-full border border-[var(--line)] px-3 py-1.5">
            Temizle
          </button>
        ) : null}
        <p className="text-[12px] text-[var(--text-muted)]">
          OBP = diploma notu × 5; puana OBP × 0,12 eklenir, en çok +60.
        </p>
      </div>
    </div>
  );
}
