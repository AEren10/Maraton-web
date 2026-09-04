/** YKS 2027 oturumunun tahmini tarihi. Kesin tarih ÖSYM takviminde açıklanır. */
export const SINAV_TARIHI = new Date("2027-06-19T10:15:00+03:00");
export const SINAV_YILI = 2027;

export function kalanGun(bugun: Date = new Date()) {
  const ms = SINAV_TARIHI.getTime() - bugun.getTime();
  return Math.max(Math.ceil(ms / 86400000), 0);
}

export const kalanHafta = (gun: number) => Math.round((gun / 7) * 10) / 10;
