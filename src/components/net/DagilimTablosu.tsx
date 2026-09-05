import type { Dagilim } from "@/lib/dagilim";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * Aynı toplamın farklı dağılımlarını yan yana koyar. Amaç tek bir sayı
 * vermek değil: AYT'ye kayan netin sırayı ne kadar öne çektiğini göstermek.
 */
export function DagilimTablosu({ satirlar }: { satirlar: Dagilim[] }) {
  const enIyi = satirlar[0]?.sira ?? 0;

  return (
    <div className="kart overflow-hidden">
      <div className="tablo-kaydir">
        <table className="w-full min-w-[520px] text-left">
          <caption className="sr-only">
            Aynı toplam netin TYT–AYT dağılımına göre sıra karşılıkları
          </caption>
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th scope="col" className="etiket px-5 py-4">Dağılım</th>
              <th scope="col" className="etiket px-5 py-4 text-right">TYT</th>
              <th scope="col" className="etiket px-5 py-4 text-right">AYT</th>
              <th scope="col" className="etiket px-5 py-4 text-right">Ham puan</th>
              <th scope="col" className="etiket px-5 py-4 text-right">Yaklaşık sıra</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map((d) => (
              <tr key={`${d.tyt}-${d.ayt}`} className="border-b border-[var(--line-soft)] last:border-0">
                <td className="px-5 py-3.5 text-[14px] text-[var(--text-secondary)]">{d.etiket}</td>
                <td className="sayi px-5 py-3.5 text-right text-[17px]" style={{ color: "var(--turkce)" }}>
                  {d.tyt}
                </td>
                <td className="sayi px-5 py-3.5 text-right text-[17px]" style={{ color: "var(--fen)" }}>
                  {d.ayt}
                </td>
                <td className="sayi px-5 py-3.5 text-right text-[17px] text-[var(--text-secondary)]">
                  {Math.round(d.puan)}
                </td>
                <td className="sayi px-5 py-3.5 text-right text-[19px]"
                  style={{ color: d.sira === enIyi ? "var(--brand)" : "var(--text)" }}>
                  ~{bicim(d.sira)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
