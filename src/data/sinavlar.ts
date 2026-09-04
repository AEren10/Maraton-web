export type SinavDersi = { ad: string; soru: number; renk: string };
export type SinavKey = "tyt" | "ayt" | "ydt";
export type AlanKey = "sayisal" | "ea" | "sozel";

const DERS = {
  matematik: { ad: "Matematik", soru: 40, renk: "var(--matematik)" },
  fizik: { ad: "Fizik", soru: 14, renk: "var(--fizik)" },
  kimya: { ad: "Kimya", soru: 13, renk: "var(--kimya)" },
  biyoloji: { ad: "Biyoloji", soru: 13, renk: "var(--biyoloji)" },
  edebiyat: { ad: "Edebiyat", soru: 24, renk: "var(--turkce)" },
  tarih1: { ad: "Tarih-1", soru: 10, renk: "var(--tarih)" },
  cografya1: { ad: "Coğrafya-1", soru: 6, renk: "var(--cografya)" },
  tarih2: { ad: "Tarih-2", soru: 11, renk: "var(--tarih)" },
  cografya2: { ad: "Coğrafya-2", soru: 11, renk: "var(--cografya)" },
  felsefe: { ad: "Felsefe Grubu", soru: 12, renk: "var(--felsefe)" },
  din: { ad: "Din Kültürü", soru: 6, renk: "var(--din)" },
} as const;

/**
 * AYT'de herkes 80 soru çözer, 160 değil: hangi testleri çözdüğün alanına
 * bağlı. Bu yüzden AYT hesabı alan seçimi olmadan yapılamaz.
 */
export const AYT_ALANLARI: Record<AlanKey, { ad: string; kisa: string; dersler: SinavDersi[] }> = {
  sayisal: {
    ad: "Sayısal",
    kisa: "SAY",
    dersler: [DERS.matematik, DERS.fizik, DERS.kimya, DERS.biyoloji],
  },
  ea: {
    ad: "Eşit Ağırlık",
    kisa: "EA",
    dersler: [DERS.matematik, DERS.edebiyat, DERS.tarih1, DERS.cografya1],
  },
  sozel: {
    ad: "Sözel",
    kisa: "SÖZ",
    dersler: [
      DERS.edebiyat,
      DERS.tarih1,
      DERS.cografya1,
      DERS.tarih2,
      DERS.cografya2,
      DERS.felsefe,
      DERS.din,
    ],
  },
};

export const ALAN_KEYS: AlanKey[] = ["sayisal", "ea", "sozel"];

export const SINAVLAR: Record<
  SinavKey,
  { ad: string; uzunAd: string; sure: number; dersler: SinavDersi[] }
> = {
  tyt: {
    ad: "TYT",
    uzunAd: "Temel Yeterlilik Testi",
    sure: 165,
    dersler: [
      { ad: "Türkçe", soru: 40, renk: "var(--turkce)" },
      { ad: "Sosyal Bilimler", soru: 20, renk: "var(--sosyal)" },
      { ad: "Temel Matematik", soru: 40, renk: "var(--matematik)" },
      { ad: "Fen Bilimleri", soru: 20, renk: "var(--fen)" },
    ],
  },
  ayt: {
    ad: "AYT",
    uzunAd: "Alan Yeterlilik Testi",
    sure: 180,
    dersler: AYT_ALANLARI.sayisal.dersler,
  },
  ydt: {
    ad: "YDT",
    uzunAd: "Yabancı Dil Testi",
    sure: 120,
    dersler: [{ ad: "Yabancı Dil", soru: 80, renk: "var(--turkce)" }],
  },
};

/** Seçilen sınav ve alana göre çözülecek testler. */
export function dersleriGetir(sinav: SinavKey, alan: AlanKey): SinavDersi[] {
  return sinav === "ayt" ? AYT_ALANLARI[alan].dersler : SINAVLAR[sinav].dersler;
}

export const soruSayisi = (dersler: SinavDersi[]) =>
  dersler.reduce((t, d) => t + d.soru, 0);
