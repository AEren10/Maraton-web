import { KEYS, Netler, SIFIR } from "./dersler";

const KISA: Record<string, string> = {
  turkce: "t",
  matematik: "m",
  sosyal: "s",
  fen: "f",
};

export function rotaQuery(hedef: number, mevcut: Netler) {
  const p = new URLSearchParams({ h: String(Math.round(hedef)) });
  for (const k of KEYS) p.set(KISA[k], String(Math.round(mevcut[k])));
  return p.toString();
}

type Ham = Record<string, string | string[] | undefined>;
const oku = (v: string | string[] | undefined, varsayilan: number) => {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) ? n : varsayilan;
};

export function rotaParse(sp: Ham) {
  const mevcut: Netler = { ...SIFIR };
  for (const k of KEYS) mevcut[k] = Math.max(oku(sp[KISA[k]], 0), 0);
  return { hedef: Math.max(oku(sp.h, 0), 0), mevcut };
}
