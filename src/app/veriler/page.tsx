import type { Metadata } from "next";
import { GUVEN_ETIKET, VERILER } from "@/data/kaynak";
import { GENEL, ISTATISTIK_KAYNAK } from "@/data/istatistik";

export const metadata: Metadata = {
  title: "Veri Kaynakları – Sayılar Nereden Geliyor? | Maraton",
  description:
    "Sitedeki her hesaplamanın dayandığı veri: hangisi ÖSYM'nin resmî sayısı, hangisi geçen yıldan çıkarılmış tahmin.",
  alternates: { canonical: "/veriler" },
};

export default function VerilerSayfasi() {
  return (
    <section className="sinir py-14 sm:py-20">
      <h1 className="text-[clamp(28px,5vw,44px)]">Bu sayılar nereden geliyor?</h1>
      <div className="metin mt-5 max-w-[680px] text-[17px]">
        <p>
          Bir hesaplayıcının değeri kaynağı kadardır. Aşağıda her verinin nereden geldiği ve
          ne kadarına güvenebileceğin yazıyor. Tahmin olanı tahmin diye yazdık.
        </p>
        <p>
          Kısaca: net formülü, OBP katsayıları ve baraj ÖSYM kılavuzundan; 2025 net
          ortalamaları ÖSYM&apos;nin resmî sonuç açıklamasından; sıralama ve bölüm bantları
          geçen yılın yerleştirme sonuçlarından çıkarılmış yaklaşık değerlerdir.
        </p>
      </div>

      <ul className="mt-12 grid max-w-[880px] gap-4">
        {VERILER.map((v) => {
          const e = GUVEN_ETIKET[v.guven];
          return (
            <li key={v.anahtar} className="kart p-6" style={{ ["--aksan" as string]: e.renk }}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[18px]">{v.ad}</h2>
                <span
                  className="etiket rounded-full px-2.5 py-1"
                  style={{
                    color: e.renk,
                    border: `1px solid color-mix(in srgb, ${e.renk} 32%, transparent)`,
                  }}
                >
                  {e.ad}
                  {v.yil ? ` · ${v.yil}` : ""}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {v.aciklama}
              </p>
              {v.kaynak ? (
                <p className="mt-3 text-[13px] text-[var(--text-muted)]">
                  Kaynak:{" "}
                  {v.url ? (
                    <a href={v.url} className="baglanti" target="_blank" rel="noopener noreferrer">
                      {v.kaynak}
                    </a>
                  ) : (
                    v.kaynak
                  )}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="kart mt-10 max-w-[880px] p-6">
        <h2 className="text-[18px]">2025-YKS rakamları</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            ["Başvuran", GENEL.basvuran],
            ["Sınava giren", GENEL.giren],
            ["Son sınıf öğrencisi", GENEL.sonSinif],
          ].map(([ad, sayi]) => (
            <div key={ad as string}>
              <dt className="etiket">{ad}</dt>
              <dd className="sayi kart-sayi mt-2">{(sayi as number).toLocaleString("tr-TR")}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[13px] text-[var(--text-muted)]">{ISTATISTIK_KAYNAK}</p>
      </div>
    </section>
  );
}
