import Link from "next/link";
import {
  Award,
  Calculator,
  CalendarDays,
  Compass,
  ListOrdered,
  Percent,
  Search,
  Sigma,
  Star,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Arac } from "@/data/araclar";

const IKONLAR: Record<Arac["tur"], LucideIcon> = {
  net: Calculator,
  puan: Percent,
  obp: Award,
  rota: Target,
  tempo: TrendingUp,
  gunsayaci: CalendarDays,
  ortalama: Sigma,
  siralama: ListOrdered,
  bolum: Search,
  tercih: Compass,
};

export function AracKarti({ arac }: { arac: Arac }) {
  const Ikon = IKONLAR[arac.tur];
  return (
    <li>
      <Link
        href={`/${arac.slug}`}
        className="kart kart-arac flex h-full flex-col p-4"
        style={{ ["--aksan" as string]: arac.renk ?? "var(--brand)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="arac-ikon" aria-hidden>
            <Ikon size={18} strokeWidth={2} />
          </span>
          {arac.populer ? (
            <Star
              className="arac-yildiz"
              size={18}
              fill="currentColor"
              strokeWidth={0}
              aria-label="En çok kullanılan araç"
            />
          ) : null}
        </div>

        <h3 className="mt-3 text-[16px] font-semibold">{arac.ad}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          {arac.ozet}
        </p>

        <span
          className="mt-auto flex items-center gap-1.5 pt-3.5 text-[13px] font-medium"
          style={{ color: arac.renk ?? "var(--brand)" }}
        >
          Aç
          <span className="arac-ok" aria-hidden>
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
