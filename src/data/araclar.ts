export type Kategori = "Net ve puan" | "Hedef ve tempo" | "Sıralama ve tercih";

export const KATEGORILER: Kategori[] = ["Net ve puan", "Hedef ve tempo", "Sıralama ve tercih"];

export type Arac = {
  slug: string;
  ad: string;
  h1: string;
  title: string;
  description: string;
  ozet?: string;
  renk?: string;
  kategori: Kategori;
  veri?: string[];
  populer?: boolean;
  tur: "net" | "puan" | "rota" | "tempo" | "gunsayaci" | "ortalama" | "siralama" | "bolum" | "obp" | "tercih";
  varsayilan?: "tyt" | "ayt" | "ydt";
};

export const ARACLAR: Arac[] = [
  {
    slug: "tyt-net-hesaplama", veri: ["net", "ortalama"], kategori: "Net ve puan", populer: true, renk: "var(--turkce)", ozet: "Doğru ve yanlışını gir, dört dersin neti ayrı ayrı çıksın.", ad: "TYT net hesaplama", h1: "Netini hesapla",
    title: "TYT Net Hesaplama 2027 – Ders Bazlı | Maraton",
    description:
      "TYT netini ders ders hesapla: doğru ve yanlışını gir, net = doğru − yanlış/4. Sonra bu netten hedefine giden rotayı gör.",
    tur: "net", varsayilan: "tyt",
  },
  {
    slug: "ayt-net-hesaplama", veri: ["net", "ortalama"], kategori: "Net ve puan", populer: true, renk: "var(--fizik)", ozet: "Alanını seç, yalnızca çözdüğün 80 sorunun neti çıksın.", ad: "AYT net hesaplama", h1: "AYT netini hesapla",
    title: "AYT Net Hesaplama 2027 – Ders Bazlı | Maraton",
    description:
      "Alanını seç, AYT netini ders ders hesapla. Sayısal, Eşit Ağırlık ve Sözel için ayrı ders listesi; 80 soruluk gerçek dağılım.",
    tur: "net", varsayilan: "ayt",
  },
  {
    slug: "ydt-net-hesaplama", veri: ["net", "ortalama"], kategori: "Net ve puan", renk: "var(--kimya)", ozet: "80 soruluk yabancı dil testinin neti.", ad: "YDT net hesaplama", h1: "YDT netini hesapla",
    title: "YDT Net Hesaplama 2027 – Yabancı Dil | Maraton",
    description: "YDT netini hesapla. 80 soru, 120 dakika; her dört yanlış bir doğruyu götürür.",
    tur: "net", varsayilan: "ydt",
  },
  {
    slug: "tyt-puan-hesaplama", veri: ["puan", "obp", "baraj"], kategori: "Net ve puan", renk: "var(--matematik)", ozet: "Netlerden ve diploma notundan yaklaşık puan, OBP katkısı dahil.", ad: "TYT puan hesaplama", h1: "TYT puanını tahmin et",
    title: "TYT Puan Hesaplama 2027 – OBP Dahil | Maraton",
    description:
      "Netlerinden ve diploma notundan yaklaşık TYT puanını gör. OBP katkısı ve 150 barajı dahil.",
    tur: "puan",
  },
  {
    slug: "obp-hesaplama", veri: ["obp"], kategori: "Net ve puan", ozet: "Diploma notunu gir, puanına kaç puan eklendiğini gör.",
    renk: "var(--biyoloji)", ad: "OBP hesaplama", h1: "OBP'ni hesapla",
    title: "OBP Hesaplama – Diploma Notu Kaç Puan? | Maraton",
    description:
      "Diploma notunu gir, OBP'ni ve yerleştirme puanına eklenecek puanı gör. Diploma notu × 5 × 0,12.",
    tur: "obp",
  },
  {
    slug: "hedef-net-rotasi", veri: ["net"], kategori: "Hedef ve tempo", populer: true, renk: "var(--brand)", ozet: "Hedefini gir, o farkın hangi dersten geleceğini gör.", ad: "Hedef net rotası", h1: "Kaç net istiyorsun?",
    title: "Hedef Net Rotası 2027 – Kaç Nete Nasıl? | Maraton",
    description:
      "Hedef netini gir, mevcut netlerini yaz; hangi dersten kaç net kazanman gerektiğini ders ders gör.",
    tur: "rota",
  },
  {
    slug: "bu-tempoyla-kac-net", veri: ["trend"], kategori: "Hedef ve tempo", renk: "var(--fen)", ozet: "Son denemelerinin eğimi sınav gününe nereye taşıyor?", ad: "Bu tempoyla kaç net", h1: "Bu tempoyla kaç net?",
    title: "Bu Tempoyla Kaç Net Yaparım? Deneme Trendi | Maraton",
    description:
      "Son üç deneme netini gir, mevcut trendinin sınav gününe nereye taşıdığını üç senaryoyla gör.",
    tur: "tempo",
  },
  {
    slug: "yks-kac-gun-kaldi", veri: ["trend"], kategori: "Hedef ve tempo", renk: "var(--tarih)", ozet: "Kalan gün, ayda ve haftada gereken net.", ad: "YKS kaç gün kaldı", h1: "YKS'ye kaç gün kaldı?",
    title: "YKS 2027'ye Kaç Gün Kaldı? Geri Sayım | Maraton",
    description:
      "YKS 2027'ye kalan gün sayısı ve hedefine ulaşmak için ayda, haftada kaç net kazanman gerektiği.",
    tur: "gunsayaci",
  },
  {
    slug: "deneme-ortalamasi", veri: ["net"], kategori: "Hedef ve tempo", renk: "var(--cografya)", ozet: "Denemelerini kaydet, ortalama ve trend kendiliğinden çıksın.", ad: "Deneme ortalaması", h1: "Deneme ortalaman kaç?",
    title: "Deneme Ortalaması Hesaplama 2027 | Maraton",
    description:
      "Deneme netlerini gir, ortalamanı ve dalgalanma aralığını gör. Tek deneme değil, ortalama konuşur.",
    tur: "ortalama",
  },
  {
    slug: "tercih-robotu", veri: ["siralama", "bolum"], kategori: "Sıralama ve tercih", populer: true, ozet: "TYT ve AYT netini gir, hangi bölümlerin açık olduğunu gör.",
    renk: "var(--brand-light)", ad: "Tercih robotu", h1: "Bu netle nereye girilir?",
    title: "Tercih Robotu 2027 – Bu Netle Nereye Girilir? | Maraton",
    description:
      "TYT ve AYT netini gir; 2025 yerleştirme sıralarına göre hangi bölümlerin açık olduğunu ve hangilerine az kaldığını gör.",
    tur: "tercih",
  },
  {
    slug: "net-siralama-tablosu", veri: ["siralama"], kategori: "Sıralama ve tercih", renk: "var(--felsefe)", ozet: "Geçen yıl hangi net hangi sıra bandına denk geldi?", ad: "Net – sıralama tablosu", h1: "Geçen yıl bu netler nereye gitti?",
    title: "Net Sıralama Tablosu – Kaç Net Kaç Sıra? | Maraton",
    description:
      "Geçen yılın yerleştirme sonuçlarına göre net ve sıralama bantları. 55 net, 70 net, 85 net nereye denk geldi?",
    tur: "siralama",
  },
  {
    slug: "bolum-kac-net", veri: ["bolum", "siralama"], kategori: "Sıralama ve tercih", renk: "var(--din)", ozet: "Bölüm adını yaz, geçen yılki net eşiğini ve farkını gör.", ad: "Bölüm kaç net ister", h1: "Bu bölüm kaç net istiyordu?",
    title: "Bölüm İçin Kaç Net Gerekir? 2025 Verisi | Maraton",
    description:
      "Tıp, hukuk, bilgisayar mühendisliği ve daha fazlası için geçen yıl gereken yaklaşık net. Farkını gör, rotanı çıkar.",
    tur: "bolum",
  },
];

export const POPULER = ARACLAR.filter((a) => a.populer);
export const kategorininAraclari = (k: Kategori) =>
  ARACLAR.filter((a) => a.kategori === k && !a.populer);

export const aracBul = (slug: string) => ARACLAR.find((a) => a.slug === slug);
