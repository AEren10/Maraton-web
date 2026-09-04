"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BOLUM_KAYNAK, tercihListesi, type Bolum } from "@/data/bolumler";
import { siraTahminiSayi } from "@/data/siralama";
import { Sayac } from "../ui/Sayac";
import { PaylasKutusu } from "../PaylasKutusu";

const ALANLAR = ["Hepsi", "Sayısal", "Eşit Ağırlık", "Sözel", "Dil"] as const;

function Satir({ b, girer }: { b: Bolum; girer: boolean }) {
  return (
    <li className="border-b border-[var(--line-soft)] py-3.5 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="min-w-0 flex-1 text-[15px]">{b.ad}</p>
        <span className="sayi shrink-0 text-[15px]"
          style={{ color: girer ? "var(--up)" : "var(--down)" }}>
          {b.ustSira.toLocaleString("tr-TR")} – {b.sonSira.toLocaleString("tr-TR")}
        </span>
      </div>
      <p className="etiket mt-1.5">
        {b.alan}
        {b.ustPuan ? ` · en üst taban ${b.ustPuan} (${b.ustOrnek})` : ""}
      </p>
    </li>
  );
}

export function TercihRobotu() {
  const [net, setNet] = useState("70");
  const [alan, setAlan] = useState<(typeof ALANLAR)[number]>("Hepsi");

  const sayi = Math.max(Number(net) || 0, 0);
  const sira = useMemo(() => siraTahminiSayi(sayi), [sayi]);
  const { girer, yakin } = useMemo(() => tercihListesi(sira), [sira]);
  const suz = (l: Bolum[]) => (alan === "Hepsi" ? l : l.filter((b) => b.alan === alan));

  return (
    <div className="kart p-5 sm:p-7">
      <div className="flex flex-col gap-5">
        <label className="block">
          <span className="etiket block">Toplam netin</span>
          <input
            type="number"
            inputMode="numeric"
            autoComplete="off"
            value={net}
            aria-label="Toplam net"
            onChange={(e) => setNet(e.target.value)}
            className="giris sayi mt-2 w-full max-w-[160px] text-center text-[28px]"
          />
        </label>
        <div className="serit">
          {ALANLAR.map((a) => (
            <button
              key={a}
              onClick={() => setAlan(a)}
              className="kucuk-btn etiket rounded-[10px] border px-3 py-2"
              style={{
                borderColor: alan === a ? "var(--brand)" : "var(--line)",
                color: alan === a ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="kart kart-vurgu mt-6 p-6">
        <p className="etiket">Bu netin 2025 karşılığı</p>
        <p className="mt-3 flex items-baseline gap-3">
          <span
            className="sayi text-[clamp(40px,9vw,64px)] leading-none"
            style={{ color: "var(--brand)", textShadow: "0 0 40px var(--brand-glow)" }}
          >
            <Sayac deger={sira} sure={600} />
          </span>
          <span className="text-[16px] text-[var(--text-secondary)]">. sıra civarı</span>
        </p>
      </div>

      <div className="mt-7">
        <p className="etiket">
          Bu sırayla girilebilenler ({suz(girer).length})
        </p>
        <ul className="mt-3">
          {suz(girer).slice(0, 12).map((b) => (
            <Satir key={b.ad} b={b} girer />
          ))}
          {suz(girer).length === 0 ? (
            <li className="py-3 text-[14px] text-[var(--text-muted)]">
              Bu netle listedeki bölümlere sıra yetmiyor. Aşağıdaki listeye bak.
            </li>
          ) : null}
        </ul>
      </div>

      {suz(yakin).length > 0 ? (
        <div className="mt-7 border-t border-[var(--line)] pt-6">
          <p className="etiket">Yakın duranlar ({suz(yakin).length})</p>
          <ul className="mt-3">
            {suz(yakin).slice(0, 8).map((b) => (
              <Satir key={b.ad} b={b} girer={false} />
            ))}
          </ul>
        </div>
      ) : null}

      <PaylasKutusu
        kaynak="tercih-robotu"
        veri={{
          arac: "Tercih robotu",
          anaSayi: sira.toLocaleString("tr-TR"),
          anaEtiket: `${sayi} netin 2025 sıra karşılığı`,
          satirlar: [
            ["Net", String(sayi)],
            ["Açılan bölüm", `${girer.length}`],
            ["Alan", alan],
          ],
          url: "https://maratonapp.com/tercih-robotu",
          metin: `${sayi} net 2025'te yaklaşık ${sira.toLocaleString("tr-TR")}. sıraya denk geliyordu.`,
        }}
      />

      <Link href={`/hedef-net-rotasi?h=${Math.min(Math.round(sayi) + 12, 120)}`}
        className="btn btn-brand mt-7 w-full">
        Bu listeyi bir üst banda taşıyacak rotayı çıkar →
      </Link>

      <p className="mt-5 text-[12px] leading-relaxed text-[var(--text-muted)]">
        Bu bir tercih listesi değil, bir yön göstergesi. {BOLUM_KAYNAK} Kesin tercih için
        YÖK Atlas&apos;taki program bazlı verilere bak.
      </p>
    </div>
  );
}
