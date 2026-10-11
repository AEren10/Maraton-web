import Link from "next/link";
import { Bolum } from "../Bolum";
import { AracIzgarasi } from "../AracIzgarasi";
import { BilgiKartlari } from "../icerik/BilgiKartlari";
import { SSSListesi } from "../icerik/SSSListesi";
import { MaratonBolumu } from "../icerik/MaratonBolumu";
import { BeklemeListesi } from "../BeklemeListesi";
import { SiraKaydirici } from "../araclar/SiraKaydirici";

export function AnaSayfaBolumleri() {
  return (
    <>
      <Bolum
        id="siralama"
        etiket="Sıralama"
        baslik="Bu netler seni kaçıncı sıraya koyar?"
        alt="TYT ve AYT çubuklarını kaydır, sıra anında oynasın. Netler toplanmaz: ham puanın %40'ı TYT'den, %60'ı AYT'den gelir."
      >
        <SiraKaydirici />
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="kart p-6 sm:p-7">
            <h3 className="text-[19px]">Bu sayılar ne kadar kesin?</h3>
            <div className="metin mt-4 text-[15px]">
              <p>
                Bir söz değil, geçen yılın fotoğrafı. Sıralar 2025&apos;in doğrulanmış taban
                puanlarına oturtuldu; sınavın zorluğu ve aday sayısı her yıl bandı kaydırıyor.
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
          <div className="kart p-6 sm:p-7">
            <h3 className="text-[19px]">Neden AYT daha değerli?</h3>
            <div className="metin mt-4 text-[15px]">
              <p>
                AYT&apos;de 80 soru var ama ham puanın %60&apos;ını o belirliyor; TYT&apos;de
                120 soru var, payı %40. Yani AYT&apos;den kazanılan bir net TYT&apos;den
                kazanılandan daha çok sıra kazandırıyor.
              </p>
              <p>
                Çubukları kaydırıp dene: toplamı sabit tutup neti AYT&apos;ye taşıdığında
                sıranın nasıl öne geçtiğini görürsün.
              </p>
            </div>
            <p className="mt-5">
              <Link href="/tercih-robotu" className="baglanti text-[15px]">
                Bu sırayla hangi bölümler açık?
              </Link>
            </p>
          </div>
        </div>
      </Bolum>

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
        <div>
          <MaratonBolumu detayLinki />
          <div className="mt-8 max-w-[720px]">
            <BeklemeListesi
              kaynak="ana-sayfa"
              baslik="Sıralama verileri güncellenince haber verelim mi?"
              metin="Bu sitedeki bütün sıra ve net karşılıkları 2025 yerleştirmesine dayanıyor. Yeni yılın sonuçları açıklandığında sayılar değişecek; güncellendiğinde tek bir e-posta gönderiyoruz. Bir de ÖSYM başvuru ve tercih tarihlerini hatırlatıyoruz."
            />
          </div>
        </div>
      </Bolum>
    </>
  );
}
