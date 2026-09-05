"use client";

const KUTU =
  "sayi w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-3 text-center text-[26px] outline-none focus:border-[rgba(255,255,255,0.3)]";

/**
 * İki oturumun neti toplanmaz; sıralama TYT × 0,40 + AYT × 0,60
 * ağırlığıyla bulunan ham puandan çıkar.
 */
export function TercihNetGirisi({
  tyt,
  ayt,
  onTyt,
  onAyt,
}: {
  tyt: string;
  ayt: string;
  onTyt: (v: string) => void;
  onAyt: (v: string) => void;
}) {
  return (
    <div>
      <p className="etiket">Netlerin</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Netler toplanmaz: ÖSYM TYT&apos;yi %40, AYT&apos;yi %60 ağırlıkla puana çevirir.
        Sadece TYT netini bilsen de girebilirsin, ama AYT boş kalırsa puan olduğundan
        çok daha düşük çıkar.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="etiket block">TYT neti</span>
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={tyt}
            placeholder="örn. 70"
            aria-label="TYT neti"
            onChange={(e) => onTyt(e.target.value)}
            className={`${KUTU} mt-2`}
          />
          <span className="mt-1.5 block text-[12px] text-[var(--text-muted)]">120 soru</span>
        </label>

        <label className="block">
          <span className="etiket block">AYT neti</span>
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={ayt}
            placeholder="örn. 45"
            aria-label="AYT neti"
            onChange={(e) => onAyt(e.target.value)}
            className={`${KUTU} mt-2`}
          />
          <span className="mt-1.5 block text-[12px] text-[var(--text-muted)]">80 soru</span>
        </label>

      </div>
    </div>
  );
}
