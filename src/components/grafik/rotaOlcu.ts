export type Olcu = {
  W: number;
  H: number;
  SOL: number;
  BUGUN_X: number;
  SON_X: number;
  ALT: number;
  UST: number;
  kalinlik: number;
  bayrak: boolean;
  yazi: { eksen: number; etiket: number; sonuc: number };
};

export const GENIS: Olcu = {
  W: 1200, H: 430, SOL: 96, BUGUN_X: 620, SON_X: 940, ALT: 368, UST: 58,
  kalinlik: 4, bayrak: true, yazi: { eksen: 17, etiket: 15, sonuc: 34 },
};

/** Dar ekranda: kısa eksen, orantılı büyük yazı, sonuç bloğu üstte. */
export const DAR: Olcu = {
  W: 460, H: 400, SOL: 46, BUGUN_X: 250, SON_X: 396, ALT: 306, UST: 118,
  kalinlik: 5, bayrak: false, yazi: { eksen: 17, etiket: 15, sonuc: 34 },
};

export const ENAZ = 48;
export const ENCOK = 80;
export const GECMIS = [52, 54, 53, 56, 55, 58, 57, 59, 60];
export const HEDEF = 72;

/** Koreografi: ızgara, alan, çizgi, noktalar, bugün, hedef, varış, eksen. */
export const T = {
  izgara: 0,
  alan: 500,
  cizgi: 560,
  nokta: 700,
  bugun: 1720,
  hedef: 2000,
  varis: 2900,
  bayrak: 3080,
  eksen: 3500,
};

export const ms = (v: number) => `${v}ms`;
