import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SSSListesi } from "@/components/icerik/SSSListesi";
import { SSS } from "@/data/sss";

export const metadata: Metadata = {
  title: "YKS Sık Sorulan Sorular – 40 Soru 40 Cevap | Maraton",
  description:
    "TYT'de ortalama kaç net yapılıyor, 70 net iyi mi, OBP kaç puan getirir, kaç netle tıp kazanılır, barajı geçemezsem ne olur? Kırk sorunun cevabı.",
  alternates: { canonical: "/sss" },
};

export default function SSSSayfasi() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SSS.map((s) => ({
            "@type": "Question",
            name: s.soru,
            acceptedAnswer: { "@type": "Answer", text: s.cevap },
          })),
        }}
      />
      <section className="sinir py-14 sm:py-20">
        <h1 className="text-[clamp(28px,5vw,46px)] leading-tight">
          Sık sorulan sorular
        </h1>
        <div className="metin mt-5 max-w-[640px] text-[17px]">
          <p>
            Öğrencilerin Google&apos;a yazdığı {SSS.length} soru ve cevapları. Sınavın
            kuralları, netin karşılığı, çalışma düzeni ve sınav günü.
          </p>
          <p>
            Cevaplar mümkün olduğunca sayıya dayanıyor; kural gerektiren yerlerde ÖSYM
            kılavuzuna, karşılaştırma gerektiren yerlerde 2025 sonuçlarına bakıyoruz.
          </p>
        </div>
        <div className="mt-10 max-w-[760px]">
          <SSSListesi />
        </div>
      </section>
    </>
  );
}
