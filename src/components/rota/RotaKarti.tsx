"use client";

import { useState } from "react";
import { DERSLER, toplam, type Netler } from "@/lib/dersler";
import { rotaQuery } from "@/lib/url";
import { Buton, ButonLink } from "../ui/Buton";
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
  const [durum, setDurum] = useState<"hazir" | "kopyalandi">("hazir");
  const link = `https://maratonapp.com/rota?${rotaQuery(hedef, mevcut)}`;

  const paylas = async () => {
    olay("rota_paylasildi", { hedef });
    const metin = `${Math.round(toplam(mevcut))} → ${hedef} net. Rotam burada:`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Rotam", text: metin, url: link });
        return;
      } catch {
        /* kullanıcı vazgeçti */
      }
    }
    await navigator.clipboard?.writeText(link);
    setDurum("kopyalandi");
    setTimeout(() => setDurum("hazir"), 2200);
  };

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

      <div className="flex flex-col gap-3 px-6 pb-6 pt-2 sm:flex-row">
        <Buton className="flex-1" onClick={paylas}>
          {durum === "kopyalandi" ? "Bağlantı kopyalandı" : "Rotamı paylaş"}
        </Buton>
        <ButonLink tur="sessiz" className="flex-1" href="/maraton"
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
