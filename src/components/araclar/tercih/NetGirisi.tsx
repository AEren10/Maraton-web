"use client";

const KUTU =
  "sayi w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-3 text-center text-[26px] outline-none focus:border-[rgba(255,255,255,0.3)]";

/**
 * Sıralama TYT ve AYT toplamından çıkar. İki oturumu ayrı sormak,
 * "hangi net" sorusunu ortadan kaldırıyor.
 */
export function TercihNetGirisi({
  tyt,
  ayt,
  onTyt,
  onAyt,
  toplam,
}: {
  tyt: string;
  ayt: string;
  onTyt: (v: string) => void;
  onAyt: (v: string) => void;
  toplam: number;
}) {
  return (
    <div>
      <p className="etiket">Netlerin</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Sıralama iki oturumun toplamından çıkıyor. Sadece TYT netini bilsen de girebilirsin,
        AYT boş kalırsa hesap yalnızca TYT üzerinden yapılır.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
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

        <div className="col-span-2 flex items-baseline gap-3 border-t border-[var(--line)] pt-4 sm:col-span-1 sm:border-0 sm:pt-0 sm:pb-7">
          <span className="etiket">Toplam</span>
          <span className="sayi text-[30px]" style={{ color: "var(--brand)" }}>
            {toplam.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}
          </span>
          <span className="etiket">net</span>
        </div>
      </div>
    </div>
  );
}
