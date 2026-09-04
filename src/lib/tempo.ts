export type TempoKey = "rahat" | "istikrarli" | "agresif" | "cokzor";

export const TEMPOLAR: Record<
  TempoKey,
  { ad: string; isaret: string; renk: string; cumle: string }
> = {
  rahat: {
    ad: "RAHAT",
    isaret: "🟢",
    renk: "var(--up)",
    cumle: "Bu tempo mevcut düzenini bozmadan tutulur.",
  },
  istikrarli: {
    ad: "İSTİKRARLI",
    isaret: "🟡",
    renk: "var(--warn)",
    cumle: "Ayda iki nete yakın. Düzenli deneme ve konu takibi ister.",
  },
  agresif: {
    ad: "AGRESİF",
    isaret: "🟠",
    renk: "#FF9F2E",
    cumle: "Bu hız, haftada en az iki deneme ve sıkı bir yanlış defteri demek.",
  },
  cokzor: {
    ad: "ÇOK ZOR",
    isaret: "🔴",
    renk: "var(--brand)",
    cumle: "Bu tempoyu 3 aydan uzun sürdüren az. Hedefi bir kademe indirmek daha gerçekçi.",
  },
};

export function tempo(fark: number, kalanGun: number) {
  const ay = Math.max(kalanGun / 30, 0.5);
  const aylik = fark / ay;
  const key: TempoKey =
    aylik <= 1.5 ? "rahat" : aylik <= 3 ? "istikrarli" : aylik <= 5 ? "agresif" : "cokzor";
  return {
    key,
    aylik: Math.round(aylik * 100) / 100,
    haftalik: Math.round((fark / Math.max(kalanGun / 7, 1)) * 100) / 100,
    ...TEMPOLAR[key],
  };
}
