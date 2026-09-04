const SONUMLEME = 0.65;
/** Net kazanmak tavana yaklaştıkça zorlaşır; projeksiyon bu tavana yaklaşır, geçmez. */
const YUMUSAK_TAVAN = 112;
/** Aynı hızı 10 ay sürdüren yok. Uzun ufuklar bu yarı ömürle kısalır. */
const ETKIN_AY = 6;

export type Trend = {
  aylikArtis: number;
  buTempoyla: number;
  tempoArtarsa: number;
  dususOlursa: number;
  kalanAy: number;
};

/** Doğrusal artışı tavana yaklaştıkça sönümleyerek taşır. */
function tasi(mevcut: number, dogrusalKazanc: number) {
  const bosluk = Math.max(YUMUSAK_TAVAN - mevcut, 1);
  const oran = 1 - Math.exp(-Math.max(dogrusalKazanc, 0) / bosluk);
  return mevcut + bosluk * oran;
}

/**
 * Denemelerin eğimini kalan süreye taşır.
 * @param yayilmaHafta ilk denemeden sonuncusuna kaç hafta geçtiği
 */
export function trendCikar(
  denemeler: number[],
  kalanGun: number,
  yayilmaHafta = 6
): Trend {
  const temiz = denemeler.filter((n) => Number.isFinite(n) && n > 0);
  const mevcut = temiz.length ? temiz[temiz.length - 1] : 0;
  const kalanAy = Math.max(kalanGun / 30, 0);
  const gecenAy = Math.max(yayilmaHafta, 1) / 4.345;
  const aylikArtis = temiz.length > 1 ? (mevcut - temiz[0]) / gecenAy : 0;

  const etkinAy = ETKIN_AY * (1 - Math.exp(-kalanAy / ETKIN_AY));
  const dogrusal = aylikArtis * etkinAy * SONUMLEME;

  return {
    aylikArtis: Math.round(aylikArtis * 100) / 100,
    buTempoyla: Math.round(tasi(mevcut, dogrusal)),
    tempoArtarsa: Math.round(tasi(mevcut, Math.max(dogrusal, 3) * 1.6)),
    dususOlursa: Math.round(Math.max(tasi(mevcut, dogrusal * 0.3), mevcut * 0.9)),
    kalanAy: Math.round(kalanAy * 10) / 10,
  };
}
