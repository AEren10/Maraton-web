"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIzomorfik = typeof window === "undefined" ? useEffect : useLayoutEffect;
const azHareket = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hedef değere yürüyen sayaç.
 * `sifirdan` verildiğinde ilk açılışta 0'dan tırmanır; sunucudan gelen HTML'de
 * gerçek değer durduğu için JavaScript kapalıyken de doğru sayı görünür.
 */
export function Sayac({
  deger,
  sure = 400,
  sifirdan = false,
}: {
  deger: number;
  sure?: number;
  sifirdan?: boolean;
}) {
  const [goster, setGoster] = useState(deger);
  const [hazir, setHazir] = useState(!sifirdan);
  const oncekiRef = useRef(deger);

  useIzomorfik(() => {
    if (hazir) return;
    if (!azHareket()) {
      oncekiRef.current = 0;
      setGoster(0);
    }
    setHazir(true);
  }, [hazir]);

  useEffect(() => {
    if (!hazir) return;
    const bas = oncekiRef.current;
    oncekiRef.current = deger;
    if (azHareket() || bas === deger) {
      setGoster(deger);
      return;
    }
    let ham = 0;
    const t0 = performance.now();
    const adim = (t: number) => {
      const p = Math.min((t - t0) / sure, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setGoster(Math.round(bas + (deger - bas) * e));
      if (p < 1) ham = requestAnimationFrame(adim);
    };
    ham = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(ham);
  }, [deger, sure, hazir]);

  return <>{goster.toLocaleString("tr-TR")}</>;
}
