import Link from "next/link";
import { aracBul } from "@/data/araclar";

export function IlgiliAraclar({ slugler }: { slugler: string[] }) {
  const araclar = slugler.map(aracBul).filter((a) => a !== undefined);
  if (araclar.length === 0) return null;

  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-3">
      {araclar.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/${a.slug}`}
            className="kart kart-arac flex h-full flex-col p-4"
            style={{ ["--aksan" as string]: a.renk ?? "var(--brand)" }}
          >
            <span className="text-[15px] font-medium">{a.ad}</span>
            <span className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
              {a.ozet}
            </span>
            <span
              className="arac-ok mt-3 text-[13px] font-medium"
              style={{ color: a.renk ?? "var(--brand)" }}
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
