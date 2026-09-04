"use client";

import { useState } from "react";
import { Sayac } from "../ui/Sayac";
import { PaylasKutusu } from "../PaylasKutusu";
import { tempo } from "@/lib/tempo";
import { sayiYazi } from "@/lib/net";

export function GeriSayim({ kalanGun }: { kalanGun: number }) {
  const [mevcut, setMevcut] = useState("54");
  const [hedef, setHedef] = useState("72");
  const fark = Math.max(Number(hedef) - Number(mevcut), 0);
  const t = tempo(fark, kalanGun);
  const hafta = Math.round((kalanGun / 7) * 10) / 10;

  const alan =
    "sayi w-20 rounded-[10px] border border-[var(--line)] bg-[var(--surface-elevated)] px-2 py-1.5 text-center text-[19px] outline-none";

  return (
    <div className="kart p-5 sm:p-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="etiket">Kalan</p>
          <p className="sayi bolum-sayi mt-2">
            <Sayac deger={kalanGun} /> <span className="text-[var(--text-muted)]">gün</span>
          </p>
          <p className="mt-2 text-[13px] text-[var(--text-muted)]">{sayiYazi(hafta)} hafta</p>
        </div>
        <div>
          <p className="etiket">Hedef farkı</p>
          <p className="sayi bolum-sayi mt-2" style={{ color: "var(--brand)" }}>
            +<Sayac deger={Math.round(fark)} />
          </p>
          <p className="mt-2 text-[13px] text-[var(--text-muted)]">net</p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-t border-[var(--line)] pt-6 sm:flex sm:flex-wrap">
        <span className="etiket">Şu an</span>
        <input type="number" inputMode="numeric" className={`${alan} w-full sm:w-20`} value={mevcut}
          aria-label="Mevcut net" onChange={(e) => setMevcut(e.target.value)} />
        <span className="etiket">Hedef</span>
        <input type="number" inputMode="numeric" className={`${alan} w-full sm:w-20`} value={hedef}
          aria-label="Hedef net" onChange={(e) => setHedef(e.target.value)} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <dt className="etiket">Ayda gereken</dt>
          <dd className="sayi kart-sayi mt-1">{sayiYazi(t.aylik)}</dd>
        </div>
        <div>
          <dt className="etiket">Haftada gereken</dt>
          <dd className="sayi kart-sayi mt-1">{sayiYazi(t.haftalik)}</dd>
        </div>
      </dl>

      <PaylasKutusu
        kaynak="geri-sayim"
        veri={{
          arac: "YKS geri sayım",
          anaSayi: String(kalanGun),
          anaEtiket: "gün kaldı",
          satirlar: [
            ["Hedef farkı", `${Math.round(fark)} net`],
            ["Ayda gereken", `${sayiYazi(t.aylik)} net`],
            ["Haftada gereken", `${sayiYazi(t.haftalik)} net`],
            ["Kalan hafta", sayiYazi(hafta)],
          ],
          url: "https://maratonapp.com/yks-kac-gun-kaldi",
          metin: `YKS'ye ${kalanGun} gün kaldı. Hedefime ${Math.round(fark)} net var.`,
        }}
      />

      <p className="mt-6 text-[15px] text-[var(--text-secondary)]">
        Haftada yarım net. Söylenince küçük, {sayiYazi(hafta)} hafta üst üste yapınca {Math.round(fark)}.
      </p>
    </div>
  );
}
