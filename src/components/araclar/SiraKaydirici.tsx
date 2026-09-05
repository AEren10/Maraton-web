"use client";

import Link from "next/link";
import { useState } from "react";
import { SIRALAMA_KAYNAK } from "@/data/siralama";
import { tercihListesi } from "@/data/bolumler";
import { bolumSlug } from "@/data/programatik";
import { siraBandi, yksHamPuan, VARSAYILAN_OBP_KATKISI } from "@/lib/yerlestirme";
import { Sayac } from "../ui/Sayac";
import { Kaydirici } from "./sira/Kaydirici";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * İki oturumu ayrı ayrı sürükleyip sıranın nasıl oynadığını canlı gösterir.
 * Tablonun cevaplayamadığı "bu hangi net?" sorusu burada ortadan kalkıyor:
 * TYT ve AYT ayrı çubuklarda duruyor.
 */
export function SiraKaydirici() {
  const [tyt, setTyt] = useState(70);
  const [ayt, setAyt] = useState(45);

  const puan = yksHamPuan(tyt, ayt);
  const { orta, iyi, kotu } = siraBandi(puan);
  const { girer } = tercihListesi(orta);
  const doluluk = Math.min(Math.max((550 - puan - VARSAYILAN_OBP_KATKISI) / 350, 0), 1);

  return (
    <div className="kart overflow-hidden">
      <div className="sira-sahne p-6 text-center sm:p-10">
        <p className="etiket">Bu netlerin 2025 sıra karşılığı</p>
        <p className="mt-4 leading-none">
          <span
            className="sayi block text-[clamp(52px,14vw,116px)] leading-[0.9]"
            style={{ color: "var(--brand)", textShadow: "0 0 60px var(--brand-glow)" }}
          >
            <Sayac deger={orta} sure={450} />
          </span>
          <span className="etiket mt-3 block">yaklaşık başarı sırası</span>
        </p>

        <div className="sira-hat mt-7" style={{ ["--yer" as string]: `${doluluk * 100}%` }}>
          <span className="sira-hat-dolu" />
          <span className="sira-hat-nokta" />
        </div>
        <p className="mt-3 text-[13px] text-[var(--text-secondary)]">
          {bicim(Math.round(puan))} ham puan
          <span className="text-[var(--text-muted)]"> · OBP hariç</span>
        </p>
      </div>

      <div className="grid gap-7 border-t border-[var(--line)] p-6 sm:p-8 lg:grid-cols-2">
        <Kaydirici ad="TYT neti" aciklama="120 soru · puanın %40'ı" deger={tyt} tavan={120}
          renk="var(--turkce)" onDegis={setTyt} />
        <Kaydirici ad="AYT neti" aciklama="80 soru · puanın %60'ı" deger={ayt} tavan={80}
          renk="var(--fen)" onDegis={setAyt} />
      </div>

      <div className="grid gap-4 border-t border-[var(--line)] p-6 sm:grid-cols-3 sm:p-8">
        {[
          ["İyi giderse", bicim(iyi), "var(--up)"],
          ["Kötü giderse", bicim(kotu), "var(--down)"],
          ["Açılan bölüm", String(girer.length), "var(--text)"],
        ].map(([etiket, deger, renk]) => (
          <div key={etiket} className="ic-kart p-4">
            <p className="etiket">{etiket}</p>
            <p className="sayi mt-2 text-[24px]" style={{ color: renk }}>{deger}</p>
          </div>
        ))}
      </div>

      {girer.length > 0 ? (
        <div className="border-t border-[var(--line)] p-6 sm:p-8">
          <p className="etiket">Bu sırayla açılanlardan bazıları</p>
          <div className="serit mt-3 w-full">
            {girer.slice(0, 8).map((b) => (
              <Link key={b.ad} href={`/bolum/${bolumSlug(b)}`}
                className="kucuk-btn etiket rounded-full border border-[var(--line)] px-3 py-1.5">
                {b.ad}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <p className="border-t border-[var(--line)] px-6 py-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
        Netler toplanmaz: ham puan = TYT puanı × 0,40 + AYT puanı × 0,60. Sıra için
        ortalama bir diploma katkısı (+{VARSAYILAN_OBP_KATKISI} puan) varsayıldı;
        OBP × 0,12 ile en fazla 60 puan eklenebilir. {SIRALAMA_KAYNAK}
      </p>
    </div>
  );
}
