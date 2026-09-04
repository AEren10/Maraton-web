"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ALAN_KEYS,
  AYT_ALANLARI,
  SINAVLAR,
  dersleriGetir,
  soruSayisi,
  type AlanKey,
  type SinavKey,
} from "@/data/sinavlar";
import { net, netYazi } from "@/lib/net";
import { adresiGuncelle } from "@/lib/paylasim";
import { PaylasKutusu } from "../PaylasKutusu";
import { NetGirisTablosu, type Giris } from "./net/NetGirisTablosu";
import { NetSonucu } from "./net/NetSonucu";

/** Adresteki alan ve net girişlerini çözer. */
function cozumle(arama: string) {
  const p = new URLSearchParams(arama);
  const gelenAlan = p.get("a") as AlanKey | null;
  const alan: AlanKey = gelenAlan && ALAN_KEYS.includes(gelenAlan) ? gelenAlan : "sayisal";
  const giris: Giris = {};
  for (const parca of (p.get("n") ?? "").split(",")) {
    const [ad, d, y] = parca.split(":");
    if (ad) giris[ad] = { d: Number(d) || 0, y: Number(y) || 0 };
  }
  return { alan, giris, diger: p.get("t") ?? "" };
}

export function NetHesaplama({ sinav }: { sinav: SinavKey }) {
  const [alan, setAlan] = useState<AlanKey>("sayisal");
  const [giris, setGiris] = useState<Giris>({});
  const [diger, setDiger] = useState("");

  useEffect(() => {
    const gelen = cozumle(window.location.search);
    if (Object.keys(gelen.giris).length === 0 && !gelen.diger) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- adres bir kez okunur
    setAlan(gelen.alan);
    setGiris(gelen.giris);
    setDiger(gelen.diger);
  }, []);

  const dersler = useMemo(() => dersleriGetir(sinav, alan), [sinav, alan]);
  const soru = soruSayisi(dersler);

  const toplamNet = useMemo(
    () =>
      Math.round(
        dersler.reduce((s, d) => {
          const g = giris[d.ad] ?? { d: 0, y: 0 };
          return s + net(g.d, g.y);
        }, 0) * 100
      ) / 100,
    [dersler, giris]
  );

  useEffect(() => {
    const dolu = dersler
      .map((d) => {
        const g = giris[d.ad];
        return g && (g.d || g.y) ? `${d.ad}:${g.d}:${g.y}` : null;
      })
      .filter(Boolean);
    if (dolu.length) {
      adresiGuncelle({
        ...(sinav === "ayt" ? { a: alan } : {}),
        n: dolu.join(","),
        ...(diger ? { t: diger } : {}),
      });
    }
  }, [giris, dersler, sinav, alan, diger]);

  const yaz = (ad: string, kolon: "d" | "y", v: number, soruSayi: number) => {
    const onceki = giris[ad] ?? { d: 0, y: 0 };
    const yeni = { ...onceki, [kolon]: Math.max(0, Math.min(v, soruSayi)) };
    if (yeni.d + yeni.y > soruSayi) yeni[kolon === "d" ? "y" : "d"] = soruSayi - yeni[kolon];
    setGiris({ ...giris, [ad]: yeni });
  };

  return (
    <div className="kart p-5 sm:p-7">
      {sinav === "ayt" ? (
        <div className="mb-6">
          <p className="etiket">Alanın</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            AYT&apos;de herkes 80 soru çözer, hangi testleri çözdüğün alanına bağlı.
          </p>
          <div className="serit mt-3 w-full">
            {ALAN_KEYS.map((a) => (
              <button
                key={a}
                onClick={() => setAlan(a)}
                className="kucuk-btn etiket rounded-[10px] border px-4 py-2.5"
                style={{
                  borderColor: alan === a ? "var(--brand)" : "var(--line)",
                  color: alan === a ? "var(--text)" : "var(--text-muted)",
                }}
              >
                {AYT_ALANLARI[a].ad}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <NetGirisTablosu dersler={dersler} giris={giris} onDegis={yaz} />

      <NetSonucu
        sinav={sinav}
        dersler={dersler}
        giris={giris}
        toplamNet={toplamNet}
        soru={soru}
        sure={SINAVLAR[sinav].sure}
        digerNet={diger}
        onDigerNet={(v) => setDiger(String(v))}
      />

      {toplamNet > 0 ? (
        <>
          <PaylasKutusu
            kaynak={`${sinav}-net`}
            veri={{
              arac: `${SINAVLAR[sinav].ad} net hesaplama${sinav === "ayt" ? ` · ${AYT_ALANLARI[alan].kisa}` : ""}`,
              anaSayi: netYazi(toplamNet),
              anaEtiket: `${SINAVLAR[sinav].ad} neti`,
              satirlar: dersler
                .filter((d) => {
                  const g = giris[d.ad];
                  return g && (g.d > 0 || g.y > 0);
                })
                .map((d) => {
                  const g = giris[d.ad] ?? { d: 0, y: 0 };
                  return [d.ad, netYazi(net(g.d, g.y))] as [string, string];
                }),
              url: typeof window === "undefined" ? "https://maratonapp.com" : window.location.href,
              metin: `${SINAVLAR[sinav].ad} netim ${netYazi(toplamNet)}.`,
            }}
          />

          <div className="kart kart-vurgu mt-6 p-5">
            <p className="text-[15px] text-[var(--text-secondary)]">
              Peki bu netle nereye gidiyorsun?
            </p>
            <Link href="/hedef-net-rotasi" className="btn btn-brand mt-4 w-full">
              {netYazi(toplamNet)}&apos;ten hedefime rotamı çıkar →
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
