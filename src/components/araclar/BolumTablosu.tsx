"use client";

import Link from "next/link";
import { useState } from "react";
import { ALANLAR, BOLUMLER, BOLUM_KAYNAK, type Alan, type Bolum } from "@/data/bolumler";
import { netTahmini } from "@/data/siralama";

const SEKMELER: ("Hepsi" | Alan)[] = ["Hepsi", ...ALANLAR];

function Satir({ b }: { b: Bolum }) {
  const kolay = netTahmini(b.sonSira);
  const zor = netTahmini(b.ustSira);
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--line-soft)] py-4 last:border-0">
      <div className="min-w-0">
        <Link
          href={`/hedef-net-rotasi?h=${kolay}`}
          className="text-[15px] font-medium hover:text-[var(--brand-light)]"
        >
          {b.ad}
        </Link>
        <p className="etiket mt-1.5">
          {b.alan} · {b.ustSira.toLocaleString("tr-TR")} – {b.sonSira.toLocaleString("tr-TR")}. sıra
          {b.dogrulanmis ? (
            <span style={{ color: "var(--up)" }}> · doğrulanmış</span>
          ) : (
            <span style={{ color: "var(--warn)" }}> · yaklaşık</span>
          )}
        </p>
      </div>
      <div className="text-right">
        <p className="sayi text-[19px]">
          {kolay} <span className="text-[var(--text-muted)]">–</span> {zor}
        </p>
        <p className="etiket mt-1">net</p>
      </div>
    </li>
  );
}

export function BolumTablosu() {
  const [sekme, setSekme] = useState<(typeof SEKMELER)[number]>("Hepsi");
  const liste = [...BOLUMLER]
    .filter((b) => sekme === "Hepsi" || b.alan === sekme)
    .sort((a, b) => a.ustSira - b.ustSira);

  return (
    <div className="kart p-5 sm:p-7">
      <div className="flex flex-wrap gap-2">
        {SEKMELER.map((s) => (
          <button
            key={s}
            onClick={() => setSekme(s)}
            className="kucuk-btn etiket rounded-[10px] border px-3 py-2"
            style={{
              borderColor: sekme === s ? "var(--brand)" : "var(--line)",
              color: sekme === s ? "var(--text)" : "var(--text-muted)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-[var(--line)] pb-3">
        <span className="etiket">Bölüm · 2025 sıra aralığı</span>
        <span className="etiket text-right">Gereken net</span>
      </div>

      <ul>
        {liste.map((b) => (
          <Satir key={b.ad} b={b} />
        ))}
      </ul>

      <p className="mt-6 border-t border-[var(--line)] pt-5 text-[13px] leading-relaxed text-[var(--text-muted)]">
        Soldaki iki sayı devlet üniversitelerinde en üst programın ve son yerleşenin 2025
        başarı sırası. Sağdaki net aralığı bu sıraların karşılığı: alt sınır o bölümde bir
        yere yerleşmek, üst sınır en iyi programa girmek için. {BOLUM_KAYNAK}
      </p>
    </div>
  );
}
