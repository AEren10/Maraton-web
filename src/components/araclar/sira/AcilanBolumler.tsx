import Link from "next/link";
import type { Bolum } from "@/data/bolumler";
import { bolumSlug } from "@/data/programatik";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * Sıranın yettiği bölümler ve az kalanlar. Sıra sayısı tek başına soyut;
 * karşılığını bölüm adlarıyla görmek gerekiyor.
 */
export function AcilanBolumler({ girer, yakin }: { girer: Bolum[]; yakin: Bolum[] }) {
  if (girer.length === 0 && yakin.length === 0) return null;

  return (
    <div className="border-t border-[var(--line)] p-6 sm:p-8">
      <div className="grid gap-7 sm:grid-cols-2">
        <Sutun baslik={`Sıran yetiyor (${girer.length})`} renk="var(--up)" liste={girer} />
        <Sutun baslik={`Az kalıyor (${yakin.length})`} renk="var(--warn)" liste={yakin} />
      </div>

      <Link href="/tercih-robotu" className="baglanti mt-6 inline-block text-[14px]">
        Listenin tamamını tercih robotunda gör →
      </Link>
    </div>
  );
}

function Sutun({ baslik, renk, liste }: { baslik: string; renk: string; liste: Bolum[] }) {
  return (
    <div>
      <p className="etiket flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: renk }} />
        {baslik}
      </p>

      {liste.length === 0 ? (
        <p className="mt-3 text-[14px] text-[var(--text-muted)]">Bu bantta bölüm yok.</p>
      ) : (
        <ul className="mt-2">
          {liste.slice(0, 6).map((b) => (
            <li key={b.ad} className="border-b border-[var(--line-soft)] py-2.5 last:border-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <Link href={`/bolum/${bolumSlug(b)}`}
                  className="min-w-0 flex-1 text-[15px] hover:text-[var(--brand-light)]">
                  {b.ad}
                </Link>
                <span className="sayi shrink-0 text-[14px]" style={{ color: renk }}>
                  {bicim(b.sonSira)}.
                </span>
              </div>
              <p className="etiket mt-1">{b.alan}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
