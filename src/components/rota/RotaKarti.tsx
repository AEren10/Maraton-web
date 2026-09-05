"use client";

import { DERSLER, toplam, type Netler } from "@/lib/dersler";
import { ButonLink } from "../ui/Buton";
import { olay } from "../Olcum";

export function RotaKarti({
  mevcut,
  artis,
  hedef,
}: {
  mevcut: Netler;
  artis: Netler;
  hedef: number;
}) {
  return (
    <div className="kart overflow-hidden">
      <div className="flex items-baseline justify-between border-b border-[var(--line)] px-6 py-5">
        <span className="etiket">Rota</span>
        <span className="sayi text-[22px]">
          {Math.round(toplam(mevcut))} <span className="text-[var(--text-muted)]">→</span> {hedef}
        </span>
      </div>

      <ul className="px-6 py-4">
        {DERSLER.map((d) => (
          <li key={d.key} className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full" style={{ background: d.renk }} />
              <span className="etiket">{d.ad}</span>
            </span>
            <span className="sayi text-[17px]">
              {mevcut[d.key]} → {mevcut[d.key] + artis[d.key]}
            </span>
          </li>
        ))}
      </ul>

      <div className="px-6 pb-6 pt-2">
        <ButonLink tur="sessiz" className="mt-4 w-full" href="/maraton"
          onClick={() => olay("maraton_cta_tiklandi")}>
          Maraton&apos;da devam et
        </ButonLink>
      </div>

      <p className="border-t border-[var(--line-soft)] px-6 py-4 text-[13px] text-[var(--text-muted)]">
        Bu sonuç rotanın sonu değil. Netlerin değiştikçe dağıtım da değişir.
      </p>
    </div>
  );
}
