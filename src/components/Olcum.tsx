import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ALAN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Ölçüm. Vercel Analytics ve Speed Insights çerez kullanmaz, kişisel veri
 * saklamaz; Plausible ise yalnızca alan adı tanımlıysa devreye girer.
 */
export function Olcum() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      {ALAN ? (
        <Script
          defer
          data-domain={ALAN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
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
