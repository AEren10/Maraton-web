export type TakvimSatiri = {
  ad: string;
  gecenYil: string;
  aciklama: string;
};

/**
 * 2027 takvimi ÖSYM tarafından açıklanmadı. Aşağıdaki tarihler 2025
 * uygulamasından; her yıl birkaç gün oynar, kesin tarih ÖSYM sınav
 * takviminde yayımlanır.
 */
export const TAKVIM_DURUMU = "2027 takvimi henüz açıklanmadı";

export const TAKVIM: TakvimSatiri[] = [
  {
    ad: "Başvuru dönemi",
    gecenYil: "Şubat",
    aciklama:
      "Başvurular ÖSYM'nin AİS sistemi üzerinden alınır ve iki hafta civarı açık kalır. Geç başvuru için ek ücretli bir gün verilir; onu da kaçıran o yıl sınava giremez.",
  },
  {
    ad: "Sınav ücreti yatırma",
    gecenYil: "Başvuruyla aynı dönem",
    aciklama:
      "Ücret yatırılmadan başvuru tamamlanmaz. AYT ve YDT'ye girecekler ayrı ücret öder; hangi oturumlara gireceğini başvuruda işaretlersin.",
  },
  {
    ad: "Sınav giriş belgesi",
    gecenYil: "Haziran başı",
    aciklama:
      "Sınavdan yaklaşık iki hafta önce AİS'ten yayımlanır. Sınav yerini gösterir; bir gün önceden yolu kontrol etmek en yaygın tavsiyedir.",
  },
  {
    ad: "TYT oturumu",
    gecenYil: "Haziranın üçüncü cumartesi",
    aciklama: "120 soru, 165 dakika. Herkes için zorunlu oturum.",
  },
  {
    ad: "AYT oturumu",
    gecenYil: "Ertesi pazar sabahı",
    aciklama: "80 soru, 180 dakika. Lisans programı isteyen herkesin girdiği oturum.",
  },
  {
    ad: "YDT oturumu",
    gecenYil: "Aynı pazar öğleden sonra",
    aciklama: "80 soru, 120 dakika. Yalnızca dil bölümü hedefleyenler girer.",
  },
  {
    ad: "Temel soru kitapçıkları",
    gecenYil: "Sınavdan birkaç gün sonra",
    aciklama:
      "ÖSYM soruları ve cevap anahtarını yayımlar. Kendi netini buradan hesaplayabilirsin.",
  },
  {
    ad: "Sonuçların açıklanması",
    gecenYil: "Temmuz ortası",
    aciklama:
      "Puan ve başarı sırası aynı anda açıklanır. Sıralama, tercih kararında puandan daha güvenilir ölçüdür.",
  },
  {
    ad: "Tercih dönemi",
    gecenYil: "Temmuz sonu",
    aciklama:
      "Yaklaşık iki hafta sürer. Kontenjanlar ve önceki yılların taban verileri YÖK Atlas'ta yayımlanır.",
  },
  {
    ad: "Yerleştirme sonuçları",
    gecenYil: "Ağustos",
    aciklama:
      "Yerleşemeyenler ve boş kalan kontenjanlar için ek yerleştirme yapılır; ek yerleştirmede taban sıralar genelde aşağı iner.",
  },
];
