"use client";

import Link from "next/link";
import { useState } from "react";
import { DERSLER, SIFIR, TAVAN, toplam, type Netler } from "@/lib/dersler";
import { BARAJ, obpHesapla, tytPuan, yerlestirmePuani } from "@/lib/puan";
import { netYazi } from "@/lib/net";
import { NetGirisiAlani } from "../ui/NetGirisiAlani";
import { Stat } from "../ui/Kart";
import { Sayac } from "../ui/Sayac";

export function PuanHesaplama() {
  const [netler, setNetler] = useState<Netler>({ ...SIFIR });
  const [diploma, setDiploma] = useState("82");

  const ham = tytPuan(netler);
  const obp = obpHesapla(Number(diploma) || 50);
  const puan = yerlestirmePuani(ham, obp);
  const top = toplam(netler);

  return (
    <div className="kart p-5 sm:p-7">
      <div className="flex flex-col gap-2.5">
        {DERSLER.map((d) => (
          <NetGirisiAlani key={d.key} ad={d.ad} renk={d.renk} tavan={TAVAN[d.key]}
            deger={netler[d.key]}
            onChange={(v) => setNetler((s) => ({ ...s, [d.key]: v }))} />
        ))}
      </div>

      <label className="mt-5 flex items-center justify-between gap-4">
        <span className="etiket">Diploma notu</span>
        <input type="number" inputMode="decimal" value={diploma}
          aria-label="Diploma notu"
          onChange={(e) => setDiploma(e.target.value)}
          className="sayi w-24 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-1.5 text-center text-[19px] outline-none" />
      </label>

      <div className="kart kart-vurgu mt-7 p-5 sm:p-6">
        <p className="etiket">Yaklaşık TYT puanı</p>
        <p className="mt-3 flex items-baseline gap-3">
          <span
            className="sayi text-[clamp(48px,11vw,72px)] leading-none"
            style={{ color: "var(--brand)", textShadow: "0 0 40px var(--brand-glow)" }}
          >
            <Sayac deger={Math.round(puan)} />
          </span>
          <span className="text-[16px] text-[var(--text-secondary)]">
            {puan >= BARAJ ? "baraj geçildi" : `baraja ${netYazi(BARAJ - puan)} var`}
          </span>
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-4">
          <Stat etiket="Toplam net" deger={netYazi(top)} />
          <Stat etiket="OBP katkısı" deger={netYazi(puan - ham)} />
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        {puan >= BARAJ
          ? `${netYazi(puan)} puan ${BARAJ} barajının üstünde, tercih hakkın var.`
          : `${netYazi(puan)} puan ${BARAJ} barajının altında. Yaklaşık 15 net bu eşiği geçiriyor.`}
      </p>

      <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
        ÖSYM puanı standart puanlar üzerinden hesaplanır ve sınav günü tüm adayların
        dağılımına bağlıdır; sınavdan önce kesin sonuç kimse hesaplayamaz. Buradaki sayı
        net başına ortalama katkıya dayanan bir tahmindir: 0 net 100 puana, 120 net 500
        puana denk gelir. OBP katkısı diploma notu × 5 × 0,12.
      </p>

      <Link href="/hedef-net-rotasi" className="btn btn-brand mt-6 w-full">
        Bu puanı yükseltecek rotayı çıkar →
      </Link>
    </div>
  );
}
