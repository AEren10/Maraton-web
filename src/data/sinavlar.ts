export type SinavDersi = { ad: string; soru: number; renk: string };
export type SinavKey = "tyt" | "ayt" | "ydt";

export const SINAVLAR: Record<
  SinavKey,
  { ad: string; sure: number; dersler: SinavDersi[] }
> = {
  tyt: {
    ad: "TYT",
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
    sure: 180,
    dersler: [
      { ad: "Matematik", soru: 40, renk: "var(--matematik)" },
      { ad: "Fizik", soru: 14, renk: "var(--fizik)" },
      { ad: "Kimya", soru: 13, renk: "var(--kimya)" },
      { ad: "Biyoloji", soru: 13, renk: "var(--biyoloji)" },
      { ad: "Edebiyat", soru: 24, renk: "var(--turkce)" },
      { ad: "Tarih-1", soru: 10, renk: "var(--tarih)" },
      { ad: "Coğrafya-1", soru: 6, renk: "var(--cografya)" },
      { ad: "Tarih-2", soru: 11, renk: "var(--tarih)" },
      { ad: "Coğrafya-2", soru: 11, renk: "var(--cografya)" },
      { ad: "Felsefe Grubu", soru: 12, renk: "var(--felsefe)" },
      { ad: "Din Kültürü", soru: 6, renk: "var(--din)" },
    ],
  },
  ydt: {
    ad: "YDT",
    sure: 120,
    dersler: [{ ad: "Yabancı Dil", soru: 80, renk: "var(--turkce)" }],
  },
};
