import { siraBandi, yksHamPuan } from "./yerlestirme";

/**
 * Aynı toplam net, dağılıma göre farklı sıralar verir.
 *
 * AYT'nin ağırlığı %60 ama soru sayısı 80; TYT'nin ağırlığı %40 ama soru
 * sayısı 120. Yani AYT'de kazanılan bir net TYT'dekinden değerli. Bu dosya
 * bir toplamı olabilir dağılımlara açıp her birinin sıra karşılığını verir.
 */

export const TYT_TAVAN = 120;
export const AYT_TAVAN = 80;

export type Dagilim = {
  tyt: number;
  ayt: number;
  puan: number;
  sira: number;
  etiket: string;
};

const kur = (tyt: number, ayt: number, etiket: string): Dagilim => {
  const puan = yksHamPuan(tyt, ayt);
  return { tyt, ayt, puan, sira: siraBandi(puan).orta, etiket };
};

/**
 * Toplamın TYT'ye düşen payı için gerçekçi aralık.
 *
 * Soru sayıları elverse de kimse 115 netin tamamını TYT'den ya da AYT'den
 * çıkarmıyor: TYT daha kolay ve 40 soru daha uzun, bu yüzden TYT neti
 * pratikte AYT netinin altına düşmüyor. Uçları buna göre kırpıyoruz.
 */
function aralik(toplam: number) {
  return {
    enAz: Math.max(Math.ceil(toplam / 2), toplam - AYT_TAVAN, 0),
    enCok: Math.min(Math.round(toplam * 0.85), toplam, TYT_TAVAN),
  };
}

/** Aralığın ortası: iki oturumu da benzer oranda çözen aday. */
export function tipikDagilim(toplam: number): Dagilim {
  const { enAz, enCok } = aralik(toplam);
  return kur(orta(enAz, enCok), toplam - orta(enAz, enCok), "Dengeli");
}

const orta = (enAz: number, enCok: number) => Math.round((enAz + enCok) / 2);

/**
 * Uçlardan dengeliye beş dağılım. Aralık dar olduğunda tekrar eden
 * satırlar elenir; sıralamada en iyisi başa gelir.
 */
export function dagilimlar(toplam: number): Dagilim[] {
  const { enAz, enCok } = aralik(toplam);
  if (enCok < enAz) return [];

  const adaylar: [number, string][] = [
    [enAz, "AYT ağırlıklı"],
    [Math.round(enAz + (enCok - enAz) * 0.35), "AYT'ye yatkın"],
    [orta(enAz, enCok), "Dengeli"],
    [Math.round(enAz + (enCok - enAz) * 0.7), "TYT'ye yatkın"],
    [enCok, "TYT ağırlıklı"],
  ];

  const gorulen = new Set<number>();
  const liste: Dagilim[] = [];
  for (const [tyt, etiket] of adaylar) {
    if (gorulen.has(tyt)) continue;
    gorulen.add(tyt);
    liste.push(kur(tyt, toplam - tyt, etiket));
  }
  return liste.sort((a, b) => a.sira - b.sira);
}

/** En iyi ve en kötü dağılım arasındaki sıra farkı. */
export function dagilimFarki(toplam: number) {
  const liste = dagilimlar(toplam);
  if (liste.length < 2) return 0;
  return liste[liste.length - 1].sira - liste[0].sira;
}

/**
 * Sıradan geriye toplam net: dengeli dağılımla o sıraya ulaştıran en küçük
 * toplam. Bölüm sayfaları "kaç net gerekiyordu" sorusunu böyle cevaplıyor.
 */
export function toplamNetTahmini(hedefSira: number) {
  for (let toplam = 30; toplam <= TYT_TAVAN + AYT_TAVAN; toplam++) {
    if (tipikDagilim(toplam).sira <= hedefSira) return toplam;
  }
  return TYT_TAVAN + AYT_TAVAN;
}

/** Tahmin ölçeğin dışına taştıysa "115+" gibi yazmak gerekir. */
export const netTavanindaMi = (hedefSira: number) =>
  toplamNetTahmini(hedefSira) >= 115;
