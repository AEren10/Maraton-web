export type Guven = "dogrulanmis" | "yaklasik" | "formul";

export type VeriKaydi = {
  anahtar: string;
  ad: string;
  guven: Guven;
  yil?: number;
  aciklama: string;
  kaynak?: string;
  url?: string;
};

export const GUVEN_ETIKET: Record<Guven, { ad: string; renk: string }> = {
  dogrulanmis: { ad: "Doğrulanmış veri", renk: "var(--up)" },
  formul: { ad: "Resmî formül", renk: "var(--turkce)" },
  yaklasik: { ad: "Yaklaşık değer", renk: "var(--warn)" },
};

export const VERILER: VeriKaydi[] = [
  {
    anahtar: "net",
    ad: "Net formülü",
    guven: "formul",
    aciklama:
      "net = doğru − yanlış / 4. ÖSYM'nin bütün testlerde uyguladığı kural; hesaplamada yuvarlama yapılmaz.",
    kaynak: "ÖSYM YKS kılavuzu",
  },
  {
    anahtar: "ortalama",
    ad: "2025 net ortalamaları",
    guven: "dogrulanmis",
    yil: 2025,
    aciklama:
      "TYT Türkçe 21,71 · Sosyal 9,72 · Matematik 6,65 · Fen 4,61. AYT ve YDT ortalamaları da aynı açıklamadan. 2.351.641 adayın sonucu.",
    kaynak: "ÖSYM 2025-YKS sayısal bilgileri",
    url: "https://www.osym.gov.tr/2025yks-yerlestirme-sonuclarina-iliskin-sayisal-bilgiler",
  },
  {
    anahtar: "obp",
    ad: "OBP katsayıları",
    guven: "formul",
    aciklama:
      "OBP = diploma notu × 5 (250–500 aralığı). Yerleştirme puanına OBP × 0,12 eklenir; geçen yıl bir programa yerleşenlerde 0,06 uygulanır.",
    kaynak: "ÖSYM YKS kılavuzu",
  },
  {
    anahtar: "baraj",
    ad: "TYT barajı",
    guven: "formul",
    aciklama: "Tercih yapabilmek için TYT'de 150 puan gerekir. Taban puan 100'dür.",
    kaynak: "ÖSYM YKS kılavuzu",
  },
  {
    anahtar: "puan",
    ad: "Puan tahmini",
    guven: "yaklasik",
    aciklama:
      "ÖSYM puanı standart puanlar üzerinden hesaplanır ve sınav günü tüm adayların dağılımına bağlıdır; sınavdan önce kesin hesaplanamaz. Buradaki sayı net başına ortalama katkıya dayanan bir tahmindir: 0 net 100 puana, 120 net 500 puana denk gelir.",
  },
  {
    anahtar: "siralama",
    ad: "Net – sıralama bantları",
    guven: "yaklasik",
    yil: 2025,
    aciklama:
      "2025 yerleştirme sonuçlarından çıkarılmış yaklaşık bantlar. ÖSYM net–sıralama tablosu yayımlamıyor; bu değerler tahmindir ve sınavın zorluğuna göre her yıl kayar.",
  },
  {
    anahtar: "bolum",
    ad: "Bölüm sıra bantları",
    guven: "yaklasik",
    yil: 2025,
    aciklama:
      "Taban puanı yazan satırlar 2025 yerleştirme verisinden doğrulandı (Tıp/Hacettepe 547, Bilgisayar Mühendisliği/ODTÜ 545, Hukuk/Ankara 495). Diğer bölümlerin sıra bandı o yılın genel dağılımından çıkarılmış yaklaşık değerdir. Kesin tercih için YÖK Atlas'taki program bazlı veriye bak.",
    kaynak: "ÖSYM / YÖK Atlas 2025 yerleştirme sonuçları",
  },
  {
    anahtar: "trend",
    ad: "Tempo projeksiyonu",
    guven: "yaklasik",
    aciklama:
      "Denemelerinin eğimi kalan süreye taşınır, uzun ufuklarda sönümlenir ve 112 net civarında yumuşak bir tavana yaklaşır. Ölçüm değil, senin verdiğin sayıların devamı.",
  },
];

export const veriBul = (anahtar: string) => VERILER.find((v) => v.anahtar === anahtar);
