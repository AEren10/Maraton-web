import { Netler } from "./dersler";

/**
 * ÖSYM ham puanı standart puanlar üzerinden hesaplar; standart puan sınav günü
 * tüm adayların dağılımına bağlıdır ve sınavdan önce bilinemez. Buradaki
 * katsayılar net başına ortalama katkının yaklaşık karşılığıdır: 0 net 100
 * puana, 120 net 500 puana denk gelir. Sonuç bir tahmindir, ÖSYM sonucu değildir.
 */
export const TYT_KATSAYI = {
  turkce: 3.3,
  sosyal: 3.4,
  matematik: 3.3,
  fen: 3.4,
} as const;

export const TABAN_PUAN = 100;
export const BARAJ = 150;
export const OBP_CARPAN = 0.12;

export const obpHesapla = (diplomaNotu: number) =>
  Math.min(Math.max(diplomaNotu, 50), 100) * 5;

export function tytPuan(netler: Netler) {
  const ham =
    TABAN_PUAN +
    netler.turkce * TYT_KATSAYI.turkce +
    netler.sosyal * TYT_KATSAYI.sosyal +
    netler.matematik * TYT_KATSAYI.matematik +
    netler.fen * TYT_KATSAYI.fen;
  return Math.round(ham * 100) / 100;
}

export function yerlestirmePuani(ham: number, obp: number, gecenYilYerlesti = false) {
  const ek = obp * OBP_CARPAN * (gecenYilYerlesti ? 0.5 : 1);
  return Math.round((ham + ek) * 100) / 100;
}
