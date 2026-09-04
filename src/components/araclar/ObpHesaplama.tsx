"use client";

import Link from "next/link";
import { useState } from "react";
import { OBP_CARPAN, obpHesapla } from "@/lib/puan";
import { sayiYazi } from "@/lib/net";
import { Sayac } from "../ui/Sayac";
import { Stat } from "../ui/Kart";
import { PaylasKutusu } from "../PaylasKutusu";

export function ObpHesaplama() {
  const [diploma, setDiploma] = useState("82");
  const [yerlesti, setYerlesti] = useState(false);

  const not = Math.min(Math.max(Number(diploma) || 0, 0), 100);
  const obp = obpHesapla(not);
  const katki = obp * OBP_CARPAN * (yerlesti ? 0.5 : 1);

  return (
    <div className="kart p-5 sm:p-7">
      <label className="block">
        <span className="etiket block">Diploma notun</span>
        <input
          type="number"
          inputMode="decimal"
          min={50}
          max={100}
          value={diploma}
          aria-label="Diploma notu"
          onChange={(e) => setDiploma(e.target.value)}
          className="giris sayi mt-2 text-center text-[32px]"
        />
      </label>

      <label className="ic-kart mt-4 flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
        <span className="text-[14px] text-[var(--text-secondary)]">
          Geçen yıl bir yükseköğretim programına yerleştim
        </span>
        <input
          type="checkbox"
          checked={yerlesti}
          onChange={(e) => setYerlesti(e.target.checked)}
          className="h-5 w-5 shrink-0 accent-[var(--brand)]"
        />
      </label>

      <div className="kart kart-vurgu mt-7 p-5 sm:p-6">
        <p className="etiket">Puanına eklenecek</p>
        <p className="mt-3 flex items-baseline gap-3">
          <span
            className="sayi text-[clamp(48px,11vw,72px)] leading-none"
            style={{ color: "var(--brand)", textShadow: "0 0 40px var(--brand-glow)" }}
          >
            +<Sayac deger={Math.round(katki)} />
          </span>
          <span className="text-[16px] text-[var(--text-secondary)]">puan</span>
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-4">
          <Stat etiket="OBP" deger={sayiYazi(obp)} not="diploma notu × 5" />
          <Stat etiket="Katsayı" deger={yerlesti ? "0,06" : "0,12"}
            not={yerlesti ? "yarıya iner" : "tam uygulanır"} />
        </div>
      </div>

      <div className="metin mt-6 text-[14px]">
        <p>
          Diploma notu 5 ile çarpılır, çıkan sayı OBP&apos;dir; 50 not 250, 100 not 500 OBP
          eder. Yerleştirme puanına OBP&apos;nin 0,12&apos;si eklenir. Yani 100 diploma notu
          ile 50 diploma notu arasındaki fark 30 puan.
        </p>
        <p>
          Geçen yıl bir programa yerleşip bu yıl tekrar giriyorsan katkı yarıya iner: 0,06.
          Kayıt sildirmek bu durumu değiştirmez.
        </p>
      </div>

      <PaylasKutusu
        kaynak="obp"
        veri={{
          arac: "OBP hesaplama",
          anaSayi: `+${Math.round(katki)}`,
          anaEtiket: "puana eklenen",
          satirlar: [
            ["Diploma notu", diploma],
            ["OBP", sayiYazi(obp)],
            ["Katsayı", yerlesti ? "0,06" : "0,12"],
          ],
          url: "https://maratonapp.com/obp-hesaplama",
          metin: `Diploma notumun puanıma katkısı ${Math.round(katki)} puan.`,
        }}
      />

      <Link href="/tyt-puan-hesaplama" className="btn btn-brand mt-6 w-full">
        Netlerinle birlikte puanını hesapla →
      </Link>
    </div>
  );
}
