"use client";

import type { SinavDersi } from "@/data/sinavlar";
import { net, netYazi } from "@/lib/net";

export type Giris = Record<string, { d: number; y: number }>;

const ALAN =
  "sayi w-12 sm:w-14 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-1.5 text-center text-[17px] outline-none";

export function NetGirisTablosu({
  dersler,
  giris,
  onDegis,
}: {
  dersler: SinavDersi[];
  giris: Giris;
  onDegis: (ad: string, alan: "d" | "y", v: number, soru: number) => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-2 gap-y-1 sm:gap-x-3">
      <span />
      <span className="etiket text-center">Doğru</span>
      <span className="etiket text-center">Yanlış</span>
      <span className="etiket text-right">Net</span>

      {dersler.map((d) => {
        const g = giris[d.ad] ?? { d: 0, y: 0 };
        return (
          <div key={d.ad} className="contents">
            <span className="flex min-w-0 items-center gap-2.5 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.renk }} />
              <span className="truncate text-[13px] text-[var(--text-secondary)] sm:text-[14px]">
                {d.ad}{" "}
                <span className="hidden text-[var(--text-muted)] sm:inline">/{d.soru}</span>
              </span>
            </span>
            <input
              type="number"
              inputMode="numeric"
              autoComplete="off"
              className={ALAN}
              value={g.d || ""}
              placeholder="0"
              aria-label={`${d.ad} doğru`}
              onChange={(e) => onDegis(d.ad, "d", Number(e.target.value), d.soru)}
            />
            <input
              type="number"
              inputMode="numeric"
              autoComplete="off"
              className={ALAN}
              value={g.y || ""}
              placeholder="0"
              aria-label={`${d.ad} yanlış`}
              onChange={(e) => onDegis(d.ad, "y", Number(e.target.value), d.soru)}
            />
            <span className="sayi w-14 text-right text-[15px] sm:w-16 sm:text-[17px]">
              {netYazi(net(g.d, g.y))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
