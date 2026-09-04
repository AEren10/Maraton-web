import type { Satir } from "@/data/aracIcerik";

export function TekBakista({ satirlar }: { satirlar: Satir[] }) {
  return (
    <div className="kart overflow-hidden">
      <p className="etiket border-b border-[var(--line)] px-6 py-4">Tek bakışta</p>
      <dl>
        {satirlar.map(([ad, deger]) => (
          <div
            key={ad}
            className="grid grid-cols-1 gap-1 border-b border-[var(--line-soft)] px-6 py-3.5 last:border-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="text-[14px] text-[var(--text-muted)]">{ad}</dt>
            <dd className="text-[15px] font-medium">{deger}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
