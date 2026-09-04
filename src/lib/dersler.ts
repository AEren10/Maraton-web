export type DersKey = "turkce" | "matematik" | "sosyal" | "fen";

export type Netler = Record<DersKey, number>;

export const DERSLER: { key: DersKey; ad: string; renk: string }[] = [
  { key: "turkce", ad: "Türkçe", renk: "var(--turkce)" },
  { key: "matematik", ad: "Matematik", renk: "var(--matematik)" },
  { key: "sosyal", ad: "Sosyal", renk: "var(--sosyal)" },
  { key: "fen", ad: "Fen", renk: "var(--fen)" },
];

export const TAVAN: Netler = { turkce: 40, matematik: 40, sosyal: 20, fen: 20 };

/** Net kazanmanın göreli maliyeti. Küçük olan daha ucuz yükselir. */
export const ZORLUK: Netler = {
  sosyal: 0.7,
  fen: 0.95,
  matematik: 1.15,
  turkce: 1.3,
};

export const SIFIR: Netler = { turkce: 0, matematik: 0, sosyal: 0, fen: 0 };

export const KEYS = DERSLER.map((d) => d.key);

export const toplam = (n: Netler) =>
  Math.round((n.turkce + n.matematik + n.sosyal + n.fen) * 100) / 100;

export const adOf = (k: DersKey) => DERSLER.find((d) => d.key === k)!.ad;
export const renkOf = (k: DersKey) => DERSLER.find((d) => d.key === k)!.renk;
