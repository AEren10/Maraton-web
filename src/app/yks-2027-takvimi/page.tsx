import type { Metadata } from "next";
import Link from "next/link";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { BeklemeListesi } from "@/components/BeklemeListesi";
import { GeriSayim } from "@/components/araclar/GeriSayim";
import { JsonLd } from "@/components/JsonLd";
import { TAKVIM, TAKVIM_DURUMU } from "@/data/takvim";
import { kalanGun as hesapla, SINAV_TARIHI, SINAV_YILI } from "@/lib/sinav";
import { kirintiYolu } from "@/lib/schema";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: `YKS ${SINAV_YILI} Takvimi – Başvuru ve Sınav Tarihleri | Maraton`.slice(0, 60),
  description: `YKS ${SINAV_YILI} başvuru, sınav, sonuç ve tercih tarihleri. Takvim açıklanmadan önce geçen yılın dönemleri ve kalan gün sayısı.`,
  alternates: { canonical: "/yks-2027-takvimi" },
};

export default function TakvimSayfasi() {
  const gun = hesapla();
  const tahminiTarih = SINAV_TARIHI.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: `YKS ${SINAV_YILI} takvimi`, yol: "/yks-2027-takvimi" },
        ])}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(28px,5vw,44px)]">YKS {SINAV_YILI} takvimi</h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          Başvurudan tercihe kadar bütün dönemler. Takvim açıklandığında bu sayfa
          güncellenecek.
        </p>
        <p className="etiket mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
          style={{ borderColor: "var(--line)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--warn)]" aria-hidden />
          {TAKVIM_DURUMU}
        </p>

        <div className="mt-9">
          <KisaCevap
            metin={`ÖSYM ${SINAV_YILI} sınav takvimini henüz yayımlamadı. Son yıllarda YKS haziran ayının üçüncü hafta sonuna denk geldi; sitedeki geri sayım ${tahminiTarih} tahminine göre çalışıyor ve şu an ${gun} gün kaldı. Takvim açıklandığında birkaç günlük kayma olabilir, bu çalışma planını değiştirmez. Değişmeyecek olan sıralama: şubatta başvuru, haziranda sınav, temmuzda sonuç ve tercih.`}
          />
        </div>

        <BolumBasligi no="01" ad="Dönemler" />
        <ol className="kart mt-6 px-5 py-2 sm:px-7">
          {TAKVIM.map((s, i) => (
            <li key={s.ad} className="border-b border-[var(--line-soft)] py-5 last:border-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[16px] font-semibold">
                  <span className="sayi mr-3 text-[var(--brand)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.ad}
                </p>
                <p className="etiket">{s.gecenYil}</p>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                {s.aciklama}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
          Sağdaki dönemler 2025 uygulamasından. Kesin tarihler ÖSYM sınav takviminde
          yayımlanır; buradaki bilgiler o takvim yerine geçmez.
        </p>

        <BolumBasligi no="02" ad="Kalan süre" />
        <div className="mt-6 max-w-[640px]">
          <GeriSayim kalanGun={gun} />
        </div>

        <BolumBasligi no="03" ad="Takvim açıklanınca" />
        <div className="mt-2 max-w-[760px]">
          <BeklemeListesi
            kaynak="takvim"
            baslik="Tarihler açıklanınca haber verelim mi?"
            metin="ÖSYM başvuru ve sınav takvimini yayımladığında tek satırlık bir e-posta gönderiyoruz. Başvuruyu kaçırmak sınavı kaçırmak demek."
          />
          <p className="mt-6 text-[15px] text-[var(--text-secondary)]">
            Bu arada{" "}
            <Link href="/hedef-net-rotasi" className="baglanti">
              hedef net rotanı
            </Link>{" "}
            çıkarabilir,{" "}
            <Link href="/bu-tempoyla-kac-net" className="baglanti">
              mevcut tempoyla nereye gittiğini
            </Link>{" "}
            görebilirsin.
          </p>
        </div>
      </section>
    </>
  );
}
