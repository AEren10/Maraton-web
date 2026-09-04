"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SINAVLAR, type SinavKey } from "@/data/sinavlar";
import { net, netYazi } from "@/lib/net";
import { NetCubugu } from "../ui/NetCubugu";
import { ISTATISTIK_KAYNAK, ortalamaBul } from "@/data/istatistik";
import { Sayac } from "../ui/Sayac";

type Giris = Record<string, { d: number; y: number }>;

export function NetHesaplama({ varsayilan = "tyt" as SinavKey }) {
  const [sinav, setSinav] = useState<SinavKey>(varsayilan);
  const [giris, setGiris] = useState<Giris>({});
  const dersler = SINAVLAR[sinav].dersler;

  const toplamNet = useMemo(
    () =>
      Math.round(
        dersler.reduce((s, d) => {
          const g = giris[`${sinav}:${d.ad}`] ?? { d: 0, y: 0 };
          return s + net(g.d, g.y);
        }, 0) * 100
      ) / 100,
    [dersler, giris, sinav]
  );

  const yaz = (ad: string, alan: "d" | "y", v: number, soru: number) =>
    setGiris((s) => {
      const anahtar = `${sinav}:${ad}`;
      const onceki = s[anahtar] ?? { d: 0, y: 0 };
      const yeni = { ...onceki, [alan]: Math.max(0, Math.min(v, soru)) };
      if (yeni.d + yeni.y > soru) yeni[alan === "d" ? "y" : "d"] = soru - yeni[alan];
      return { ...s, [anahtar]: yeni };
    });

  const alan =
    "sayi w-12 sm:w-14 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-1.5 text-center text-[17px] outline-none";

  return (
    <div className="kart p-5 sm:p-7">
      <div className="flex gap-2">
        {(Object.keys(SINAVLAR) as SinavKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setSinav(k)}
            className="kucuk-btn etiket rounded-[10px] border border-transparent px-4 py-2"
            style={{
              background: sinav === k ? "var(--surface-elevated)" : "transparent",
              color: sinav === k ? "var(--text)" : "var(--text-muted)",
            }}
          >
            {SINAVLAR[k].ad}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-2 sm:gap-x-3 gap-y-1">
        <span />
        <span className="etiket text-center">Doğru</span>
        <span className="etiket text-center">Yanlış</span>
        <span className="etiket text-right">Net</span>
        {dersler.map((d) => {
          const g = giris[`${sinav}:${d.ad}`] ?? { d: 0, y: 0 };
          return (
            <div key={d.ad} className="contents">
              <span className="flex min-w-0 items-center gap-2.5 py-1.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.renk }} />
                <span className="truncate text-[13px] sm:text-[14px] text-[var(--text-secondary)]">
                  {d.ad}{" "}
                  <span className="hidden text-[var(--text-muted)] sm:inline">/{d.soru}</span>
                </span>
              </span>
              <input type="number" inputMode="numeric" className={alan} value={g.d || ""}
                placeholder="0" aria-label={`${d.ad} doğru`}
                onChange={(e) => yaz(d.ad, "d", Number(e.target.value), d.soru)} />
              <input type="number" inputMode="numeric" className={alan} value={g.y || ""}
                placeholder="0" aria-label={`${d.ad} yanlış`}
                onChange={(e) => yaz(d.ad, "y", Number(e.target.value), d.soru)} />
              <span className="sayi w-14 sm:w-16 text-right text-[15px] sm:text-[17px]">{netYazi(net(g.d, g.y))}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-7 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
        {dersler.map((d) => {
          const g = giris[`${sinav}:${d.ad}`] ?? { d: 0, y: 0 };
          return (
            <NetCubugu key={d.ad} ad={d.ad} renk={d.renk} tavan={d.soru}
              deger={Math.max(net(g.d, g.y), 0)} ortalama={ortalamaBul(d.ad)} />
          );
        })}
      </div>

      <div className="mt-7 flex items-end justify-between border-t border-[var(--line)] pt-6">
        <div>
          <p className="etiket">{SINAVLAR[sinav].ad} neti</p>
          <p
            className="sayi bolum-sayi mt-2"
            style={{
              color: toplamNet > 0 ? "var(--brand)" : "var(--text-muted)",
              textShadow: toplamNet > 0 ? "0 0 34px var(--brand-glow)" : "none",
            }}
          >
            <Sayac deger={Math.trunc(toplamNet)} />
            <span className="text-[22px] text-[var(--text-muted)]">
              ,
              {String(Math.abs(Math.round((toplamNet - Math.trunc(toplamNet)) * 100))).padStart(
                2,
                "0"
              )}
            </span>
          </p>
        </div>
        <p className="etiket pb-3">
          {SINAVLAR[sinav].dersler.reduce((s, d) => s + d.soru, 0)} soru ·{" "}
          {SINAVLAR[sinav].sure} dk
        </p>
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-[var(--text-muted)]">
        Çubuklardaki ince çizgi 2025 Türkiye ortalaması. {ISTATISTIK_KAYNAK}
      </p>

      {toplamNet > 0 ? (
        <div className="mt-6 kart kart-vurgu p-5">
          <p className="text-[15px] text-[var(--text-secondary)]">
            Peki bu netle nereye gidiyorsun?
          </p>
          <Link href="/hedef-net-rotasi" className="btn btn-brand mt-4 w-full">
            {netYazi(toplamNet)}&apos;ten hedefime rotamı çıkar →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
