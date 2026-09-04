"use client";

import Link from "next/link";
import { useState } from "react";
import { BOLUMLER, BOLUM_KAYNAK, bolumAra, type Bolum } from "@/data/bolumler";
import { netTahmini } from "@/data/siralama";

export function TersArama() {
  const [q, setQ] = useState("");
  const [secili, setSecili] = useState<Bolum | null>(null);
  const [benim, setBenim] = useState("61");
  const sonuc = bolumAra(q);
  const kolay = secili ? netTahmini(secili.sonSira) : 0;
  const zor = secili ? netTahmini(secili.ustSira) : 0;
  const gereken = kolay;
  const fark = secili ? Math.round(gereken - Number(benim || 0)) : 0;

  return (
    <div className="kart p-5 sm:p-7">
      <label className="block">
        <span className="etiket">Bölüm ara</span>
        <input
          className="giris mt-2"
          value={q}
          placeholder="Bilgisayar Mühendisliği"
          aria-label="Bölüm adı"
          onChange={(e) => {
            setQ(e.target.value);
            setSecili(null);
          }}
        />
      </label>

      {sonuc.length > 0 && !secili ? (
        <ul className="mt-3 flex flex-col gap-1.5">
          {sonuc.map((b) => (
            <li key={b.ad}>
              <button
                onClick={() => {
                  setSecili(b);
                  setQ(b.ad);
                }}
                className="kucuk-btn ic-kart flex w-full items-center justify-between border border-transparent px-4 py-3 text-left"
              >
                <span className="text-[14px]">{b.ad}</span>
                <span className="etiket">{b.alan}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {q.trim().length >= 2 && sonuc.length === 0 && !secili ? (
        <p className="mt-4 text-[14px] text-[var(--text-muted)]">
          Listede {BOLUMLER.length} bölüm var, bu adla eşleşen yok. Daha kısa yaz.
        </p>
      ) : null}

      {secili ? (
        <div className="mt-6 border-t border-[var(--line)] pt-6">
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">
            <span className="text-[var(--text)]">{secili.ad}</span> için 2025&apos;te en üst
            devlet programı{" "}
            <span className="sayi text-[var(--text)]">
              {secili.ustSira.toLocaleString("tr-TR")}
            </span>
            . sırada kapandı, son yerleşen ise{" "}
            <span className="sayi text-[var(--text)]">
              {secili.sonSira.toLocaleString("tr-TR")}
            </span>
            . sıradaydı.
            {secili.ustPuan
              ? ` En yüksek taban ${secili.ustPuan} puanla ${secili.ustOrnek}.`
              : ""}
          </p>

          <div className="kart kart-vurgu mt-5 p-5">
            <p className="etiket">Gereken net (2025 karşılığı)</p>
            <p className="sayi mt-2 text-[38px]" style={{ color: "var(--brand)" }}>
              ~{kolay} <span className="text-[var(--text-muted)]">–</span> ~{zor}
            </p>
            <p className="mt-2 text-[13px] text-[var(--text-secondary)]">
              Alt sınır bir yere yerleşmek, üst sınır en iyi programa girmek için.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="etiket">Senin netin</span>
            <input
              type="number"
              inputMode="numeric"
              value={benim}
              aria-label="Mevcut netin"
              onChange={(e) => setBenim(e.target.value)}
              className="sayi w-20 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-1.5 text-center text-[19px] outline-none"
            />
            <span className="sayi text-[19px]" style={{ color: fark > 0 ? "var(--brand)" : "var(--up)" }}>
              {fark > 0 ? `Fark: ${fark} net` : "Fark kapanmış"}
            </span>
          </div>

          <Link href={`/hedef-net-rotasi?h=${gereken}`} className="btn btn-brand mt-6 w-full">
            {gereken} netin rotasını çıkar →
          </Link>

          <p className="mt-5 text-[12px] leading-relaxed text-[var(--text-muted)]">
            {BOLUM_KAYNAK}
          </p>
        </div>
      ) : null}
    </div>
  );
}
