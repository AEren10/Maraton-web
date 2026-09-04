import Link from "next/link";
import { GUVEN_ETIKET, veriBul } from "@/data/kaynak";

/** Aracın altındaki kaynak satırı: veri nereden geliyor, ne kadar kesin. */
export function VeriRozeti({ anahtarlar }: { anahtarlar: string[] }) {
  const kayitlar = anahtarlar.map(veriBul).filter((v) => v !== undefined);
  if (kayitlar.length === 0) return null;

  return (
    <div className="ic-kart mt-6 p-5">
      <p className="etiket">Bu araç neye dayanıyor?</p>
      <ul className="mt-4 flex flex-col gap-4">
        {kayitlar.map((v) => {
          const e = GUVEN_ETIKET[v.guven];
          return (
            <li key={v.anahtar}>
              <p className="flex flex-wrap items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: e.renk }}
                  aria-hidden
                />
                <span className="text-[14px] font-medium">{v.ad}</span>
                <span className="etiket" style={{ color: e.renk }}>
                  {e.ad}
                  {v.yil ? ` · ${v.yil}` : ""}
                </span>
              </p>
              <p className="mt-1.5 pl-4 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                {v.aciklama}
              </p>
              {v.kaynak ? (
                <p className="mt-1 pl-4 text-[12px] text-[var(--text-muted)]">
                  Kaynak: {v.url ? (
                    <a href={v.url} className="baglanti" target="_blank" rel="noopener noreferrer">
                      {v.kaynak}
                    </a>
                  ) : (
                    v.kaynak
                  )}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className="mt-5 border-t border-[var(--line-soft)] pt-4 text-[13px] text-[var(--text-muted)]">
        Geçen yılın verisi bu yılın sonucunu garanti etmez.{" "}
        <Link href="/veriler" className="baglanti">
          Tüm veri kaynakları
        </Link>
      </p>
    </div>
  );
}
