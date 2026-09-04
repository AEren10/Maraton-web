import type { DersKey, Netler } from "./dersler";
import { KEYS, SIFIR, TAVAN, ZORLUK, toplam } from "./dersler";

export type Dagitim = {
  artis: Netler;
  hedef: Netler;
  mevcutToplam: number;
  hedefToplam: number;
  fark: number;
  kaldirac: DersKey | null;
  uyari: string | null;
};

const TAVAN_ORANI = 0.85;
/** Tek bir ders toplam farkın bundan fazlasını taşımaz. Dört dersi de aynı anda
 *  bırakıp tek derse yüklenmek gerçek hayatta olmuyor. */
const PAY_TAVANI = 0.45;

/** Bir dersin bir sonraki neti kazanma maliyeti: dE/dx = A / (h - x) */
export const marjinalMaliyet = (k: DersKey, bosluk: number, artis: number) =>
  ZORLUK[k] / Math.max(bosluk - artis, 0.001);

/** Lagrange kapalı çözümü: toplam eforu minimize eden dağıtım. */
function coz(bosluk: Netler, aktif: DersKey[], D: number): Netler {
  const x: Netler = { ...SIFIR };
  if (aktif.length === 0 || D <= 0) return x;
  const H = aktif.reduce((s, k) => s + bosluk[k], 0);
  const A = aktif.reduce((s, k) => s + ZORLUK[k], 0);
  for (const k of aktif) x[k] = bosluk[k] - (ZORLUK[k] * (H - D)) / A;
  return x;
}

function pozitifCoz(bosluk: Netler, D: number): Netler {
  let aktif = KEYS.filter((k) => bosluk[k] > 0) as DersKey[];
  let x = coz(bosluk, aktif, D);
  for (let i = 0; i < 3; i++) {
    const negatif = aktif.filter((k) => x[k] < 0);
    if (negatif.length === 0) break;
    aktif = aktif.filter((k) => x[k] > 0);
    x = coz(bosluk, aktif, D);
  }
  for (const k of KEYS) if (x[k] < 0) x[k] = 0;
  return x;
}

function tavanaKirp(bosluk: Netler, x: Netler, D: number): Netler {
  const acikDers = KEYS.filter((k) => bosluk[k] > 0).length;
  const pay = acikDers > 1 ? D * PAY_TAVANI : Infinity;
  const tavanI = (k: DersKey) => Math.min(bosluk[k] * TAVAN_ORANI, pay);

  for (let tur = 0; tur < 5; tur++) {
    let artan = 0;
    const serbest: DersKey[] = [];
    for (const k of KEYS) {
      const limit = tavanI(k);
      if (x[k] > limit) {
        artan += x[k] - limit;
        x[k] = limit;
      } else if (x[k] < limit - 0.001) serbest.push(k);
    }
    if (artan < 0.01 || serbest.length === 0) break;
    const kalanBosluk: Netler = { ...SIFIR };
    for (const k of serbest) kalanBosluk[k] = tavanI(k) - x[k];
    const ek = pozitifCoz(kalanBosluk, Math.min(artan, toplam(kalanBosluk)));
    for (const k of serbest) x[k] += ek[k];
  }
  return x;
}

/** Ondalıkları tam sayıya çevirir, artığı en ucuz derse yükler. */
function yuvarla(bosluk: Netler, limit: Netler, x: Netler, D: number): Netler {
  const tam: Netler = { ...SIFIR };
  for (const k of KEYS) tam[k] = Math.floor(x[k]);
  let kalan = Math.round(D) - toplam(tam);
  while (kalan > 0) {
    const uygun = KEYS.filter((k) => tam[k] < Math.floor(limit[k]));
    if (uygun.length === 0) break;
    uygun.sort(
      (a, b) =>
        marjinalMaliyet(a, bosluk[a], tam[a]) -
        marjinalMaliyet(b, bosluk[b], tam[b])
    );
    tam[uygun[0]] += 1;
    kalan -= 1;
  }
  while (kalan < 0) {
    const uygun = KEYS.filter((k) => tam[k] > 0);
    if (uygun.length === 0) break;
    uygun.sort(
      (a, b) =>
        marjinalMaliyet(b, bosluk[b], tam[b]) -
        marjinalMaliyet(a, bosluk[a], tam[a])
    );
    tam[uygun[0]] -= 1;
    kalan += 1;
  }
  return tam;
}

export function rotaCikar(mevcut: Netler, hedefToplam: number): Dagitim {
  const mevcutToplam = toplam(mevcut);
  const D = hedefToplam - mevcutToplam;
  const bosluk: Netler = { ...SIFIR };
  for (const k of KEYS) bosluk[k] = Math.max(TAVAN[k] - mevcut[k], 0);
  const H = toplam(bosluk);

  const bos = (u: string | null): Dagitim => ({
    artis: { ...SIFIR },
    hedef: { ...mevcut },
    mevcutToplam,
    hedefToplam,
    fark: Math.round(D * 100) / 100,
    kaldirac: null,
    uyari: u,
  });

  if (D <= 0) return bos(null);
  if (D > H)
    return bos(
      `Dört dersin tavanı toplam ${mevcutToplam + H} net. ${hedefToplam} bu tavanın üstünde.`
    );
  if (D > H * TAVAN_ORANI)
    return bos(
      `Bu netlerden ${hedefToplam}'e çıkmak dört dersin de tavanına dayanmak demek. Önce ${Math.floor(mevcutToplam + H * 0.6)} civarına bakalım.`
    );

  const acik = KEYS.filter((k) => bosluk[k] > 0).length;
  const pay = acik > 1 ? D * PAY_TAVANI : Infinity;
  const limit: Netler = { ...SIFIR };
  for (const k of KEYS) limit[k] = Math.min(bosluk[k], Math.max(pay, 1));
  const artis = yuvarla(bosluk, limit, tavanaKirp(bosluk, pozitifCoz(bosluk, D), D), D);
  const hedef: Netler = { ...SIFIR };
  for (const k of KEYS) hedef[k] = mevcut[k] + artis[k];
  const kaldirac = [...KEYS].sort((a, b) => artis[b] - artis[a])[0];

  return {
    artis,
    hedef,
    mevcutToplam,
    hedefToplam: toplam(hedef),
    fark: Math.round(D * 100) / 100,
    kaldirac: artis[kaldirac] > 0 ? kaldirac : null,
    uyari: null,
  };
}
