export type BilgiKategori = "Temel kurallar" | "Sınavın yapısı" | "Net ve çalışma";

export const BILGI_KATEGORILERI: BilgiKategori[] = [
  "Temel kurallar",
  "Sınavın yapısı",
  "Net ve çalışma",
];

export type BilgiKarti = { baslik: string; metin: string; kategori: BilgiKategori };

export const BILGI: BilgiKarti[] = [
  {
    kategori: "Temel kurallar", baslik: "Net nasıl hesaplanır",
    metin:
      "Her dört yanlış bir doğruyu siler: net = doğru − yanlış / 4. 30 doğru 8 yanlış yapan 28 net alır. Boş bıraktığın soru neti düşürmez, sadece yükseltmez.",
  },
  {
    kategori: "Temel kurallar", baslik: "4 yanlış 1 doğruyu götürür ne demek",
    metin:
      "Rastgele işaretlediğin 5 şıklı bir soruda beşte bir ihtimalle tutturursun. 20 soruyu rastgele işaretlersen ortalama 4 doğru, 16 yanlış çıkar: net 0. Ceza tam da bu ihtimali sıfırlamak için var.",
  },
  {
    kategori: "Sınavın yapısı", baslik: "TYT ders ve soru dağılımı",
    metin:
      "TYT 120 soru, 165 dakika. Türkçe 40, Temel Matematik 40, Sosyal Bilimler 20, Fen Bilimleri 20. Soru başına ortalama 82 saniye düşüyor; Türkçe paragrafta bu süre kolayca 2 dakikaya çıkar.",
  },
  {
    kategori: "Sınavın yapısı", baslik: "AYT alan bazlı dağılım",
    metin:
      "AYT 80 soru, 180 dakika. Türk Dili ve Edebiyatı–Sosyal Bilimler-1 40, Matematik 40, Fen Bilimleri 40, Sosyal Bilimler-2 40 sorudur; sen alanına göre 80 soruluk kısmı çözersin. Sayısalcı Matematik 40 + Fen 40 yapar.",
  },
  {
    kategori: "Temel kurallar", baslik: "OBP nedir, kaç puan ekler",
    metin:
      "Diploma notun 5 ile çarpılır: 80 diploma notu 400 OBP demek. OBP'nin 0,12'si puanına eklenir, yani 400 OBP 48 puan getirir. 60 ile 95 diploma notu arasındaki fark yaklaşık 21 puan.",
  },
  {
    kategori: "Temel kurallar", baslik: "Baraj puanı ve boş bırakma",
    metin:
      "Bir bölüm tercihi yapabilmek için TYT'de 150 puan gerekir; 4 yıllık bölümler için de aynı eşik geçerlidir. 150 puana yaklaşık 15 net yeter. Emin olmadığın soruyu boş bırakmak, iki şıkkı elediysen mantıksızdır.",
  },
  {
    kategori: "Sınavın yapısı", baslik: "TYT ve AYT ağırlıkları",
    metin:
      "Yerleştirme puanının %40'ı TYT'den, %60'ı AYT'den gelir. Yani AYT'de 1 net, TYT'de 1 netten daha değerlidir. Ama AYT'ye girmek için önce TYT barajını geçmen gerekir; sıralama ikisinin toplamıdır.",
  },
  {
    kategori: "Net ve çalışma", baslik: "Netler neden dalgalanır",
    metin:
      "Aynı hafta iki deneme çözen bir öğrencinin sonucu 6-8 net oynayabilir. Sebebi genelde bilgi değil: soru dağılımı, uyku ve ilk 20 dakikadaki panik. Tek denemeye bakma, son üç denemenin ortalamasına bak.",
  },
  {
    kategori: "Net ve çalışma", baslik: "Hangi ders en hızlı yükselir",
    metin:
      "Sosyal ve Fen'de 20 soruluk havuz dar, konular ezberlenebilir; 4-5 net artış 6 haftada mümkündür. Türkçe paragrafta aynı artış 4-5 ay ister. Bu yüzden düşük olduğun ders değil, en ucuz yükselen ders öncelik olur.",
  },
  {
    kategori: "Net ve çalışma", baslik: "Deneme sıklığı",
    metin:
      "Haftada 1 TYT denemesi çoğu öğrenci için yeterlidir; sınava 2 ay kala 2'ye çıkar. Denemenin faydası çözmekte değil, ertesi gün yanlışlarını konu konu ayırmakta. Analiz etmediğin deneme 165 dakikalık kayıptır.",
  },
  {
    kategori: "Net ve çalışma", baslik: "Konu bitirmek mi soru çözmek mi",
    metin:
      "Konuyu görmeden çözülen soru zaman kaybı, sorusuz bitirilen konu iki haftada uçuyor. Pratikte oran şu: bir konu anlatımından sonra en az 40 soru, üç gün sonra 20 soru daha. Konu listesini bitirme hızın değil, geri dönüş sayın belirleyici.",
  },
  {
    kategori: "Sınavın yapısı", baslik: "Sınav günü ne değişir",
    metin:
      "Deneme ortalaman 70 ise sınavda 62-72 arası bir sonuç normaldir; ortalama 5-8 net düşüş yaygındır. Sebep süre yönetimi ve ilk yarım saat. Denemelerini sınav saatinde ve tek oturumda çöz, farkı en çok bu kapatır.",
  },
];
export const bilgiKategorisi = (k: BilgiKategori) => BILGI.filter((b) => b.kategori === k);
