"use client";

import { siraBandi, yksHamPuan, puanYazi, VARSAYILAN_OBP_KATKISI } from "@/lib/yerlestirme";
import { Sayac } from "../ui/Sayac";

const bicim = (n: number) => n.toLocaleString("tr-TR");

/**
 * TYT ve AYT netleri toplanmaz. Sıralama, iki oturumun ağırlıklı
 * puanından çıkar: ham puan = TYT × 0,40 + AYT × 0,60. Bu panel o
 * hesabı ve karşılık gelen sıra bandını gösterir; OBP dahil değildir.
 */
export function PuanPaneli({ tytNet, aytNet }: { tytNet: number; aytNet: number }) {
  const eksik = aytNet <= 0;
  const puan = yksHamPuan(tytNet, aytNet);
  const { orta, iyi, kotu } = siraBandi(puan);

  return (
    <div className="kart kart-vurgu mt-6 overflow-hidden p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="etiket">Yaklaşık yerleştirme puanı</p>
        <p className="etiket" style={{ color: "var(--text-muted)" }}>OBP hariç</p>
      </div>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
        <span
          className="sayi text-[clamp(38px,9vw,60px)] leading-none"
          style={{ color: "var(--brand)", textShadow: "0 0 40px var(--brand-glow)" }}
        >
          <Sayac deger={Math.round(puan)} sure={600} />
        </span>
        <span className="text-[15px] text-[var(--text-secondary)]">ham puan</span>
      </p>

      <div className="mt-4 grid gap-2 text-[13px] text-[var(--text-secondary)] sm:grid-cols-2">
        <p>
          TYT ham <span className="sayi text-[var(--text)]">{puanYazi(100 + (tytNet / 120) * 400)}</span>
          <span className="etiket ml-2">× 0,40</span>
        </p>
        <p>
          AYT ham <span className="sayi text-[var(--text)]">{puanYazi(100 + (Math.max(aytNet, 0) / 80) * 400)}</span>
          <span className="etiket ml-2">× 0,60</span>
        </p>
      </div>

      <div className="mt-5 border-t border-[var(--line)] pt-5">
        <p className="etiket">2025 verisine göre sıra karşılığı</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          Taban puanlar diploma notunu içerdiği için burada ortalama bir diploma katkısı
          (+{VARSAYILAN_OBP_KATKISI} puan) varsayıldı.
        </p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
          <span className="sayi text-[30px]" style={{ color: "var(--text)" }}>
            ~{bicim(orta)}
          </span>
          <span className="text-[14px] text-[var(--text-secondary)]">. sıra civarı</span>
        </p>
        <p className="mt-2 text-[13px] text-[var(--text-muted)]">
          İyi giderse <span className="sayi text-[var(--up)]">{bicim(iyi)}</span>, kötü giderse{" "}
          <span className="sayi text-[var(--down)]">{bicim(kotu)}</span> bandında.
        </p>
      </div>

      {eksik ? (
        <p className="mt-4 text-[13px] leading-relaxed text-[var(--warn)]">
          AYT netini girmedin. Sıralamanın %60&apos;ı AYT&apos;den geldiği için bu puan
          gerçekte olduğundan çok daha düşük görünüyor.
        </p>
      ) : (
        <p className="mt-4 text-[12px] leading-relaxed text-[var(--text-muted)]">
          TYT ve AYT netleri toplanmaz; ÖSYM ikisini 40/60 ağırlıkla puana çevirir.
          Diploma notu buna dahil değil: OBP × 0,12 ile en fazla 60 puan daha eklenir.
          Ham puanlar sınav günü tüm adayların dağılımına göre hesaplandığı için bu
          sayı bir tahmindir.
        </p>
      )}

    </div>
  );
}
