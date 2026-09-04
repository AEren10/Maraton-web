"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trendCikar } from "@/lib/trend";
import { sayiYazi } from "@/lib/net";
import { Stat } from "../ui/Kart";
import { Sayac } from "../ui/Sayac";
import dynamic from "next/dynamic";
import type { TrendNoktasi } from "../grafik/TrendGrafigi";

// Recharts paketin en ağır parçası ve yalnızca burada kullanılıyor;
// grafik görünene kadar indirilmesin.
const TrendGrafigi = dynamic(
  () => import("../grafik/TrendGrafigi").then((m) => m.TrendGrafigi),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] w-full animate-pulse rounded-[14px] bg-[var(--surface-elevated)]" />
    ),
  }
);

export function TempoAraci({ kalanGun }: { kalanGun: number }) {
  const [denemeler, setDenemeler] = useState<string[]>(["", "", ""]);
  const [gun, setGun] = useState(String(kalanGun));
  const [hafta, setHafta] = useState("6");

  const sayilar = denemeler.map(Number).filter((n) => Number.isFinite(n) && n > 0);
  const dolu = sayilar.length >= 2;
  const t = useMemo(
    () => trendCikar(sayilar, Number(gun) || kalanGun, Number(hafta) || 6),
    [gun, hafta, kalanGun, sayilar]
  );

  const veri: TrendNoktasi[] = dolu
    ? [
        ...sayilar.map((n, i) => ({ ad: `${i + 1}. deneme`, gercek: n, tahmin: undefined })),
        { ad: "Sınav", gercek: undefined, tahmin: t.buTempoyla },
      ].map((p, i, a) =>
        i === a.length - 2 ? { ...p, tahmin: p.gercek } : p
      )
    : [];

  const alan =
    "sayi w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-2 text-center text-[19px] outline-none";

  return (
    <div className="kart p-5 sm:p-7">
      <p className="etiket">Son üç denemenin toplam neti</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {denemeler.map((d, i) => (
          <input key={i} type="number" inputMode="decimal" className={alan} value={d}
            placeholder={["58", "62", "65"][i]} aria-label={`${i + 1}. deneme neti`}
            onChange={(e) =>
              setDenemeler((s) => s.map((v, j) => (j === i ? e.target.value : v)))
            } />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <label className="block">
          <span className="etiket block">Kaç haftaya yayıldı</span>
          <input type="number" inputMode="numeric" className={`${alan} mt-2`} value={hafta}
            aria-label="Denemelerin yayıldığı hafta" onChange={(e) => setHafta(e.target.value)} />
        </label>
        <label className="block">
          <span className="etiket block">Sınava kalan gün</span>
          <input type="number" inputMode="numeric" className={`${alan} mt-2`} value={gun}
            aria-label="Sınava kalan gün" onChange={(e) => setGun(e.target.value)} />
        </label>
      </div>

      {dolu ? (
        <>
          <div className="kart kart-vurgu mt-7 p-5 sm:p-6">
            <p className="etiket">Bu tempoyla sınav günü</p>
            <p className="mt-3 flex items-baseline gap-3">
              <span
                className="sayi text-[clamp(48px,11vw,72px)] leading-none"
                style={{ color: "var(--brand)", textShadow: "0 0 40px var(--brand-glow)" }}
              >
                <Sayac deger={t.buTempoyla} />
              </span>
              <span className="text-[16px] text-[var(--text-secondary)]">net</span>
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
              <span className="etiket">Tahmin aralığı</span>
              <span className="sayi text-[17px]">
                {t.dususOlursa}–{t.tempoArtarsa} net
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
            <Stat etiket="Tempo artarsa" deger={t.tempoArtarsa} renk="var(--up)" />
            <Stat etiket="Bu tempoyla" deger={t.buTempoyla} />
            <Stat etiket="Düşüş olursa" deger={t.dususOlursa} renk="var(--down)" />
          </div>

          <div className="mt-6">
            <TrendGrafigi veri={veri} />
          </div>

          <p className="mt-4 text-[14px] text-[var(--text-secondary)]">
            Bu bir tahmin değil, mevcut trendinin devamı. Trend değişirse sonuç değişir.
            Ayda {sayiYazi(t.aylikArtis)} net gidiyorsun, {sayiYazi(t.kalanAy)} ay kaldı. Tavana yaklaştıkça artış yavaşlar; projeksiyon bunu hesaba katıyor.
          </p>

          <div className="ic-kart mt-6 p-5">
            <p className="text-[15px] text-[var(--text-secondary)]">
              Peki {t.tempoArtarsa}&apos;ya çıkmak için neyi değiştirmen gerekiyor?
            </p>
            <Link href="/hedef-net-rotasi" className="btn btn-brand mt-4 w-full">
              {t.tempoArtarsa} netin dağıtımını gör →
            </Link>
          </div>
        </>
      ) : (
        <p className="mt-6 text-[14px] text-[var(--text-muted)]">
          En az iki deneme neti gir. Tek sonuç trend vermez.
        </p>
      )}
    </div>
  );
}
