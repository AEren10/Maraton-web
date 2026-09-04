export type BilgiKategori =
  | "Temel kurallar"
  | "Sınavın yapısı"
  | "Net ve çalışma"
  | "Tercih ve yerleştirme"
  | "Sınav dönemi";

export const BILGI_KATEGORILERI: BilgiKategori[] = [
  "Temel kurallar",
  "Sınavın yapısı",
  "Net ve çalışma",
  "Tercih ve yerleştirme",
  "Sınav dönemi",
];

export type BilgiKarti = { baslik: string; metin: string; kategori: BilgiKategori };

export const BILGI: BilgiKarti[] = [
  /* ---------- Temel kurallar ---------- */
  {
    kategori: "Temel kurallar",
    baslik: "Net nasıl hesaplanır",
    metin:
      "Her dört yanlış bir doğruyu siler: net = doğru − yanlış / 4. 30 doğru 8 yanlış yapan 28 net alır. Boş bıraktığın soru neti düşürmez, sadece yükseltmez. Ondalık kısım korunur, yuvarlanmaz.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "4 yanlış 1 doğruyu götürür ne demek",
    metin:
      "Rastgele işaretlediğin 5 şıklı bir soruda beşte bir ihtimalle tutturursun. 20 soruyu rastgele işaretlersen ortalama 4 doğru, 16 yanlış çıkar: net 0. Ceza tam da bu ihtimali sıfırlamak için var.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "Ne zaman işaretle, ne zaman boş bırak",
    metin:
      "Hiçbir şıkkı eleyemediysen boş bırak. İki şıkkı elediysen işaretle: kalan üçte tutturma ihtimalin üçte bir, bu dörtte bir cezayı yener. Tek şık elediysen sınırdasın; sınav sonuna doğru zaman kalmadıysa işaretlemek makul.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "OBP nedir, kaç puan ekler",
    metin:
      "Diploma notun 5 ile çarpılır: 80 diploma notu 400 OBP demek. OBP'nin 0,12'si puanına eklenir, yani 400 OBP 48 puan getirir. Kestirme yol: diploma notunu 0,6 ile çarp. 60 ile 100 arasındaki fark 24 puan.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "OBP neden yarıya iner",
    metin:
      "Geçen yıl bir yükseköğretim programına yerleşen adaylarda OBP katsayısı 0,12 yerine 0,06 uygulanır. 450 OBP'de bu 54 puan yerine 27 puan demek. Kayıt sildirmek bu durumu değiştirmiyor; ikinci yıl kararı verirken hesaba kat.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "Baraj puanı ne işe yarar",
    metin:
      "Tercih yapabilmek için TYT'de 150 puan gerekir; taban puan 100'dür ve yaklaşık 15 net bu eşiği geçirir. Barajı geçmek yerleşmek anlamına gelmez, sadece tercih listesi oluşturma hakkı verir.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "TYT ve AYT ağırlıkları",
    metin:
      "Yerleştirme puanının %40'ı TYT'den, %60'ı AYT'den gelir. Yani AYT'de kazanılan 1 net daha değerlidir. Ama TYT barajını geçemezsen AYT netlerin hiç sayılmaz; sıralama ikisinin toplamıdır.",
  },
  {
    kategori: "Temel kurallar",
    baslik: "Puan mı sıralama mı",
    metin:
      "Puanlar her yıl sınavın zorluğuna göre kayar; 480 puan bir yıl 30.000. sıra, ertesi yıl 45.000. sıra olabilir. Sıralama adaylar arasındaki yerini gösterir ve karşılaştırma için tek sağlam ölçüdür. Bölüm hedefini sıra üzerinden kur.",
  },

  /* ---------- Sınavın yapısı ---------- */
  {
    kategori: "Sınavın yapısı",
    baslik: "TYT ders ve soru dağılımı",
    metin:
      "TYT 120 soru, 165 dakika. Türkçe 40, Temel Matematik 40, Sosyal Bilimler 20, Fen Bilimleri 20. Soru başına ortalama 82 saniye düşüyor; Türkçe paragrafta bu süre kolayca 2 dakikaya çıkar.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "AYT alan bazlı dağılım",
    metin:
      "AYT 80 soru, 180 dakika. Matematik 40, Fen Bilimleri 40 (Fizik 14, Kimya 13, Biyoloji 13), Edebiyat–Sosyal-1 40, Sosyal-2 40 sorudur; sen alanına göre 80 soruluk kısmı çözersin. Sayısalcı Matematik 40 + Fen 40 yapar.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "YDT nasıl bir sınav",
    metin:
      "YDT tek testtir: 80 soru, 120 dakika. 2025'te İngilizce testine 78.468 aday girdi ve ortalama 34,74 netti. DİL puanı hesaplanırken TYT netlerin de işin içine girer, yani sadece YDT çalışmak yetmez.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "İki gün, üç oturum",
    metin:
      "Cumartesi TYT, pazar sabahı AYT, pazar öğleden sonra YDT. TYT herkes için zorunlu; AYT lisans programı isteyen herkesin, YDT yalnızca dil bölümü hedefleyenlerin girdiği oturum. Önlisans programlarına yerleştirme sadece TYT ile yapılır.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "Türkiye ortalamaları ne diyor",
    metin:
      "2025'te TYT ortalamaları: Türkçe 21,71 · Sosyal 9,72 · Matematik 6,65 · Fen 4,61, toplam 42,69 net. Yani 43 net yapan tam ortada. Matematik ve Fen'de küçük bir artış bile sıralamada büyük oynama yaratıyor.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "Matematik ortalaması neden düşük",
    metin:
      "TYT matematikte 40 soruda ortalama 6,65, AYT matematikte 6,86 net. Sebep basit: matematik ezberle çıkmıyor ve çoğu aday son altı ayda başlıyor. Herkesin bıraktığı yerde 10 net kazanmak, kalabalık derslerde 10 net kazanmaktan daha çok sıra oynatır.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "Sayısal mı eşit ağırlık mı",
    metin:
      "Karar dersi sevmene göre değil hedef bölümüne göre verilir. Tıp, mühendislik, eczacılık sayısal; hukuk, psikoloji, iktisat eşit ağırlık ister. İkisi arasında kaldıysan ilk üç ay matematik çalış, seçimi ertele: matematik ikisinde de ortak.",
  },
  {
    kategori: "Sınavın yapısı",
    baslik: "Alan dışı test çözmek",
    metin:
      "Çözebilirsin ama puan türüne katkısı olmaz. Sosyal Bilimler-2 yalnızca sözel ve eşit ağırlık puanına girer; sayısalcı için o 40 soru zaman kaybıdır. Hangi testin hangi puana girdiğini bilmek, boşa çalışmayı engeller.",
  },

  /* ---------- Net ve çalışma ---------- */
  {
    kategori: "Net ve çalışma",
    baslik: "Netler neden dalgalanır",
    metin:
      "Aynı hafta iki deneme çözen bir öğrencinin sonucu 6-8 net oynayabilir. Sebep genelde bilgi değil: soru dağılımı, uyku ve ilk 20 dakikadaki panik. Tek denemeye bakma, son üç denemenin ortalamasına bak.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Hangi ders en hızlı yükselir",
    metin:
      "Sosyal ve Fen'de 20 soruluk havuz dar, konular ezberlenebilir; 4-5 net artış 6 haftada mümkündür. Türkçe paragrafta aynı artış 4-5 ay ister. Öncelik düşük olduğun ders değil, en ucuz yükselen ders olmalı.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Deneme sıklığı",
    metin:
      "Haftada 1 TYT denemesi çoğu öğrenci için yeterlidir; sınava 2 ay kala 2'ye çıkar. Bir yılda 40-50 deneme üst sınır. Denemenin faydası çözmekte değil, ertesi gün yanlışlarını konu konu ayırmakta.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Deneme analizi nasıl yapılır",
    metin:
      "Denemeyi çözdükten sonra üç sütun aç: bilmiyordum, dikkatsizlik, süre yetmedi. Her yanlışı bir sütuna yaz. Bilmiyordum sütunundaki konu üçüncü kez çıkıyorsa o konuya geri dön; dikkatsizlik sütunu şişiyorsa hız değil dikkat sorunun var.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Konu bitirmek mi soru çözmek mi",
    metin:
      "Konuyu görmeden çözülen soru zaman kaybı, sorusuz bitirilen konu iki haftada uçuyor. Pratik oran: bir konu anlatımından sonra en az 40 soru, üç gün sonra 20 soru daha. Belirleyici olan konu listesini bitirme hızın değil, geri dönüş sayın.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Günde kaç saat çalışmalı",
    metin:
      "Saat sayısı net getirmiyor. 6 saat doğru konu, 10 saat rastgele soruyu döver. Okula devam eden biri için günde 4-5 verimli saat, hafta sonu 7-8 saat gerçekçi bir üst sınır. Günde 12 saat yazıp iki haftada bırakan çok.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Paragraf neti nasıl artar",
    metin:
      "Günde 5 paragraf, kesintisiz 3 ay. Artış yavaş: 3 ayda 3-5 net normal. Hız denemesi yapma; önce doğruluğu 8/10'un üstüne çıkar, süre kendiliğinden düşer. Türkçe 2025'te %50 eşiğini geçen tek testti, yani rekabet burada sert.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Yanlış defteri nasıl tutulur",
    metin:
      "Soruyu değil, yanlışın sebebini yaz. \"Üslü sayılarda negatif üs kuralını karıştırdım\" işe yarar, sorunun fotoğrafı yaramaz. Haftada bir defteri baştan oku; aynı sebep üç kez tekrar ediyorsa o konu bilgi eksiği değil alışkanlık sorunudur.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Netlerim düşüyor, ne yapmalı",
    metin:
      "Son üç denemeyi yan yana koy ve hangi derste düştüğüne bak. Düşüş genelde tek derste olur ve yeni konuya geçilmesiyle çakışır. Toplam nete bakıp panik yapmak, düşen dersi görmeni engeller.",
  },
  {
    kategori: "Net ve çalışma",
    baslik: "Hedef net belirlemek işe yarar mı",
    metin:
      "Sayı tek başına yaramaz, dağıtımı yarar. \"80 net yapacağım\" bir dilek; \"matematiği 12'den 19'a, feni 7'den 11'e çıkaracağım\" bir plan. Hedefi dörde bölmediğin sürece yarın hangi soruyu çözeceğini bilemezsin.",
  },

  /* ---------- Tercih ve yerleştirme ---------- */
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Tercih robotu nasıl kullanılır",
    metin:
      "Tercih robotları netini ya da puanını alıp geçmiş yılın sıra bantlarıyla eşleştirir. Sınav öncesi \"nereye doğru gidiyorum\" sorusunu cevaplamak için iyidir; kesin tercih için değil. Temmuzda gerçek tercih, program bazlı güncel kontenjan ve taban verisiyle yapılır.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Taban puan mı başarı sırası mı",
    metin:
      "Bölümleri karşılaştırırken başarı sırasına bak. Taban puan sınav zorluğuna göre yıldan yıla 20-30 puan oynayabilir; sıra ise nispeten sabittir. \"Geçen yıl 480 puandı\" bilgisi tek başına bir şey ifade etmez, \"geçen yıl 45.000. sıradaydı\" eder.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Devlet ve vakıf farkı",
    metin:
      "Vakıf üniversitelerinin burslu kontenjanları genelde devletin en üst programlarının da üstünde kapanır; ücretli kontenjanları ise çok altında. İkisini aynı listede karşılaştırmak yanıltır. Bir bölümün \"kaç net\" cevabı hangi kontenjan türüne baktığına göre değişir.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Bir bölüm için tek bir net yoktur",
    metin:
      "2025'te tıp programlarının en üstü 1.169. sırada kapandı, son yerleşen 39.903. sıradaydı. Aynı bölüm için 108 net de doğru cevap, 93 net de. Hedefini kurarken hangi üniversiteyi istediğini de karara katman gerekir.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "İlk 100.000 ne demek",
    metin:
      "2025'te 2.351.641 aday sınava girdi. İlk 100.000'e girmek her 23 adaydan biri olmak demek. Popüler mühendislik ve sağlık programlarının çoğu bu bandın içinde kapanıyor; eşit ağırlıkta bant biraz daha geniş.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Ek yerleştirme nedir",
    metin:
      "İlk yerleştirmede dolmayan kontenjanlar için yapılan ikinci turdur. Boş kalan programlar genelde taban sıralarının epey altına iner. Ama popüler bölümlerde ek yerleştirme beklemek riskli: o kontenjanlar çoğunlukla ilk turda dolar.",
  },
  {
    kategori: "Tercih ve yerleştirme",
    baslik: "Kaç netle üniversite kazanılır",
    metin:
      "4 yıllık bir bölüm için pratikte 25-30 net alt sınır. Şehir merkezinde bir devlet üniversitesi bölümü için 55 net civarı 450.000. sıra bandına denk geliyordu. Popüler bölümler 80 netin üstünden başlıyor.",
  },

  /* ---------- Sınav dönemi ---------- */
  {
    kategori: "Sınav dönemi",
    baslik: "YKS ne zaman yapılır",
    metin:
      "Kesin tarih ÖSYM sınav takviminde açıklanır; son yıllarda YKS haziran ayının üçüncü hafta sonuna denk geldi. Takvim genelde bir yıl önceden yayımlanır. Birkaç günlük kayma çalışma planını değiştirmez, ama başvuru tarihini kaçırmak sınavı kaçırmak demektir.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "Son 3 ayda ne yapmalı",
    metin:
      "Yeni konu açmayı bırak, eldeki konularda soru hacmini artır. Haftada 2 deneme ve her denemenin ertesi günü konu bazlı yanlış analizi. 90 günde beklenebilecek gerçekçi artış 6-10 net; bunun üstünü vaat eden kimseye inanma.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "Son 10 günde yeni konu",
    metin:
      "Açma. Son günlerde öğrenilen konu sınav günü hatırlanmayacak kadar taze kalır ve bildiklerinin yerini alır. O süreyi yanlış defterine ve daha önce çözdüğün denemelerin tekrarına ayır.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "Sınav günü ne değişir",
    metin:
      "Deneme ortalaman 70 ise sınavda 62-72 arası bir sonuç normaldir; 5-8 net düşüş yaygın. Sebep süre yönetimi ve ilk yarım saat. Denemelerini sınav saatinde, tek oturumda ve telefonsuz çöz; farkı en çok bu kapatır.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "Strateji sınav günü değiştirilmez",
    metin:
      "Yıl boyunca hangi sırayla çözdüysen aynı sırayla çöz. Sınav günü denenmemiş bir yöntem — önce matematiğe geçmek, süreyi farklı bölmek — en çok net kaybettiren hatalardan biri. Yeni stratejinin yeri denemedir.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "Takılınca ne yapmalı",
    metin:
      "Geç ve işaretle, sonra dön. YKS her soruyu çözme sınavı değil; 120 soruda tek bir soruya 4 dakika vermek, çözebileceğin üç soruyu kaybettirir. Kendine kural koy: 90 saniyede yol bulamadıysan soruyu bırak.",
  },
  {
    kategori: "Sınav dönemi",
    baslik: "TYT kötü geçerse",
    metin:
      "Puan olarak iki oturum ayrı hesaplanır; TYT'nin kötü geçmesi AYT netini düşürmez. Ama cumartesi akşamı yapılan cevap kontrolü pazar sabahını mahvediyor. En pratik tavsiye: cumartesi çıkışta cevap anahtarına bakma.",
  },
];

export const bilgiKategorisi = (k: BilgiKategori) => BILGI.filter((b) => b.kategori === k);
