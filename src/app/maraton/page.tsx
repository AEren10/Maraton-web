import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MaratonBolumu } from "@/components/icerik/MaratonBolumu";
import { BeklemeListesi } from "@/components/BeklemeListesi";
import { yazilimUygulamasi } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Maraton: YKS Deneme Takibi ve Çalışma Planı",
  description:
    "YKS için günlük çalışma rotası, TYT AYT deneme takibi, net grafiği, yanlış defteri ve ders ders analiz. Maraton ile her gün ne çalışacağını bil.",
  alternates: { canonical: "/maraton" },
  openGraph: {
    url: "https://maratonapp.com/maraton",
    title: "Maraton: YKS Deneme Takibi ve Çalışma Planı",
    description:
      "Günlük çalışma rotası, TYT AYT deneme takibi, net grafiği ve yanlış defteri tek uygulamada.",
  },
};

export default function MaratonSayfasi() {
  return (
    <>
      <JsonLd data={yazilimUygulamasi} />
      <section className="sinir py-14 sm:py-20">
        <h1 className="text-[clamp(28px,5vw,46px)] leading-tight">
          YKS hazırlığını günlere bölen çalışma uygulaması.
        </h1>
        <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-[var(--text-secondary)]">
          Günlük planını kur, TYT ve AYT denemelerini kaydet, yanlışlarını tekrar et;
          hedef netine giden yolu tek yerde gör.
        </p>
        <div className="mt-12">
          <MaratonBolumu />
          <div className="mt-8 max-w-[720px]">
            <BeklemeListesi kaynak="maraton-sayfasi" />
          </div>
        </div>
      </section>
    </>
  );
}
