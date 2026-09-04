import { BOLUMLER, type Bolum } from "./bolumler";
import { netTahmini, siraTahminiSayi, tavandaMi } from "./siralama";
import { slugla } from "@/lib/slug";

/* ---------- net → sıralama sayfaları ---------- */

export const NET_ARALIGI = { en_az: 40, en_cok: 115 };

export const NETLER = Array.from(
  { length: NET_ARALIGI.en_cok - NET_ARALIGI.en_az + 1 },
  (_, i) => NET_ARALIGI.en_az + i
);

export const netSlug = (net: number) => `${net}-net-kac-siralama`;

export const netSlugCoz = (slug: string) => {
  const eslesme = slug.match(/^(\d+)-net-kac-siralama$/);
  if (!eslesme) return null;
  const net = Number(eslesme[1]);
  return NETLER.includes(net) ? net : null;
};

/** Bu netin sırasıyla girilebilen bölümler, en seçiciden başlayarak. */
export function netinBolumleri(net: number) {
  const sira = siraTahminiSayi(net);
  return [...BOLUMLER]
    .filter((b) => b.sonSira >= sira)
    .sort((a, b) => a.ustSira - b.ustSira);
}

export const komsuNetler = (net: number) =>
  [net - 10, net - 5, net - 1, net + 1, net + 5, net + 10].filter(
    (n) => n >= NET_ARALIGI.en_az && n <= NET_ARALIGI.en_cok
  );

/* ---------- bölüm → net sayfaları ---------- */

export const bolumSlug = (b: Bolum) => `${slugla(b.ad)}-kac-net`;

export const bolumSlugCoz = (slug: string) =>
  BOLUMLER.find((b) => bolumSlug(b) === slug) ?? null;

export function bolumNetleri(b: Bolum) {
  const zor = netTahmini(b.ustSira);
  return {
    kolay: netTahmini(b.sonSira),
    zor,
    zorYazi: tavandaMi(b.ustSira) ? `${zor}+` : String(zor),
  };
}

export const benzerBolumler = (b: Bolum) =>
  BOLUMLER.filter((x) => x.alan === b.alan && x.ad !== b.ad)
    .sort((x, y) => Math.abs(x.sonSira - b.sonSira) - Math.abs(y.sonSira - b.sonSira))
    .slice(0, 6);

/* ---------- "X netten Y nete" rota sayfaları ---------- */

// Öğrenciler yuvarlak hedefler arıyor: "54 netten 72 nete" gibi. Başlangıç
// her net olabilir, hedef ise tipik hedeflerden biri.
const BASLANGIC = Array.from({ length: 46 }, (_, i) => 40 + i);
const HEDEFLER = [60, 65, 70, 72, 75, 80, 85, 90, 100];

export const ROTALAR = BASLANGIC.flatMap((bas) =>
  HEDEFLER.filter((son) => son - bas >= 6 && son - bas <= 40).map((son) => ({ bas, son }))
);

export const rotaSlug = (bas: number, son: number) => `${bas}-netten-${son}-nete`;

export const rotaSlugCoz = (slug: string) => {
  const eslesme = slug.match(/^(\d+)-netten-(\d+)-nete$/);
  if (!eslesme) return null;
  const bas = Number(eslesme[1]);
  const son = Number(eslesme[2]);
  return ROTALAR.find((r) => r.bas === bas && r.son === son) ?? null;
};

/**
 * Toplam neti dört derse makul biçimde dağıtır; programatik sayfalarda
 * örnek bir başlangıç tablosu üretmek için kullanılır.
 */
export function ornekDagilim(toplam: number) {
  const pay = { turkce: 0.36, matematik: 0.28, sosyal: 0.19, fen: 0.17 };
  const tavan = { turkce: 40, matematik: 40, sosyal: 20, fen: 20 };
  const ham = {
    turkce: Math.min(Math.round(toplam * pay.turkce), tavan.turkce),
    matematik: Math.min(Math.round(toplam * pay.matematik), tavan.matematik),
    sosyal: Math.min(Math.round(toplam * pay.sosyal), tavan.sosyal),
    fen: Math.min(Math.round(toplam * pay.fen), tavan.fen),
  };
  const fark = toplam - (ham.turkce + ham.matematik + ham.sosyal + ham.fen);
  ham.matematik = Math.min(Math.max(ham.matematik + fark, 0), tavan.matematik);
  return ham;
}

/* ---------- bölüm karşılaştırma sayfaları ---------- */

/** Öğrencilerin gerçekten yan yana koyduğu, sıra bandı uzak olsa da aranan çiftler. */
const ELLE_CIFTLER: [string, string][] = [
  ["Tıp", "Diş Hekimliği"],
  ["Tıp", "Eczacılık"],
  ["Tıp", "Veterinerlik"],
  ["Diş Hekimliği", "Eczacılık"],
  ["Hukuk", "Psikoloji"],
  ["Bilgisayar Mühendisliği", "Yazılım Mühendisliği"],
  ["Bilgisayar Mühendisliği", "Elektrik-Elektronik Mühendisliği"],
  ["Endüstri Mühendisliği", "Makine Mühendisliği"],
  ["Psikoloji", "Rehberlik ve Psikolojik Danışmanlık"],
  ["Hemşirelik", "Fizyoterapi ve Rehabilitasyon"],
  ["İşletme", "İktisat"],
];

/** Aynı alandan, sıra bandı birbirine yakın bölüm çiftleri. */
export const KARSILASTIRMALAR = (() => {
  const ciftler: { a: Bolum; b: Bolum }[] = [];
  const eklendi = new Set<string>();
  const ekle = (a?: Bolum, b?: Bolum) => {
    if (!a || !b || a.ad === b.ad) return;
    const anahtar = [a.ad, b.ad].sort().join("|");
    if (eklendi.has(anahtar)) return;
    eklendi.add(anahtar);
    ciftler.push(a.ustSira <= b.ustSira ? { a, b } : { a: b, b: a });
  };

  for (const [x, y] of ELLE_CIFTLER) {
    ekle(
      BOLUMLER.find((b) => b.ad === x),
      BOLUMLER.find((b) => b.ad === y)
    );
  }

  for (const alan of ["Sayısal", "Eşit Ağırlık", "Sözel", "Dil"] as const) {
    const liste = BOLUMLER.filter((x) => x.alan === alan).sort(
      (x, y) => x.ustSira - y.ustSira
    );
    for (let i = 0; i < liste.length; i++) {
      for (let j = i + 1; j < Math.min(i + 4, liste.length); j++) {
        ekle(liste[i], liste[j]);
      }
    }
  }
  return ciftler;
})();

export const karsilastirmaSlug = (a: Bolum, b: Bolum) =>
  `${slugla(a.ad)}-vs-${slugla(b.ad)}`;

export const karsilastirmaCoz = (slug: string) =>
  KARSILASTIRMALAR.find((c) => karsilastirmaSlug(c.a, c.b) === slug) ?? null;

/** Bir bölümün yer aldığı diğer karşılaştırmalar. */
export const bolumunKarsilastirmalari = (b: Bolum) =>
  KARSILASTIRMALAR.filter((c) => c.a.ad === b.ad || c.b.ad === b.ad).slice(0, 5);
