export type SiralamaSatiri = { net: number; siraYazi: string; sira: number };

/** Kaynak: ÖSYM ve YÖK Atlas 2025 yerleştirme sonuçlarından çıkarılmış bantlar. */
export const SIRALAMA: SiralamaSatiri[] = [
  { net: 40, siraYazi: "~900.000", sira: 900000 },
  { net: 55, siraYazi: "~450.000", sira: 450000 },
  { net: 65, siraYazi: "~260.000", sira: 260000 },
  { net: 70, siraYazi: "~180.000", sira: 180000 },
  { net: 78, siraYazi: "~110.000", sira: 110000 },
  { net: 85, siraYazi: "~70.000", sira: 70000 },
  { net: 92, siraYazi: "~42.000", sira: 42000 },
  { net: 100, siraYazi: "~20.000", sira: 20000 },
  { net: 108, siraYazi: "~8.000", sira: 8000 },
];

export const SIRALAMA_KAYNAK =
  "Kaynak: ÖSYM / YÖK Atlas, 2025 yerleştirme sonuçları. Geçmiş yıl verisi; bu yılın sonucu farklı olur.";

/** Sıra bandından geriye doğru: bu sıraya yaklaşık kaç net gerekiyordu? */
/** Tahmin, tablonun en üst bandına dayandı mı? O noktadan yukarısı okunamaz. */
export const tavandaMi = (sira: number) => sira <= SIRALAMA[SIRALAMA.length - 1].sira;

export function netTahmini(sira: number) {
  const s = SIRALAMA;
  if (sira >= s[0].sira) return s[0].net;
  if (sira <= s[s.length - 1].sira) return s[s.length - 1].net;
  for (let i = 1; i < s.length; i++) {
    if (sira >= s[i].sira) {
      const a = s[i - 1];
      const b = s[i];
      const oran = (Math.log(a.sira) - Math.log(sira)) / (Math.log(a.sira) - Math.log(b.sira));
      return Math.round(a.net + (b.net - a.net) * oran);
    }
  }
  return s[s.length - 1].net;
}

/** Netten sıraya: iki bant arasında logaritmik ara değer. */
export function siraTahminiSayi(net: number) {
  const s = SIRALAMA;
  if (net <= s[0].net) return s[0].sira;
  if (net >= s[s.length - 1].net) return s[s.length - 1].sira;
  for (let i = 1; i < s.length; i++) {
    if (net <= s[i].net) {
      const a = s[i - 1];
      const b = s[i];
      const oran = (net - a.net) / (b.net - a.net);
      return Math.round(Math.exp(Math.log(a.sira) + (Math.log(b.sira) - Math.log(a.sira)) * oran));
    }
  }
  return s[s.length - 1].sira;
}

export function siraTahmini(net: number) {
  const s = SIRALAMA;
  if (net <= s[0].net) return s[0];
  if (net >= s[s.length - 1].net) return s[s.length - 1];
  return s.reduce((a, b) =>
    Math.abs(b.net - net) < Math.abs(a.net - net) ? b : a
  );
}
