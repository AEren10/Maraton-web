"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RotaAkisi } from "./RotaAkisi";

function Ic({ kalanGun }: { kalanGun: number }) {
  const sp = useSearchParams();
  const h = Number(sp.get("h"));
  const gecerli = Number.isFinite(h) && h >= 10 && h <= 120;
  return <RotaAkisi kalanGun={kalanGun} baslangicHedef={gecerli ? h : undefined} />;
}

/** Araç sayfası statik kalsın diye hedef parametresi tarayıcıda okunur. */
export function RotaAkisiUrl({ kalanGun }: { kalanGun: number }) {
  return (
    <Suspense fallback={<RotaAkisi kalanGun={kalanGun} />}>
      <Ic kalanGun={kalanGun} />
    </Suspense>
  );
}
