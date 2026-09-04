"use client";

import Link from "next/link";
import { useState } from "react";
import { ALANLAR, BOLUMLER, BOLUM_KAYNAK, type Alan, type Bolum } from "@/data/bolumler";
import { netTahmini, tavandaMi } from "@/data/siralama";
import { bolumSlug } from "@/data/programatik";

const SEKMELER: ("Hepsi" | Alan)[] = ["Hepsi", ...ALANLAR];

function Satir({ b }: { b: Bolum }) {
  const kolay = netTahmini(b.sonSira);
  const zor = netTahmini(b.ustSira);
  const zorYazi = tavandaMi(b.ustSira) ? `${zor}+` : String(zor);
  return (
    <li className="border-b border-[var(--line-soft)] py-4 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <Link
          href={`/bolum/${bolumSlug(b)}`}
          className="min-w-0 flex-1 text-[15px] font-medium hover:text-[var(--brand-light)]"
        >
          {b.ad}
        </Link>
        <p className="shrink-0 text-right">
          <span className="sayi text-[19px]">
            {kolay} <span className="text-[var(--text-muted)]">–</span> {zorYazi}
          </span>
          <span className="etiket ml-2">net</span>
        </p>
      </div>
      <p className="etiket mt-2">
          {b.alan} · {b.ustSira.toLocaleString("tr-TR")} – {b.sonSira.toLocaleString("tr-TR")}. sıra
        {b.dogrulanmis ? (
          <span style={{ color: "var(--up)" }}> · doğrulanmış</span>
        ) : (
          <span style={{ color: "var(--warn)" }}> · yaklaşık</span>
        )}
      </p>
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
      <div className="serit">
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
        yere yerleşmek, üst sınır en iyi programa girmek için. Artı işaretli üst sınırlar
        sıralama tablosunun en üst bandına dayanıyor; o noktadan yukarısı net üzerinden
        okunamıyor. {BOLUM_KAYNAK}
      </p>
    </div>
  );
}
