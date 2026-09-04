import { SSS } from "@/data/sss";

export function SSSListesi({ adet = SSS.length }: { adet?: number }) {
  return (
    <div className="kart divide-y divide-[var(--line-soft)] overflow-hidden">
      {SSS.slice(0, adet).map((s) => (
        <details key={s.soru} className="group px-6 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium marker:hidden">
            {s.soru}
            <span
              aria-hidden
              className="shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-8 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            {s.cevap}
          </p>
        </details>
      ))}
    </div>
  );
}
