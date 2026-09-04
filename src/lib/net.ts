/** YKS net formülü: dört yanlış bir doğruyu götürür. */
export const net = (dogru: number, yanlis: number) =>
  Math.round((dogru - yanlis / 4) * 100) / 100;

export const netYazi = (n: number) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const sayiYazi = (n: number) =>
  Math.round(n * 100) / 100 === Math.round(n)
    ? String(Math.round(n))
    : n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
