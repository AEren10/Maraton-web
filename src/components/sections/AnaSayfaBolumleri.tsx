import Link from "next/link";
import { Bolum } from "../Bolum";
import { AracIzgarasi } from "../AracIzgarasi";
import { BilgiKartlari } from "../icerik/BilgiKartlari";
import { SSSListesi } from "../icerik/SSSListesi";
import { MaratonBolumu } from "../icerik/MaratonBolumu";
import { BeklemeListesi } from "../BeklemeListesi";
import { SiralamaTablosu } from "../araclar/SiralamaTablosu";
import { SINAV_YILI } from "@/lib/sinav";

export function AnaSayfaBolumleri({ kalanGun }: { kalanGun: number }) {
  return (
    <>
      <Bolum
        id="araclar"
        etiket="Araçlar"
        baslik="On iki araç, hepsi tek sayfada biter."
        alt="Hiçbirinde e-posta istenmiyor, kayıt yok. Girdiğin sayılar tarayıcından çıkmıyor."
      >
        <AracIzgarasi />
      </Bolum>

      <Bolum
        etiket="Rehber"
        baslik="Kırk başlık, beş bölüm"
        alt="Sınavın kuralları, testlerin yapısı, çalışma düzeni, tercih ve sınav günü."
      >
        <BilgiKartlari />
        <p className="mt-8">
          <Link href="/rehber" className="baglanti text-[15px]">
            Rehberin tamamı
          </Link>
        </p>
      </Bolum>

      <Bolum
        etiket="Geçen yıl"
        baslik="Bu netler nereye gitti?"
        alt={`YKS ${SINAV_YILI}'ye ${kalanGun} gün var. Aşağıdaki bantlar 2025 yerleştirme sonuçlarından; bu yılın sonucu farklı olur.`}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <SiralamaTablosu />
          <div className="kart p-6 sm:p-7">
            <h3 className="text-[19px]">Tabloyu nasıl okumalı?</h3>
            <div className="metin mt-4 text-[15px]">
              <p>
                Buradaki sayılar bir söz değil, geçen yılın fotoğrafı. 78 net yapan bir aday
                geçen yıl yaklaşık 110.000. sıradaydı; aynı net bu yıl 90.000 de olabilir
                130.000 de. Sınavın zorluğu ve aday sayısı her yıl bandı kaydırıyor.
              </p>
              <p>
                O yüzden hedefini sıra üzerinden değil net üzerinden kur. Net senin
                kontrolünde, sıra değil.
              </p>
            </div>
            <p className="mt-5">
              <Link href="/bolum-kac-net" className="baglanti text-[15px]">
                Bölüme göre gereken neti ara
              </Link>
            </p>
          </div>
        </div>
      </Bolum>

      <Bolum
        etiket="Sık sorulanlar"
        baslik="Google'a yazdığın haliyle"
        alt="Sınavın kuralları, netin karşılığı ve çalışma düzeni. Cevaplar kısa ama gerektiği kadar uzun."
      >
        <div className="max-w-[760px]">
          <SSSListesi adet={10} />
          <p className="mt-6">
            <Link href="/sss" className="baglanti text-[15px]">
              Kırk sorunun tamamı
            </Link>
          </p>
        </div>
      </Bolum>

      <Bolum etiket="Maraton">
        <div className="max-w-[720px]">
          <MaratonBolumu />
          <BeklemeListesi
            kaynak="ana-sayfa"
            baslik="Sıralama verileri güncellenince haber verelim mi?"
            metin="Bu sitedeki bütün sıra ve net karşılıkları 2025 yerleştirmesine dayanıyor. Yeni yılın sonuçları açıklandığında sayılar değişecek; güncellendiğinde tek bir e-posta gönderiyoruz. Bir de ÖSYM başvuru ve tercih tarihlerini hatırlatıyoruz."
          />
        </div>
      </Bolum>
    </>
  );
}
