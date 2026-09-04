export type Satir = [string, string];
export type MiniKart = { baslik: string; metin: string };

export type AracIcerik = {
  rozet?: string;
  kisaCevap: string;
  tekBakista: Satir[];
  rehber: MiniKart[];
  ilgili: string[];
};

const NET_KURALI: Satir = ["Net", "doğru − yanlış ÷ 4"];

export const ARAC_ICERIK: Record<string, AracIcerik> = {
  "tyt-net-hesaplama": {
    rozet: "2025 Türkiye ortalamalarıyla karşılaştırmalı",
    kisaCevap:
      "TYT neti her ders için ayrı hesaplanır: doğru − yanlış ÷ 4. Dört dersin neti toplanınca TYT netin çıkar. 120 sorunun tamamı doğru yapılırsa 120 net olur; 2025'te Türkiye ortalaması 42,69 netti.",
    tekBakista: [
      NET_KURALI,
      ["Soru sayısı", "120 soru · 165 dakika"],
      ["Ders dağılımı", "Türkçe 40 · Matematik 40 · Sosyal 20 · Fen 20"],
      ["2025 ortalaması", "42,69 net"],
      ["Baraj", "150 puan ≈ 15 net"],
      ["Ondalık", "Korunur, yuvarlanmaz"],
    ],
    rehber: [
      {
        baslik: "Boş bırakmak net düşürür mü?",
        metin:
          "Hayır. Boş soru ne artırır ne azaltır. Ama iki şıkkı elediysen işaretlemek matematiksel olarak kârlı: üçte bir tutturma ihtimali dörtte bir ceza katsayısını yener.",
      },
      {
        baslik: "Ortalamanın neresindesin?",
        metin:
          "2025'te TYT Matematik ortalaması 40 soruda 6,65, Fen 20 soruda 4,61'di. Bu iki testte 15 net yapmak seni ortalamanın çok üstüne taşır; en ucuz sıçrama burada.",
      },
      {
        baslik: "Net mi puan mı?",
        metin:
          "Net senin ham performansın, puan tüm adayların dağılımına göre hesaplanır. Net kontrolünde, puan değil; o yüzden hedefini net üzerinden kur.",
      },
    ],
    ilgili: ["tyt-puan-hesaplama", "hedef-net-rotasi", "net-siralama-tablosu"],
  },

  "ayt-net-hesaplama": {
    rozet: "On bir ders ayrı ayrı",
    kisaCevap:
      "AYT neti de doğru − yanlış ÷ 4 ile bulunur. AYT'de dört test vardır ve sen alanına göre 80 soruluk kısmı çözersin; sayısalcı Matematik 40 + Fen 40, eşit ağırlıkçı Matematik 40 + Edebiyat-Sosyal-1 40 yapar.",
    tekBakista: [
      NET_KURALI,
      ["Soru sayısı", "80 soru · 180 dakika"],
      ["Matematik", "40 soru · 2025 ortalaması 6,86"],
      ["Fen", "Fizik 14 · Kimya 13 · Biyoloji 13"],
      ["Edebiyat-Sosyal-1", "Edebiyat 24 · Tarih-1 10 · Coğrafya-1 6"],
      ["Ağırlık", "Yerleştirme puanının %60'ı AYT'den"],
    ],
    rehber: [
      {
        baslik: "AYT neti neden daha değerli?",
        metin:
          "Yerleştirme puanının %60'ı AYT'den geliyor. Yani AYT'de kazanılan 1 net, TYT'deki 1 netten daha çok puan getirir. Ama TYT barajını geçemezsen AYT netlerin hiç sayılmaz.",
      },
      {
        baslik: "AYT'ye ne zaman başlanır?",
        metin:
          "TYT netin 60'ı geçtiyse. 2025 AYT Matematik ortalamasının 6,86 olması, temeli olmadan AYT'ye giren adayların çokluğundan.",
      },
      {
        baslik: "Alan dışı test çözülür mü?",
        metin:
          "Çözebilirsin ama puan türüne katkısı olmaz. Sosyal Bilimler-2 sadece sözel ve eşit ağırlık puanına girer; sayısalcı için zaman kaybıdır.",
      },
    ],
    ilgili: ["tyt-net-hesaplama", "hedef-net-rotasi", "tercih-robotu"],
  },


  "tyt-puan-hesaplama": {
    rozet: "OBP katkısı dahil",
    kisaCevap:
      "TYT puanı 100 taban puandan başlar ve netlerinle yükselir; 0 net 100 puana, 120 net 500 puana denk gelir. Üzerine OBP katkısı eklenir: diploma notu × 5 × 0,12. Tercih için 150 puan barajını geçmek gerekir.",
    tekBakista: [
      ["Puan aralığı", "100 – 500"],
      ["Baraj", "150 puan ≈ 15 net"],
      ["OBP katkısı", "diploma notu × 5 × 0,12"],
      ["En yüksek OBP katkısı", "60 puan (100 diploma notu)"],
      ["Geçen yıl yerleşen", "OBP katkısı yarıya iner"],
      ["Niteliği", "Tahmin — standart puan sınavdan önce hesaplanamaz"],
    ],
    rehber: [
      {
        baslik: "Neden kesin puan hesaplanamıyor?",
        metin:
          "ÖSYM ham puanı standart puanlar üzerinden hesaplar; standart puan sınav günü tüm adayların dağılımına bağlıdır. Sınav zor geçerse aynı net daha yüksek puan getirir. Buradaki sayı net başına ortalama katkıya dayanan bir tahmindir.",
      },
      {
        baslik: "Kaç net baraj geçirir?",
        metin:
          "Yaklaşık 15 net 150 puanı verir. Sadece Türkçe'de ortalama bir performans bile bunu sağlar; 2025'te Türkçe ortalaması 21,71 netti.",
      },
      {
        baslik: "OBP tek başına ne kadar oynatır?",
        metin:
          "60 ile 100 diploma notu arasındaki fark 24 puan. Bu, TYT'de yaklaşık 7 nete karşılık gelir — küçümsenecek bir fark değil ama netin yerini de tutmaz.",
      },
    ],
    ilgili: ["obp-hesaplama", "tyt-net-hesaplama", "net-siralama-tablosu"],
  },

  "obp-hesaplama": {
    rozet: "ÖSYM formülü",
    kisaCevap:
      "OBP = diploma notu × 5. Diploma notu 50–100 arasında olduğu için OBP 250–500 arasında çıkar. Yerleştirme puanına OBP'nin 0,12'si eklenir; kestirme yol: diploma notunu 0,6 ile çarp.",
    tekBakista: [
      ["Formül", "diploma notu × 5"],
      ["OBP aralığı", "250 – 500"],
      ["Puana katkı", "OBP × 0,12"],
      ["Kestirme", "diploma notu × 0,6"],
      ["En yüksek katkı", "60 puan"],
      ["Geçen yıl yerleşen", "Katsayı 0,06'ya iner"],
    ],
    rehber: [
      {
        baslik: "80 diploma notu kaç puan?",
        metin:
          "80 × 5 = 400 OBP, 400 × 0,12 = 48 puan. Aynı öğrenci 90 diploma notuyla 54 puan alırdı; 10 puanlık diploma farkı 6 puan ediyor.",
      },
      {
        baslik: "Kayıt sildirsem düzelir mi?",
        metin:
          "Hayır. Bir yükseköğretim programına yerleştikten sonra kayıt sildirmek OBP katsayısının yarıya inmesini engellemez. Karar verirken bunu hesaba kat.",
      },
      {
        baslik: "Diploma notu nasıl yükselir?",
        metin:
          "Diploma notu lise boyunca aldığın tüm yıl sonu ortalamalarının ortalamasıdır. Son sınıfta 100 yapsan bile önceki yılların ağırlığı devam eder; bu yüzden 12. sınıfta yapılabilecek değişiklik sınırlıdır.",
      },
    ],
    ilgili: ["tyt-puan-hesaplama", "tyt-net-hesaplama", "tercih-robotu"],
  },

  "hedef-net-rotasi": {
    rozet: "Ders bazlı dağıtım",
    kisaCevap:
      "Hedef net tek başına bir sayıdır; asıl soru o farkın hangi dersten geleceğidir. Bu araç mevcut netlerini ve hedefini alıp farkı dört derse dağıtır: tavana uzaklık ve dersin zorluğu birlikte hesaplanır, en ucuz net kazanılan ders öne çıkar.",
    tekBakista: [
      ["Girdi", "Hedef net + dört dersin mevcut neti"],
      ["Çıktı", "Ders başına kaç net kazanılacağı"],
      ["Tavanlar", "Türkçe 40 · Matematik 40 · Sosyal 20 · Fen 20"],
      ["Kural", "Hiçbir ders tavanının %85'ini aşmaz"],
      ["Tek ders sınırı", "Farkın en çok %45'i"],
      ["İmkânsız hedef", "Dağıtım yapılmaz, uyarı verilir"],
    ],
    rehber: [
      {
        baslik: "Neden düşük olduğum derse değil?",
        metin:
          "Sosyalde 10/20 iken 4 net kazanmak 6 hafta sürer; Türkçede 32'den 36'ya çıkmak 4 ay. Tavana uzak ve ezberlenebilir dersler daha ucuzdur. Dağıtım bunu hesaplar.",
      },
      {
        baslik: "Sayılar tuttuğunda ne yapmalı?",
        metin:
          "Çıkan artışları haftaya böl. Ayda 2 net gerektiren bir rota, haftada yarım net demektir; bu da haftada bir konu ve 200 soru civarı bir hacme karşılık gelir.",
      },
      {
        baslik: "Dağıtımı değiştirebilir miyim?",
        metin:
          "Evet, artı-eksi düğmeleriyle. Toplam hedefe eşit olmadan rota kapanmaz; böylece kendi planını kurarken matematiği bozamazsın.",
      },
    ],
    ilgili: ["bu-tempoyla-kac-net", "tyt-net-hesaplama", "tercih-robotu"],
  },


  "bu-tempoyla-kac-net": {
    rozet: "Trend projeksiyonu",
    kisaCevap:
      "Son denemelerinin arasındaki fark aylık artış hızını verir. Bu hız kalan süreye taşınır, uzun ufuklarda sönümlenir ve tavana yaklaştıkça yavaşlar. Çıkan sayı bir kehanet değil, mevcut trendinin devamıdır.",
    tekBakista: [
      ["Girdi", "En az iki deneme neti + kaç haftaya yayıldığı"],
      ["Aylık artış", "(son net − ilk net) ÷ geçen ay"],
      ["Sönümleme", "0,65 katsayı"],
      ["Ufuk sönümlemesi", "Uzun süreler kısalır, 6 ay yarı ömür"],
      ["Yumuşak tavan", "112 net"],
      ["Çıktı", "Üç senaryo: mevcut, hızlanma, düşüş"],
    ],
    rehber: [
      {
        baslik: "Neden doğrusal hesaplamıyoruz?",
        metin:
          "Ayda 5 net kazanan bir öğrenci bunu 10 ay sürdürseydi 50 net artardı; gerçekte kimse sürdüremiyor. Model bu yüzden uzun ufuklarda hızı düşürür ve tavana asimptotik yaklaşır.",
      },
      {
        baslik: "Kaç deneme yeterli?",
        metin:
          "En az iki, tercihen üç. Tek deneme trend vermez; tek denemede 6-8 net oynamak normaldir. Farklı yayınların denemelerini karıştırmak da zorluk farkını dengeler.",
      },
      {
        baslik: "Düşüş senaryosu ne işe yarar?",
        metin:
          "Plan yaparken en iyi ihtimale göre değil, ortalamaya göre karar vermek gerekir. Üç senaryonun aralığı, tercih listende kaç basamak esnek olman gerektiğini gösterir.",
      },
    ],
    ilgili: ["deneme-ortalamasi", "hedef-net-rotasi", "yks-kac-gun-kaldi"],
  },

  "yks-kac-gun-kaldi": {
    rozet: "Canlı geri sayım",
    kisaCevap:
      "Kalan gün tek başına bir sayı; asıl işe yarayan hâli hedef farkına bölünmüş hâli. Hedefinle mevcut netin arasındaki farkı kalan güne bölünce ayda ve haftada kaç net kazanman gerektiği çıkar.",
    tekBakista: [
      ["Sınav", "Haziran ayının üçüncü hafta sonu (ÖSYM takvimi kesinleştirir)"],
      ["Oturumlar", "Cumartesi TYT · Pazar AYT ve YDT"],
      ["Aylık gereken", "hedef farkı ÷ (kalan gün ÷ 30)"],
      ["Rahat tempo", "Ayda 1,5 nete kadar"],
      ["İstikrarlı", "Ayda 1,5 – 3 net"],
      ["Çok zor", "Ayda 5 netin üstü"],
    ],
    rehber: [
      {
        baslik: "Haftalık sayı neden önemli?",
        metin:
          "Ayda 2 net soyut, haftada yarım net somut. Haftada yarım net, bir konu ve 200 civarı soru demek. Planı bu ölçekte kurmak takip edilebilir olanı seçmek demektir.",
      },
      {
        baslik: "Tarih kesin mi?",
        metin:
          "ÖSYM sınav takvimini genellikle bir yıl önceden açıklar. Geri sayım tahmini tarihe göre çalışıyor; takvim yayımlanınca güncellenecek. Birkaç günlük kayma planı değiştirmez.",
      },
    ],
    ilgili: ["hedef-net-rotasi", "bu-tempoyla-kac-net", "deneme-ortalamasi"],
  },

  "deneme-ortalamasi": {
    rozet: "Kayıtlar tarayıcında kalır",
    kisaCevap:
      "Deneme ortalaması, netlerinin toplamının deneme sayısına bölümüdür. Ama referans alınması gereken sayı genel ortalama değil, son üç denemenin ortalamasıdır; eski denemeler artık senin seviyeni göstermez.",
    tekBakista: [
      ["Formül", "netlerin toplamı ÷ deneme sayısı"],
      ["Referans", "Son üç denemenin ortalaması"],
      ["Normal dalgalanma", "6 – 8 net"],
      ["Sınav günü sapması", "Ortalamanın 5-8 net altı yaygın"],
      ["Sağlıklı sıklık", "Haftada 1 · sınava 2 ay kala 2"],
      ["Yıllık üst sınır", "40 – 50 deneme"],
    ],
    rehber: [
      {
        baslik: "En yüksek denemeye neden bakılmaz?",
        metin:
          "Tek bir iyi sonuç, denemenin kolay olmasından da gelebilir. Ortalama gürültüyü siler. Aynı sebeple en kötü denemene bakıp umutsuzlanmak da yanlış.",
      },
      {
        baslik: "Dalgalanma ne kadar normal?",
        metin:
          "6-8 netlik oynama sıradan. 15 netlik oynama ise ya deneme zorluğundaki farkı ya da uyku ve dikkat sorununu işaret eder.",
      },
      {
        baslik: "Analiz etmediğin deneme",
        metin:
          "165 dakikalık kayıptır. Her denemeye bir analiz saati ayır: yanlışları konu konu ayır, aynı konu üçüncü kez çıkıyorsa o konuya dön.",
      },
    ],
    ilgili: ["bu-tempoyla-kac-net", "tyt-net-hesaplama", "hedef-net-rotasi"],
  },


  "net-siralama-tablosu": {
    rozet: "2025 yerleştirme verisi",
    kisaCevap:
      "Aynı net her yıl aynı sırayı vermez; sınavın zorluğu ve aday sayısı bandı kaydırır. Aşağıdaki tablo 2025 yerleştirme sonuçlarından çıkarılmış yaklaşık bantlardır: 55 net ~450.000, 70 net ~180.000, 85 net ~70.000, 100 net ~20.000. sıra.",
    tekBakista: [
      ["55 net", "~450.000. sıra"],
      ["70 net", "~180.000. sıra"],
      ["85 net", "~70.000. sıra"],
      ["100 net", "~20.000. sıra"],
      ["2025'te sınava giren", "2.351.641 aday"],
      ["Niteliği", "Yaklaşık — ÖSYM net–sıra tablosu yayımlamaz"],
    ],
    rehber: [
      {
        baslik: "Neden puan değil sıra?",
        metin:
          "Puanlar sınavın zorluğuna göre her yıl kayar; 480 puan bir yıl 30.000. sıra, ertesi yıl 45.000. sıra olabilir. Sıra ise adaylar arasındaki yerini gösterir ve karşılaştırma için tek sağlam ölçüdür.",
      },
      {
        baslik: "Bantlar neden yaklaşık?",
        metin:
          "ÖSYM net–sıralama dönüşüm tablosu yayımlamıyor; yayımladığı şey program bazlı taban puan ve başarı sırası. Bu tablo o sonuçlardan geriye doğru çıkarıldı, tahmindir.",
      },
      {
        baslik: "İlk 100.000 ne demek?",
        metin:
          "2,35 milyon aday içinde her 23 kişiden biri olmak demek. Popüler mühendislik ve sağlık programlarının çoğu bu bandın içinde kapanıyor.",
      },
    ],
    ilgili: ["tercih-robotu", "bolum-kac-net", "hedef-net-rotasi"],
  },

  "bolum-kac-net": {
    rozet: "2025 sıra aralıklarıyla",
    kisaCevap:
      "Bir bölüm için tek bir net yoktur, aralık vardır. Tıp'ta en üst devlet programı 2025'te 1.169. sırada kapandı, son yerleşen ise 39.903. sıradaydı; bu yaklaşık 108 ile 93 net arasına denk gelir. Tablodaki her satır bu iki sınırı gösterir.",
    tekBakista: [
      ["Tıp", "1.169 – 39.903. sıra · ~93–108 net"],
      ["Tıp en üst taban", "534,82 · Hacettepe (İngilizce)"],
      ["Tıp son yerleşen", "456,99 · SBÜ Gülhane"],
      ["Bilgisayar Müh. en üst", "534 · ODTÜ Ankara"],
      ["Hukuk en üst", "520 · Galatasaray"],
      ["Kapsam", "28 bölüm · devlet üniversiteleri"],
    ],
    rehber: [
      {
        baslik: "Neden iki sayı veriyoruz?",
        metin:
          "“Tıp için 108 net lazım” demek yanlış olurdu: 108 net en iyi programa girer, tıp okumak için 93 net yetiyordu. Tek sayı vermek öğrenciyi ya boşuna korkutur ya da yanlış güven verir.",
      },
      {
        baslik: "Vakıf üniversiteleri dahil mi?",
        metin:
          "Hayır, tablo devlet programlarını gösteriyor. Vakıf üniversitelerinin burslu kontenjanları genelde devletin üstünde, ücretli kontenjanları çok altında kapanır; ikisini aynı tabloda göstermek yanıltıcı olur.",
      },
      {
        baslik: "Bu yıl aynı olur mu?",
        metin:
          "Olmaz. Sıralar her yıl birkaç bin kayar. Tabloyu “bu netle nereye yakınım” sorusunu cevaplamak için kullan, tercih kararını YÖK Atlas'taki program bazlı güncel veriyle ver.",
      },
    ],
    ilgili: ["tercih-robotu", "net-siralama-tablosu", "hedef-net-rotasi"],
  },

  "tercih-robotu": {
    rozet: "2025 sıralarına göre",
    kisaCevap:
      "Toplam netini gir, 2025 bantlarına göre yaklaşık sıranı ve o sırayla hangi bölümlerin açık olduğunu gör. Liste iki parçadır: sıranın yettiği bölümler ve az kalanlar. Bu bir tercih listesi değil, yön göstergesidir.",
    tekBakista: [
      ["Girdi", "Toplam net"],
      ["Çıktı", "Yaklaşık sıra + ulaşılabilir bölümler"],
      ["Kapsam", "28 bölüm · devlet üniversiteleri"],
      ["Alan filtresi", "Sayısal · Eşit Ağırlık · Sözel · Dil"],
      ["Veri yılı", "2025 yerleştirme"],
      ["Niteliği", "Yaklaşık — kesin tercih için YÖK Atlas"],
    ],
    rehber: [
      {
        baslik: "“Yakın duranlar” ne demek?",
        metin:
          "Sıran şu an yetmiyor ama iki katına kadar yakın olan bölümler. Bunlar hedef koymak için doğru yer: ulaşılamaz değil, biraz net kazanınca açılıyor.",
      },
      {
        baslik: "Tercih dönemi robotu değil",
        metin:
          "Gerçek tercih, program bazlı kontenjan ve güncel taban verisiyle yapılır. Bu araç sınav öncesi “nereye doğru gidiyorum” sorusunu cevaplar; temmuzda YÖK Atlas'ı kullan.",
      },
      {
        baslik: "Netini artırırsan ne değişir?",
        metin:
          "70 netten 78 nete çıkmak 2025 bandında yaklaşık 180.000. sıradan 110.000. sıraya taşıyordu. 8 net, listeye onlarca program ekliyor.",
      },
    ],
    ilgili: ["bolum-kac-net", "net-siralama-tablosu", "hedef-net-rotasi"],
  },

  "ydt-net-hesaplama": {
    rozet: "80 soruluk tek test",
    kisaCevap:
      "YDT tek testtir: 80 soru, 120 dakika, net = doğru − yanlış ÷ 4. 2025'te İngilizce testine giren 78.468 adayın ortalaması 34,74 netti.",
    tekBakista: [
      NET_KURALI,
      ["Soru sayısı", "80 soru · 120 dakika"],
      ["2025 İngilizce ortalaması", "34,74 net"],
      ["Aday sayısı (İngilizce)", "78.468"],
      ["Diller", "İngilizce, Almanca, Fransızca, Arapça, Rusça"],
      ["Puan türü", "DİL"],
    ],
    rehber: [
      {
        baslik: "Hangi dil daha avantajlı?",
        metin:
          "2025 ortalamaları: Rusça 51,47 · Fransızca 44,56 · Almanca 41,48 · İngilizce 34,74 · Arapça 30,86. Ama az adaylı dillerde sıralama daha sert dalgalanır.",
      },
      {
        baslik: "TYT de gerekir mi?",
        metin:
          "Evet. DİL puanı hesaplanırken TYT netlerin de işin içine girer ve 150 barajını geçmen gerekir. Sadece YDT çalışmak yetmez.",
      },
    ],
    ilgili: ["tyt-net-hesaplama", "hedef-net-rotasi", "tercih-robotu"],
  },
};

export const aracIcerikBul = (slug: string): AracIcerik | undefined =>
  ARAC_ICERIK[slug];
