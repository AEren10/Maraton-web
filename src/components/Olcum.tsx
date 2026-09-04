import Script from "next/script";

const ALAN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/** Çerezsiz sayaç. Alan adı tanımlı değilse hiçbir istek çıkmaz. */
export function Olcum() {
  if (!ALAN) return null;
  return (
    <Script
      defer
      data-domain={ALAN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

/** Ölçüm olayları: hedef_girildi, netler_girildi, fark_goruldu, rota_paylasildi... */
export function olay(ad: string, veri?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    plausible?: (a: string, o?: { props: Record<string, string | number> }) => void;
  };
  w.plausible?.(ad, veri ? { props: veri } : undefined);
}
