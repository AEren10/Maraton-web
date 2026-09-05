"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALANLAR, BOLUM_KAYNAK, tercihListesi, type Alan, type Bolum } from "@/data/bolumler";
import { puandanSira, yksHamPuan } from "@/lib/yerlestirme";
import { bolumSlug } from "@/data/programatik";
import { TercihNetGirisi } from "./tercih/NetGirisi";
import { PuanPaneli } from "./PuanPaneli";

const SUZGECLER: ("Hepsi" | Alan)[] = ["Hepsi", ...ALANLAR];
const bicim = (n: number) => n.toLocaleString("tr-TR");

function Satir({ b, girer }: { b: Bolum; girer: boolean }) {
  return (
    <li className="border-b border-[var(--line-soft)] py-3.5 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link href={`/bolum/${bolumSlug(b)}`}
          className="min-w-0 flex-1 text-[15px] hover:text-[var(--brand-light)]">
          {b.ad}
        </Link>
        <span className="sayi shrink-0 text-[15px]"
          style={{ color: girer ? "var(--up)" : "var(--down)" }}>
          {bicim(b.ustSira)} – {bicim(b.sonSira)}
        </span>
      </div>
      <p className="etiket mt-1.5">
        {b.alan}
        {b.ustPuan ? ` · en üst taban ${b.ustPuan} (${b.ustOrnek})` : ""}
      </p>
    </li>
  );
}

export function TercihRobotu() {
  const [tyt, setTyt] = useState("70");
  const [ayt, setAyt] = useState("");
  const [suzgec, setSuzgec] = useState<(typeof SUZGECLER)[number]>("Hepsi");

  const sayi = (v: string) => {
    const n = Number(v.replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };
  const tytNet = sayi(tyt);
  const aytNet = sayi(ayt);
  const puan = useMemo(() => yksHamPuan(tytNet, aytNet), [tytNet, aytNet]);
  const sira = useMemo(() => puandanSira(puan), [puan]);
  const { girer, yakin } = useMemo(() => tercihListesi(sira), [sira]);
  const suz = (l: Bolum[]) => (suzgec === "Hepsi" ? l : l.filter((b) => b.alan === suzgec));

  return (
    <div className="kart p-5 sm:p-7">
      <TercihNetGirisi tyt={tyt} ayt={ayt} onTyt={setTyt} onAyt={setAyt} />

      <PuanPaneli tytNet={tytNet} aytNet={aytNet} />

      <div className="mt-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p className="etiket shrink-0">Bu sırayla girilebilenler ({suz(girer).length})</p>
          <div className="serit w-full sm:w-auto">
            {SUZGECLER.map((a) => (
              <button key={a} onClick={() => setSuzgec(a)}
                className="kucuk-btn etiket rounded-full border px-3 py-1.5"
                style={{
                  borderColor: suzgec === a ? "var(--brand)" : "var(--line)",
                  color: suzgec === a ? "var(--text)" : "var(--text-muted)",
                }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-3">
          {suz(girer).slice(0, 14).map((b) => (
            <Satir key={b.ad} b={b} girer />
          ))}
          {suz(girer).length === 0 ? (
            <li className="py-3 text-[14px] text-[var(--text-muted)]">
              Bu netle listedeki bölümlere sıra yetmiyor. Aşağıdaki listeye bak.
            </li>
          ) : null}
        </ul>
      </div>

      {suz(yakin).length > 0 ? (
        <div className="mt-7 border-t border-[var(--line)] pt-6">
          <p className="etiket">Yakın duranlar ({suz(yakin).length})</p>
          <ul className="mt-3">
            {suz(yakin).slice(0, 8).map((b) => (
              <Satir key={b.ad} b={b} girer={false} />
            ))}
          </ul>
        </div>
      ) : null}

      <Link href={`/hedef-net-rotasi?h=${Math.min(Math.round(tytNet) + 12, 120)}`}
        className="btn btn-brand mt-6 w-full">
        Bu listeyi bir üst banda taşıyacak rotayı çıkar →
      </Link>

      <p className="mt-5 text-[12px] leading-relaxed text-[var(--text-muted)]">
        Bu bir tercih listesi değil, bir yön göstergesi. {BOLUM_KAYNAK} Kesin tercih için
        YÖK Atlas&apos;taki program bazlı verilere bak.
      </p>
    </div>
  );
}
