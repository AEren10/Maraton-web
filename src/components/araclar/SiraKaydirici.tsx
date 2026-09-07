"use client";

import { useState } from "react";
import { SIRALAMA_KAYNAK } from "@/data/siralama";
import { tercihListesi } from "@/data/bolumler";
import { obpKatkisi, siraBandi, yksHamPuan, VARSAYILAN_OBP_KATKISI } from "@/lib/yerlestirme";
import { Kaydirici } from "./sira/Kaydirici";
import { ObpGirisi } from "./sira/ObpGirisi";
import { PuanBasligi } from "./sira/PuanBasligi";
import { AcilanBolumler } from "./sira/AcilanBolumler";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * İki oturumu ayrı ayrı sürükleyip sıranın nasıl oynadığını canlı gösterir.
 * "Bu hangi net?" sorusu burada ortadan kalkıyor: TYT ve AYT ayrı çubuklarda.
 */
export function SiraKaydirici() {
  const [tyt, setTyt] = useState(70);
  const [ayt, setAyt] = useState(45);
  const [not, setNot] = useState<number | null>(null);

  const puan = yksHamPuan(tyt, ayt);
  const katki = not === null ? VARSAYILAN_OBP_KATKISI : obpKatkisi(not);
  const { orta, iyi, kotu } = siraBandi(puan, katki);
  const { girer, yakin } = tercihListesi(orta);
  const doluluk = Math.min(Math.max((550 - puan - katki) / 350, 0), 1);

  return (
    <div className="kart overflow-hidden">
      <PuanBasligi sira={orta} puan={puan} obpKatki={katki} doluluk={doluluk} />

      <div className="grid gap-7 border-t border-[var(--line)] p-6 sm:p-8 lg:grid-cols-2">
        <Kaydirici ad="TYT neti" aciklama="120 soru · puanın %40'ı" deger={tyt} tavan={120}
          renk="var(--turkce)" onDegis={setTyt} />
        <Kaydirici ad="AYT neti" aciklama="80 soru · puanın %60'ı" deger={ayt} tavan={80}
          renk="var(--fen)" onDegis={setAyt} />
      </div>

      <div className="grid gap-4 border-t border-[var(--line)] p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <ObpGirisi not={not} onDegis={setNot} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Kutu etiket="İyi giderse" deger={bicim(iyi)} renk="var(--up)" />
          <Kutu etiket="Kötü giderse" deger={bicim(kotu)} renk="var(--down)" />
        </div>
      </div>

      <AcilanBolumler girer={girer} yakin={yakin} />

      <p className="border-t border-[var(--line)] px-6 py-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
        Netler toplanmaz: ham puan = TYT puanı × 0,40 + AYT puanı × 0,60. Diploma notu
        girmezsen ortalama bir katkı (+{VARSAYILAN_OBP_KATKISI} puan) varsayılır.{" "}
        {SIRALAMA_KAYNAK}
      </p>
    </div>
  );
}

function Kutu({ etiket, deger, renk }: { etiket: string; deger: string; renk: string }) {
  return (
    <div className="ic-kart p-5">
      <p className="etiket">{etiket}</p>
      <p className="sayi mt-2 text-[26px]" style={{ color: renk }}>{deger}</p>
    </div>
  );
}
