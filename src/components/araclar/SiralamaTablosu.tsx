import { SIRALAMA, SIRALAMA_KAYNAK } from "@/data/siralama";

export function SiralamaTablosu() {
  return (
    <div className="kart overflow-hidden">
      <table className="w-full text-left">
        <caption className="sr-only">
          Geçen yılın net değerlerine karşılık gelen yaklaşık sıralama bantları
        </caption>
        <thead>
          <tr className="border-b border-[var(--line)]">
            <th scope="col" className="etiket px-6 py-4">Net</th>
            <th scope="col" className="etiket px-6 py-4 text-right">Yaklaşık sıra</th>
          </tr>
        </thead>
        <tbody>
          {SIRALAMA.map((s) => (
            <tr key={s.net} className="border-b border-[var(--line-soft)] last:border-0">
              <td className="sayi px-6 py-3.5 text-[19px]">{s.net}</td>
              <td className="sayi px-6 py-3.5 text-right text-[19px] text-[var(--text-secondary)]">
                {s.siraYazi}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[var(--line)] px-6 py-4 text-[13px] text-[var(--text-muted)]">
        {SIRALAMA_KAYNAK}
      </p>
    </div>
  );
}
