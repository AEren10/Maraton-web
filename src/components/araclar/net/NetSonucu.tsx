"use client";

import Link from "next/link";
import type { SinavDersi, SinavKey } from "@/data/sinavlar";
import { ISTATISTIK_KAYNAK, ortalamaBul } from "@/data/istatistik";
import { net, netYazi } from "@/lib/net";
import { BARAJ, tytPuan } from "@/lib/puan";
import { PuanPaneli } from "../PuanPaneli";
import { NetCubugu } from "../../ui/NetCubugu";
import { Sayac } from "../../ui/Sayac";
import type { Giris } from "./NetGirisTablosu";

/** TYT netinden yaklaşık puan; dört dersin ayrı katkısı gerekiyor. */
function tytPuanTahmini(giris: Giris) {
  const al = (ad: string) => {
    const g = giris[ad] ?? { d: 0, y: 0 };
    return Math.max(net(g.d, g.y), 0);
  };
  return tytPuan({
    turkce: al("Türkçe"),
    sosyal: al("Sosyal Bilimler"),
    matematik: al("Temel Matematik"),
    fen: al("Fen Bilimleri"),
  });
}

export function NetSonucu({
  sinav,
  dersler,
  giris,
  toplamNet,
  soru,
  sure,
  digerNet,
  onDigerNet,
}: {
  sinav: SinavKey;
  dersler: SinavDersi[];
  giris: Giris;
  toplamNet: number;
  soru: number;
  sure: number;
  digerNet: string;
  onDigerNet: (v: number | string) => void;
}) {
  const tam = Math.trunc(toplamNet);
  const ondalik = String(Math.abs(Math.round((toplamNet - tam) * 100))).padStart(2, "0");

  const digerSayi = Number(digerNet.replace(",", "."));
  const digerGecerli = Number.isFinite(digerSayi) && digerSayi > 0;
  const digerAlan = digerGecerli ? digerSayi : 0;
  const puan = sinav === "tyt" ? tytPuanTahmini(giris) : null;

  return (
    <>
      <div className="mt-7 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
        {dersler.map((d) => {
          const g = giris[d.ad] ?? { d: 0, y: 0 };
          return (
            <NetCubugu key={d.ad} ad={d.ad} renk={d.renk} tavan={d.soru}
              deger={Math.max(net(g.d, g.y), 0)} ortalama={ortalamaBul(d.ad)} />
          );
        })}
      </div>

      <div className="mt-7 flex items-end justify-between gap-4 border-t border-[var(--line)] pt-6">
        <div>
          <p className="etiket">{sinav.toUpperCase()} neti</p>
          <p className="sayi bolum-sayi mt-2"
            style={{
              color: toplamNet > 0 ? "var(--brand)" : "var(--text-muted)",
              textShadow: toplamNet > 0 ? "0 0 34px var(--brand-glow)" : "none",
            }}>
            <Sayac deger={tam} />
            <span className="text-[22px] text-[var(--text-muted)]">,{ondalik}</span>
          </p>
        </div>
        <p className="etiket pb-3 text-right">
          {soru} soru · {sure} dk
        </p>
      </div>

      {puan !== null ? (
        <div className="ic-kart mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4">
          <span className="etiket">Yaklaşık TYT puanı</span>
          <span className="sayi text-[22px]"
            style={{ color: puan >= BARAJ ? "var(--up)" : "var(--warn)" }}>
            {netYazi(puan)}
            <span className="etiket ml-2" style={{ color: "var(--text-muted)" }}>
              {puan >= BARAJ ? "baraj geçildi" : `baraja ${netYazi(BARAJ - puan)}`}
            </span>
          </span>
        </div>
      ) : null}

      <div className="kart mt-5 p-5">
        <p className="etiket">Sıralama karşılığı</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
          Sıralama tek oturumla çıkmaz ve iki oturumun neti toplanmaz.{" "}
          {sinav === "tyt" ? "AYT" : "TYT"} netini de gir; ÖSYM&apos;nin 40/60 ağırlığıyla
          puana çevirip 2025 sıra karşılığını gösterelim.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-3">
            <span className="etiket">{sinav === "tyt" ? "AYT" : "TYT"} netin</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={digerNet}
              placeholder="örn. 45"
              aria-label={`${sinav === "tyt" ? "AYT" : "TYT"} neti`}
              onChange={(e) => onDigerNet(e.target.value)}
              className="sayi w-24 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-2 text-center text-[17px] outline-none"
            />
          </label>
        </div>
      </div>

      <PuanPaneli tytNet={sinav === "tyt" ? toplamNet : digerAlan} aytNet={sinav === "ayt" ? toplamNet : digerAlan} />

      {digerGecerli ? (
        <Link href={`/net/${Math.min(Math.max(Math.round(toplamNet), 40), 115)}-net-kac-siralama`}
          className="baglanti mt-4 inline-block text-[14px]">
          Bu bandda hangi bölümler açık?
        </Link>
      ) : null}

      <p className="mt-5 text-[12px] leading-relaxed text-[var(--text-muted)]">
        Çubuklardaki ince çizgi 2025 Türkiye ortalaması. {ISTATISTIK_KAYNAK} Puan ve
        sıralama tahmindir; ÖSYM sonucu değildir.
      </p>
    </>
  );
}
