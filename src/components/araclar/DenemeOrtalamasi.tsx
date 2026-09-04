"use client";

import Link from "next/link";
import { useState } from "react";
import { netYazi } from "@/lib/net";
import { Stat } from "../ui/Kart";

export function DenemeOrtalamasi() {
  const [ham, setHam] = useState("58, 62, 61, 67, 65");
  const sayilar = ham
    .split(/[\s,;\n]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);

  const ort = sayilar.length ? sayilar.reduce((a, b) => a + b, 0) / sayilar.length : 0;
  const enAz = sayilar.length ? Math.min(...sayilar) : 0;
  const enCok = sayilar.length ? Math.max(...sayilar) : 0;
  const son3 = sayilar.slice(-3);
  const son3Ort = son3.length ? son3.reduce((a, b) => a + b, 0) / son3.length : 0;

  return (
    <div className="kart p-5 sm:p-7">
      <label className="block">
        <span className="etiket block">Deneme netlerin</span>
        <textarea
          className="giris sayi mt-2 h-24 resize-none text-[19px]"
          value={ham}
          aria-label="Deneme netleri"
          onChange={(e) => setHam(e.target.value)}
        />
      </label>
      <p className="mt-2 text-[13px] text-[var(--text-muted)]">
        Aralarına virgül koy. {sayilar.length} deneme okundu.
      </p>

      {sayilar.length > 0 ? (
        <>
          <div className="mt-7 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-4">
            <Stat etiket="Ortalama" deger={netYazi(ort)} />
            <Stat etiket="Son 3" deger={netYazi(son3Ort)} />
            <Stat etiket="En düşük" deger={netYazi(enAz)} renk="var(--down)" />
            <Stat etiket="En yüksek" deger={netYazi(enCok)} renk="var(--up)" />
          </div>

          <p className="mt-6 text-[15px] text-[var(--text-secondary)]">
            Denemelerin {netYazi(enCok - enAz)} net aralıkta oynuyor. Referansın en yüksek
            denemen değil, son üçünün ortalaması: {netYazi(son3Ort)}.
          </p>

          <Link href="/hedef-net-rotasi" className="btn btn-brand mt-6 w-full">
            {netYazi(son3Ort)}&apos;ten hedefime rotamı çıkar →
          </Link>
        </>
      ) : null}
    </div>
  );
}
