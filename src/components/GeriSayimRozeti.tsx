"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Sayac } from "./ui/Sayac";
import { SINAV_TARIHI, SINAV_YILI } from "@/lib/sinav";

const useIzomorfik = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Hero'nun sağ üstündeki geri sayım. Sıfırdan tırmanır. */
export function GeriSayimRozeti({ kalanGun }: { kalanGun: number }) {
  const hafta = Math.round(kalanGun / 7);
  const gecen = Math.min(Math.max(1 - kalanGun / 365, 0), 1);
  const [oran, setOran] = useState(gecen);

  // Sunucudan dolu gelir; tarayıcıda boyamadan önce sıfırlanıp sayaçla birlikte dolar.
  useIzomorfik(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOran(0);
    const ham = requestAnimationFrame(() => setOran(gecen));
    return () => cancelAnimationFrame(ham);
  }, [gecen]);

  const tarih = SINAV_TARIHI.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="shrink-0 sm:w-[248px] sm:text-right">
      <p className="etiket">YKS {SINAV_YILI}&apos;ye kalan</p>

      <p className="gerisayim mt-1 flex items-baseline gap-2 sm:justify-end">
        <span className="sayi sayi-gradyan text-[clamp(56px,10vw,112px)] leading-[0.82]">
          <Sayac deger={kalanGun} sure={1400} sifirdan />
        </span>
        <span className="etiket pb-2">gün</span>
      </p>

      <div className="segment mt-4" style={{ color: "var(--brand)" }} aria-hidden>
        <span
          style={{
            transform: `scaleX(${oran})`,
            transitionDuration: "1300ms",
            boxShadow: "0 0 12px var(--brand-glow)",
          }}
        />
      </div>

      <p className="mt-3 text-[13px] text-[var(--text-muted)]">
        {hafta.toLocaleString("tr-TR")} hafta · {tarih}
      </p>
    </div>
  );
}
