"use client";

import { netYazi } from "@/lib/net";

/** Bir dersin netini tavanına oranlayan çubuk. Değer değiştikçe akıcı büyür. */
export function NetCubugu({
  ad,
  renk,
  deger,
  tavan,
  ortalama,
}: {
  ad: string;
  renk: string;
  deger: number;
  tavan: number;
  ortalama?: number;
}) {
  const oran = Math.max(Math.min(deger / tavan, 1), 0);
  const ortOran = ortalama ? Math.min(ortalama / tavan, 1) : null;
  const fark = ortalama ? Math.round((deger - ortalama) * 10) / 10 : null;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="etiket truncate">{ad}</span>
        <span className="sayi text-[15px]" style={{ color: deger > 0 ? renk : "var(--text-muted)" }}>
          {netYazi(deger)}
        </span>
      </div>
      <div className="segment relative mt-2" style={{ color: renk }}>
        <span
          style={{
            transform: `scaleX(${oran})`,
            boxShadow: oran > 0 ? `0 0 12px ${renk}` : "none",
          }}
        />
        {ortOran !== null ? (
          <i
            aria-hidden
            className="absolute top-[-3px] block h-3 w-[2px] bg-[var(--text-muted)]"
            style={{ left: `${ortOran * 100}%` }}
          />
        ) : null}
      </div>
      {fark !== null && deger > 0 ? (
        <p className="mt-1.5 text-[12px]" style={{ color: fark >= 0 ? "var(--up)" : "var(--down)" }}>
          Türkiye ortalaması {netYazi(ortalama!)} · {fark >= 0 ? "+" : ""}
          {netYazi(fark)} net
        </p>
      ) : null}
    </div>
  );
}
