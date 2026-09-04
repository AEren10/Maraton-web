"use client";

import { Buton } from "../ui/Buton";
import { Sayac } from "../ui/Sayac";
import { RotaCizgisi } from "../grafik/RotaCizgisi";

export function FarkEkrani({
  mevcut,
  hedef,
  onDevam,
}: {
  mevcut: number;
  hedef: number;
  onDevam: () => void;
}) {
  const fark = Math.round(hedef - mevcut);

  return (
    <div className="w-full max-w-[560px] text-center">
      <p className="sayi hero-sayi" style={{ color: fark > 0 ? "var(--text)" : "var(--up)" }}>
        {fark > 0 ? "+" : ""}
        <Sayac deger={fark} />
      </p>
      <p className="etiket mt-4">Hedef farkı</p>

      <div className="mt-12">
        <RotaCizgisi bas={Math.round(mevcut)} son={Math.round(hedef)} />
      </div>

      <Buton className="mt-12 w-full max-w-[360px]" onClick={onDevam}>
        {fark > 0 ? `Bu ${fark} net nereden gelecek?` : "Dağılıma bak →"}
      </Buton>
    </div>
  );
}
