import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MaratonBolumu } from "@/components/icerik/MaratonBolumu";
import { BeklemeListesi } from "@/components/BeklemeListesi";
import { yazilimUygulamasi } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Maraton – Her Gün Yeni Rota | YKS Çalışma Uygulaması",
  description:
    "Bu site sana bir gün veriyor. Maraton her günü veriyor: bugünün planı, deneme sonrası güncellenen rota, konu borcu ve geri sayım.",
  alternates: { canonical: "/maraton" },
};

export default function MaratonSayfasi() {
  return (
    <>
      <JsonLd data={yazilimUygulamasi} />
      <section className="sinir py-14 sm:py-20">
        <h1 className="text-[clamp(28px,5vw,46px)] leading-tight">
          Bu site sana bir gün veriyor.
          <br />
          <span className="text-[var(--text-muted)]">Maraton her günü veriyor.</span>
        </h1>
        <div className="mt-12 max-w-[720px]">
          <MaratonBolumu />
          <BeklemeListesi kaynak="maraton-sayfasi" />
        </div>
      </section>
    </>
  );
}
