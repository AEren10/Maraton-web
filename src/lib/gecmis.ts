export type Deneme = {
  /** Kaydın kimliği; silme işlemi bunun üzerinden yapılır. */
  id: string;
  /** ISO tarih. */
  tarih: string;
  net: number;
  not?: string;
};

const ANAHTAR = "maraton.denemeler";
const ENFAZLA = 60;

const gecerli = (d: unknown): d is Deneme => {
  if (typeof d !== "object" || d === null) return false;
  const x = d as Record<string, unknown>;
  return typeof x.id === "string" && typeof x.tarih === "string" && typeof x.net === "number";
};

/** Kayıtlar yalnızca bu tarayıcıda durur; sunucuya hiçbir şey gitmez. */
export function denemeleriOku(): Deneme[] {
  if (typeof window === "undefined") return [];
  try {
    const ham = window.localStorage.getItem(ANAHTAR);
    if (!ham) return [];
    const veri: unknown = JSON.parse(ham);
    if (!Array.isArray(veri)) return [];
    return veri.filter(gecerli).slice(-ENFAZLA);
  } catch {
    return [];
  }
}

function yaz(liste: Deneme[]) {
  try {
    window.localStorage.setItem(ANAHTAR, JSON.stringify(liste.slice(-ENFAZLA)));
  } catch {
    /* depolama kapalıysa sessiz geç */
  }
}

export function denemeEkle(net: number, not?: string): Deneme[] {
  const yeni: Deneme = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    tarih: new Date().toISOString(),
    net: Math.round(net * 100) / 100,
    ...(not ? { not } : {}),
  };
  const liste = [...denemeleriOku(), yeni].sort((a, b) => a.tarih.localeCompare(b.tarih));
  yaz(liste);
  return liste;
}

export function denemeSil(id: string): Deneme[] {
  const liste = denemeleriOku().filter((d) => d.id !== id);
  yaz(liste);
  return liste;
}

export function denemeleriTemizle(): Deneme[] {
  yaz([]);
  return [];
}

export type Ozet = {
  adet: number;
  ortalama: number;
  son3: number;
  enAz: number;
  enCok: number;
  degisim: number;
};

export function ozetle(liste: Deneme[]): Ozet | null {
  if (liste.length === 0) return null;
  const netler = liste.map((d) => d.net);
  const ort = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
  const son3 = netler.slice(-3);
  return {
    adet: netler.length,
    ortalama: Math.round(ort(netler) * 100) / 100,
    son3: Math.round(ort(son3) * 100) / 100,
    enAz: Math.min(...netler),
    enCok: Math.max(...netler),
    degisim: Math.round((netler[netler.length - 1] - netler[0]) * 100) / 100,
  };
}

export const tarihYazi = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
