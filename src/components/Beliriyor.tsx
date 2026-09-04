"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";

/**
 * Görüş alanına girince bir kez beliren sarmalayıcı.
 * Gizleyen sınıf yalnızca istemci tarafında ekleniyor: JavaScript çalışmazsa
 * içerik olduğu gibi görünür kalır.
 */
export function Beliriyor({
  children,
  className = "",
  kademe = false,
  as: Etiket = "div",
}: {
  children: ReactNode;
  className?: string;
  kademe?: boolean;
  as?: "div" | "ul";
}) {
  const ref = useRef<HTMLElement>(null);
  const [durum, setDurum] = useState<"ham" | "gizli" | "gorunur">("ham");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setDurum("gorunur");
      return;
    }
    setDurum("gizli");
    const gozcu = new IntersectionObserver(
      ([giris]) => {
        if (!giris.isIntersecting) return;
        setDurum("gorunur");
        gozcu.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    gozcu.observe(el);
    return () => gozcu.disconnect();
  }, []);

  const hareket =
    durum === "ham" ? "" : `${kademe ? "kademe" : "belir"} ${durum === "gorunur" ? "gorunur" : ""}`;

  return (
    <Etiket ref={ref as Ref<HTMLDivElement & HTMLUListElement>} className={`${hareket} ${className}`}>
      {children}
    </Etiket>
  );
}
