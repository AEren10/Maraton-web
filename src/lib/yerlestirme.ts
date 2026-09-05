/**
 * YKS yerleştirme puanı yaklaşık hesabı.
 *
 * Resmî formül: YKS ham puanı = TYT ham puanı × 0,40 + AYT ham puanı × 0,60.
 * Yerleştirme puanı = ham puan + OBP × 0,12 (en çok +60).
 *
 * Ham puanlar standart puanlar üzerinden hesaplanır ve sınav günü tüm
 * adayların dağılımına bağlıdır; sınavdan önce kesin hesaplanamaz. Buradaki
 * dönüşüm 100–500 ölçeğine doğrusal yaklaşımdır: 0 net 100 puana, testin
 * tamamı 500 puana denk gelir.
 */

export const TYT_SORU = 120;
export const AYT_SORU = 80;
export const TABAN = 100;
export const TAVAN = 500;

const arali = (net: number, soru: number) =>
  TABAN + (Math.max(net, 0) / soru) * (TAVAN - TABAN);

export const tytHamPuan = (tytNet: number) => arali(tytNet, TYT_SORU);
export const aytHamPuan = (aytNet: number) => arali(aytNet, AYT_SORU);

/** TYT %40, AYT %60. AYT girilmediyse sadece TYT puanı anlamlıdır. */
export function yksHamPuan(tytNet: number, aytNet: number) {
  return tytHamPuan(tytNet) * 0.4 + aytHamPuan(aytNet) * 0.6;
}

/** Diploma notundan gelen katkı: OBP × 0,12, üst sınır 60 puan. */
export const obpKatkisi = (diplomaNotu: number) =>
  Math.min(Math.min(Math.max(diplomaNotu, 50), 100) * 5 * 0.12, 60);

/** Ortalama bir diploma notunun getirdiği katkı; sıra tahmininde varsayılan. */
export const VARSAYILAN_OBP_KATKISI = 50;

/**
 * Yerleştirme puanı → yaklaşık başarı sırası (sayısal, 2025).
 *
 * İki nokta ÖSYM/YÖK Atlas'tan doğrulanmış:
 * 534,82 → 1.169 (Hacettepe Tıp İngilizce), 456,99 → 39.903 (SBÜ Gülhane Tıp).
 * Aradaki ve dışındaki noktalar bu ikisine oturtulmuş tahminlerdir.
 * Taban puanları OBP dahil olduğu için tablo da yerleştirme puanı ölçeğindedir.
 */
const EGRI: [puan: number, sira: number][] = [
  [560, 300],
  [534.82, 1_169],
  [500, 6_000],
  [480, 13_000],
  [456.99, 39_903],
  [430, 70_000],
  [400, 120_000],
  [350, 220_000],
  [300, 380_000],
  [250, 600_000],
  [200, 900_000],
];

/** Komşu iki çapa arasında logaritmik ara değer. */
export function puandanSira(yerlestirmePuan: number) {
  const p = Math.min(Math.max(yerlestirmePuan, 200), 560);
  for (let i = 0; i < EGRI.length - 1; i++) {
    const [ustP, ustS] = EGRI[i];
    const [altP, altS] = EGRI[i + 1];
    if (p <= ustP && p >= altP) {
      const oran = (ustP - p) / (ustP - altP);
      return Math.round(Math.exp(Math.log(ustS) + oran * (Math.log(altS) - Math.log(ustS))));
    }
  }
  return p > EGRI[0][0] ? EGRI[0][1] : EGRI[EGRI.length - 1][1];
}

/** Yanıltıcı hassasiyet olmasın diye anlamlı basamağa yuvarlar. */
function yuvarla(n: number) {
  const basamak = Math.pow(10, Math.max(Math.floor(Math.log10(n)) - 1, 0));
  return Math.round(n / basamak) * basamak;
}

/** Tahminin belirsizliğini gösteren bant. */
export function siraBandi(hamPuan: number, obpKatki = VARSAYILAN_OBP_KATKISI) {
  const orta = puandanSira(hamPuan + obpKatki);
  return {
    orta: yuvarla(orta),
    iyi: yuvarla(Math.max(orta * 0.55, 300)),
    kotu: yuvarla(Math.min(orta * 1.7, 900_000)),
  };
}

export const puanYazi = (p: number) =>
  p.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
