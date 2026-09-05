import type { AlanKey } from "@/data/sinavlar";

/**
 * Net girişlerini adres çubuğunda okunur tutar.
 *
 * Ders adlarını yazmak yerine sıraya güvenir: `d` doğruları, `y` yanlışları
 * tire ile ayırır. `y` hepsi sıfırsa hiç yazılmaz. Eski `n=Ders:d:y,...`
 * biçimiyle paylaşılmış bağlantılar da okunmaya devam eder.
 */
export type Giris = Record<string, { d: number; y: number }>;

const ALAN_KISA: Record<AlanKey, string> = { sayisal: "say", ea: "ea", sozel: "soz" };
const ALAN_UZUN = Object.fromEntries(
  Object.entries(ALAN_KISA).map(([k, v]) => [v, k])
) as Record<string, AlanKey>;

export const alanKisalt = (a: AlanKey) => ALAN_KISA[a];
export const alanCoz = (v: string | null): AlanKey | null =>
  (v && (ALAN_UZUN[v] ?? (v in ALAN_KISA ? (v as AlanKey) : null))) || null;

const sayilar = (v: string | null) =>
  (v ?? "").split("-").map((n) => Math.max(Number(n) || 0, 0));

/** Adresteki girişleri ders sırasına göre çözer. */
export function girisCoz(p: URLSearchParams, adlar: string[]): Giris {
  const giris: Giris = {};

  const eski = p.get("n");
  if (eski && eski.includes(":")) {
    for (const parca of eski.split(",")) {
      const [ad, d, y] = parca.split(":");
      if (ad) giris[ad] = { d: Number(d) || 0, y: Number(y) || 0 };
    }
    return giris;
  }

  const dogru = sayilar(p.get("d"));
  const yanlis = sayilar(p.get("y"));
  adlar.forEach((ad, i) => {
    if (dogru[i] || yanlis[i]) giris[ad] = { d: dogru[i] ?? 0, y: yanlis[i] ?? 0 };
  });
  return giris;
}

/** Girişleri kısa sorgu alanlarına çevirir; hepsi boşsa null döner. */
export function girisYaz(giris: Giris, adlar: string[]) {
  const d = adlar.map((ad) => giris[ad]?.d ?? 0);
  const y = adlar.map((ad) => giris[ad]?.y ?? 0);
  if (!d.some(Boolean) && !y.some(Boolean)) return null;
  return {
    d: d.join("-"),
    ...(y.some(Boolean) ? { y: y.join("-") } : {}),
  };
}
