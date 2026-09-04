/**
 * 2025-YKS resmî sonuç istatistikleri (ÖSYM).
 * Ortalamalar doğru sayısı değil, net ortalamasıdır.
 */
export const ISTATISTIK_YILI = 2025;

export const ISTATISTIK_KAYNAK =
  "Kaynak: ÖSYM 2025-YKS sayısal bilgileri. Ortalamalar sınava giren tüm adaylara ait.";

export type DersOrtalamasi = { ad: string; soru: number; ortalama: number };

export const TYT_ORTALAMA: DersOrtalamasi[] = [
  { ad: "Türkçe", soru: 40, ortalama: 21.71 },
  { ad: "Sosyal Bilimler", soru: 20, ortalama: 9.72 },
  { ad: "Temel Matematik", soru: 40, ortalama: 6.65 },
  { ad: "Fen Bilimleri", soru: 20, ortalama: 4.61 },
];

export const AYT_ORTALAMA: DersOrtalamasi[] = [
  { ad: "Matematik", soru: 40, ortalama: 6.86 },
  { ad: "Fizik", soru: 14, ortalama: 2.51 },
  { ad: "Kimya", soru: 13, ortalama: 1.85 },
  { ad: "Biyoloji", soru: 13, ortalama: 2.58 },
  { ad: "Edebiyat", soru: 24, ortalama: 6.38 },
  { ad: "Tarih-1", soru: 10, ortalama: 2.08 },
  { ad: "Coğrafya-1", soru: 6, ortalama: 1.31 },
  { ad: "Tarih-2", soru: 11, ortalama: 1.27 },
  { ad: "Coğrafya-2", soru: 11, ortalama: 2.47 },
  { ad: "Felsefe Grubu", soru: 12, ortalama: 1.71 },
  { ad: "Din Kültürü", soru: 6, ortalama: 1.38 },
];

export const YDT_ORTALAMA: DersOrtalamasi[] = [
  { ad: "Yabancı Dil", soru: 80, ortalama: 34.74 },
];

export const YDT_DILLER = [
  { ad: "İngilizce", aday: 78468, ortalama: 34.74 },
  { ad: "Almanca", aday: 699, ortalama: 41.48 },
  { ad: "Fransızca", aday: 440, ortalama: 44.56 },
  { ad: "Arapça", aday: 1272, ortalama: 30.86 },
  { ad: "Rusça", aday: 178, ortalama: 51.47 },
];

export const GENEL = {
  basvuran: 2560649,
  giren: 2351641,
  sonSinif: 825489,
  tytToplamOrtalama: 42.69,
};

export const ortalamaBul = (ad: string) =>
  [...TYT_ORTALAMA, ...AYT_ORTALAMA, ...YDT_ORTALAMA].find((d) => d.ad === ad)?.ortalama;
