"use client";

import { useState } from "react";
import { Buton } from "../ui/Buton";

export function HedefAdimi({ onDevam }: { onDevam: (hedef: number) => void }) {
  const [deger, setDeger] = useState("");
  const sayi = Number(deger);
  const gecerli = Number.isFinite(sayi) && sayi >= 10 && sayi <= 120;

  return (
    <form
      className="flex flex-col items-center text-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (gecerli) onDevam(Math.round(sayi));
      }}
    >
      <h1 className="etiket">Kaç net istiyorsun?</h1>
      <input
        type="number"
        inputMode="numeric"
        min={10}
        max={120}
        value={deger}
        placeholder="72"
        aria-label="Hedef net"
        onChange={(e) => setDeger(e.target.value.slice(0, 3))}
        className="sayi hero-sayi mt-6 w-full max-w-[420px] bg-transparent text-center outline-none placeholder:text-[var(--surface-elevated)]"
      />
      <p className="mt-8 max-w-[460px] text-[17px] text-[var(--text-secondary)]">
        Hedef bir sayı değil. Oraya giden bir rota var.
      </p>
      <Buton type="submit" disabled={!gecerli} className="mt-8 w-full max-w-[320px]">
        Rotamı çıkar →
      </Buton>
      <p className="mt-4 text-[13px] text-[var(--text-muted)]">
        E-posta yok, kayıt yok. 60 saniye.
      </p>
    </form>
  );
}
