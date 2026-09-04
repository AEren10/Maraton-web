import type { Metadata } from "next";
import { AracIzgarasi } from "@/components/AracIzgarasi";
import { SINAV_YILI } from "@/lib/sinav";

export const metadata: Metadata = {
  title: `YKS Araçları ${SINAV_YILI} – Net, Puan, Sıralama Hesaplayıcıları | Maraton`,
  description:
    "TYT ve AYT net hesaplama, puan tahmini, deneme ortalaması, geri sayım, net–sıralama tablosu ve hedef net rotası. On araç, tek sayfada.",
  alternates: { canonical: "/araclar" },
};

export default function AraclarSayfasi() {
  return (
    <section className="sinir py-14 sm:py-20">
      <h1 className="text-[clamp(28px,5vw,44px)]">Araçlar</h1>
      <div className="metin mt-5 max-w-[640px] text-[17px]">
        <p>
          Hepsi tarayıcıda çalışıyor. Sunucuya gönderilen bir sayı yok, kaydedilen bir şey
          yok. Bir aracın sonucu seni bir sonrakine bağlar.
        </p>
      </div>
      <div className="mt-12">
        <AracIzgarasi />
      </div>
    </section>
  );
}
