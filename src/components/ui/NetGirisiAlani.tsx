"use client";

export function NetGirisiAlani({
  ad,
  renk,
  deger,
  tavan,
  onChange,
}: {
  ad: string;
  renk: string;
  deger: number;
  tavan: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="ic-kart flex items-center justify-between gap-4 px-4 py-3">
      <span className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: renk }} />
        <span className="etiket">{ad}</span>
      </span>
      <span className="flex items-baseline gap-1">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={tavan}
          value={deger === 0 ? "" : deger}
          placeholder="0"
          aria-label={`${ad} neti`}
          autoComplete="off"
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(Math.max(0, Math.min(Number.isFinite(v) ? v : 0, tavan)));
          }}
          className="sayi w-16 bg-transparent text-right text-[26px] outline-none placeholder:text-[var(--text-muted)]"
        />
        <span className="text-[13px] text-[var(--text-muted)]">/{tavan}</span>
      </span>
    </label>
  );
}
