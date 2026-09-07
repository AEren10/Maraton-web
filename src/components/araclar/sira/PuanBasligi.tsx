"use client";

import { Sayac } from "../../ui/Sayac";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * Sahnenin tamamını kaplayan sıra sayısı. Yazı boyutu kabın genişliğine
 * (cqw) bağlı, piksele değil: dar sütunda da tek satırda kalıyor.
 */
export function PuanBasligi({
  sira,
  puan,
  obpKatki,
  doluluk,
}: {
  sira: number;
  puan: number;
  obpKatki: number;
  doluluk: number;
}) {
  return (
    <div className="sira-sahne p-6 text-center sm:p-10">
      <p className="etiket">Bu netlerin 2025 sıra karşılığı</p>

      <p className="dev-sayi sayi mt-4" style={{ color: "var(--brand)" }}>
        <Sayac deger={sira} sure={450} />
      </p>
      <p className="etiket mt-2">yaklaşık başarı sırası</p>

      <div className="sira-hat mx-auto mt-8 max-w-[560px]"
        style={{ ["--yer" as string]: `${doluluk * 100}%` }}>
        <span className="sira-hat-dolu" />
        <span className="sira-hat-nokta" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[14px]">
        <span className="sayi text-[var(--text)]">{bicim(Math.round(puan))}</span>
        <span className="text-[var(--text-secondary)]">ham puan</span>
        <span className="text-[var(--text-muted)]">
          + {bicim(Math.round(obpKatki))} diploma katkısı = {bicim(Math.round(puan + obpKatki))} yerleştirme
        </span>
      </div>
    </div>
  );
}
