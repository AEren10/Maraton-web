"use client";

import { DERSLER, TAVAN, toplam, type DersKey, type Netler } from "@/lib/dersler";

function Satir({
  ad,
  renk,
  mevcut,
  artis,
  tavan,
  onDegis,
}: {
  ad: string;
  renk: string;
  mevcut: number;
  artis: number;
  tavan: number;
  onDegis: (d: number) => void;
}) {
  const btn =
    "kucuk-btn h-8 w-8 sm:h-9 sm:w-9 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] transition-transform active:scale-[0.94] disabled:opacity-30";
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[var(--line-soft)] py-3 last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: renk }} />
        <span className="etiket truncate tracking-[0.06em] sm:tracking-[0.14em]">{ad}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <span className="sayi w-[74px] sm:w-[92px] text-right text-[17px] sm:text-[19px] text-[var(--text-secondary)]">
          {mevcut} <span className="text-[var(--text-muted)]">→</span>{" "}
          <span className="text-[var(--text)]">{mevcut + artis}</span>
        </span>
        <span
          className="sayi w-7 sm:w-9 text-right text-[13px] sm:text-[15px]"
          style={{ color: artis > 0 ? "var(--up)" : "var(--text-muted)" }}
        >
          {artis > 0 ? `+${artis}` : "—"}
        </span>
        <button className={btn} onClick={() => onDegis(-1)} disabled={artis <= 0}
          aria-label={`${ad} bir azalt`}>−</button>
        <button className={btn} onClick={() => onDegis(1)} disabled={mevcut + artis >= tavan}
          aria-label={`${ad} bir artır`}>+</button>
      </div>
    </div>
  );
}

export function Dagitim({
  mevcut,
  artis,
  hedef,
  kaldirac,
  onDegis,
}: {
  mevcut: Netler;
  artis: Netler;
  hedef: number;
  kaldirac: DersKey | null;
  onDegis: (k: DersKey, d: number) => void;
}) {
  const varilan = toplam(mevcut) + toplam(artis);
  const sapma = Math.round(varilan - hedef);

  return (
    <div className="kart p-5 sm:p-7">
      <div>
      {DERSLER.map((d) => (
        <Satir
          key={d.key}
          ad={d.ad}
          renk={d.renk}
          tavan={TAVAN[d.key]}
          mevcut={mevcut[d.key]}
          artis={artis[d.key]}
          onDegis={(x) => onDegis(d.key, x)}
        />
      ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
        <span className="etiket">{sapma === 0 ? "Rota tamam" : "Toplam"}</span>
        <span className="sayi text-[26px]">
          {Math.round(toplam(mevcut))} <span className="text-[var(--text-muted)]">→</span>{" "}
          {Math.round(varilan)}
          {sapma === 0 ? (
            <span className="ml-2 text-[var(--up)]">✓</span>
          ) : (
            <span className="ml-3 text-[15px]" style={{ color: "var(--brand)" }}>
              {Math.abs(sapma)} net {sapma < 0 ? "eksik" : "fazla"}
            </span>
          )}
        </span>
      </div>

      {kaldirac ? (
        <p className="etiket mt-5">
          En büyük kaldıraç:{" "}
          <span style={{ color: "var(--text)" }}>
            {DERSLER.find((d) => d.key === kaldirac)!.ad}
          </span>
        </p>
      ) : null}
    </div>
  );
}
