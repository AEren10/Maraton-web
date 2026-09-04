"use client";

import { useState } from "react";
import { DERSLER, SIFIR, TAVAN, toplam, type Netler } from "@/lib/dersler";
import { Buton } from "../ui/Buton";
import { NetGirisiAlani } from "../ui/NetGirisiAlani";
import { Sayac } from "../ui/Sayac";

export function NetGirisi({
  hedef,
  baslangic,
  onDevam,
}: {
  hedef: number;
  baslangic?: Netler;
  onDevam: (n: Netler) => void;
}) {
  const [netler, setNetler] = useState<Netler>(baslangic ?? { ...SIFIR });
  const top = toplam(netler);

  return (
    <div className="w-full max-w-[520px]">
      <p className="etiket text-center">Şu an neredesin?</p>
      <p className="mt-3 text-center text-[15px] text-[var(--text-secondary)]">
        Son denemenin ders bazlı netleri yeterli. Hedefin{" "}
        <span className="sayi text-[var(--text)]">{hedef}</span> net.
      </p>

      <div className="mt-8 flex flex-col gap-2.5">
        {DERSLER.map((d) => (
          <NetGirisiAlani
            key={d.key}
            ad={d.ad}
            renk={d.renk}
            tavan={TAVAN[d.key]}
            deger={netler[d.key]}
            onChange={(v) => setNetler((s) => ({ ...s, [d.key]: v }))}
          />
        ))}
      </div>

      <div className="mt-6 flex items-baseline justify-between border-t border-[var(--line)] pt-5">
        <span className="etiket">Toplam</span>
        <span className="sayi text-[44px]">
          <Sayac deger={Math.round(top)} />
        </span>
      </div>

      <Buton
        className="mt-7 w-full"
        disabled={top <= 0}
        onClick={() => onDevam(netler)}
      >
        {top > 0 && top >= hedef ? "Hedefin zaten geride →" : "Farkı gör →"}
      </Buton>
    </div>
  );
}
