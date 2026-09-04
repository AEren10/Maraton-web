"use client";

import { useState } from "react";
import { Download, Link2, Share2 } from "lucide-react";
import { storyKarti, type PaylasimVerisi } from "@/lib/paylasim";
import { olay } from "./Olcum";

type Durum = "hazir" | "kopyalandi" | "hazirlaniyor";

export function PaylasKutusu({ veri, kaynak }: { veri: PaylasimVerisi; kaynak: string }) {
  const [durum, setDurum] = useState<Durum>("hazir");

  const paylas = async () => {
    olay("sonuc_paylasildi", { kaynak });
    if (navigator.share) {
      try {
        await navigator.share({ title: "Maraton", text: veri.metin, url: veri.url });
        return;
      } catch {
        /* kullanıcı vazgeçti */
      }
    }
    await kopyala();
  };

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(`${veri.metin} ${veri.url}`);
      setDurum("kopyalandi");
      setTimeout(() => setDurum("hazir"), 2200);
      olay("sonuc_linki_kopyalandi", { kaynak });
    } catch {
      /* pano kapalıysa sessiz geç */
    }
  };

  const kartIndir = async () => {
    setDurum("hazirlaniyor");
    const blob = await storyKarti(veri);
    setDurum("hazir");
    if (!blob) return;
    const adres = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = adres;
    a.download = `maraton-${kaynak}.png`;
    a.click();
    URL.revokeObjectURL(adres);
    olay("story_karti_indirildi", { kaynak });
  };

  const dugme =
    "btn btn-sessiz flex-1 justify-center gap-2 px-4 py-3 text-[14px] whitespace-nowrap";

  return (
    <div className="kart mt-6 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="etiket">Sonucu paylaş</p>
        <p className="text-[13px] text-[var(--text-muted)]">
          Bağlantı aynı sonucu açar
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button onClick={paylas} className="btn btn-brand flex-1 justify-center gap-2 px-4 py-3 text-[14px]">
          <Share2 size={16} aria-hidden />
          Paylaş
        </button>
        <button onClick={kopyala} className={dugme}>
          <Link2 size={16} aria-hidden />
          {durum === "kopyalandi" ? "Kopyalandı" : "Bağlantıyı kopyala"}
        </button>
        <button onClick={kartIndir} className={dugme} disabled={durum === "hazirlaniyor"}>
          <Download size={16} aria-hidden />
          {durum === "hazirlaniyor" ? "Hazırlanıyor…" : "Story kartı"}
        </button>
      </div>

      <p className="mt-3.5 text-[12px] leading-relaxed text-[var(--text-muted)]">
        Story kartı 1080×1920 boyutunda iniyor; Instagram ve WhatsApp hikâyesine olduğu
        gibi konur.
      </p>
    </div>
  );
}
