import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { TekBakista } from "@/components/arac/TekBakista";
import { JsonLd } from "@/components/JsonLd";
import { VeriRozeti } from "@/components/VeriRozeti";
import { DERSLER } from "@/lib/dersler";
import { rotaCikar } from "@/lib/rota";
import { tempo } from "@/lib/tempo";
import { kalanGun } from "@/lib/sinav";
import { sayiYazi } from "@/lib/net";
import { ROTALAR, netSlug, ornekDagilim, rotaSlug, rotaSlugCoz } from "@/data/programatik";
import { siraTahminiSayi } from "@/data/siralama";
import { kirintiYolu, nasilYapilir } from "@/lib/schema";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ROTALAR.map((r) => ({ slug: rotaSlug(r.bas, r.son) }));
}

const bicim = (n: number) => n.toLocaleString("tr-TR");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const r = rotaSlugCoz((await params).slug);
  if (!r) return {};
  return {
    title: `${r.bas} Netten ${r.son} Nete Nasıl Çıkılır? | Maraton`,
    description: `${r.bas} netten ${r.son} nete çıkmak için hangi dersten kaç net kazanman gerektiği, aylık tempo ve gerçekçi süre. Ders bazlı dağıtım.`,
    alternates: { canonical: `/net-rotasi/${rotaSlug(r.bas, r.son)}` },
  };
}

export default async function RotaSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const r = rotaSlugCoz((await params).slug);
  if (!r) notFound();

  const mevcut = ornekDagilim(r.bas);
  const hesap = rotaCikar(mevcut, r.son);
  const fark = r.son - r.bas;
  const gun = kalanGun();
  const t = tempo(fark, gun);
  const kaldirac = hesap.kaldirac
    ? DERSLER.find((d) => d.key === hesap.kaldirac)!.ad
    : null;

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Hedef net rotası", yol: "/hedef-net-rotasi" },
          { ad: `${r.bas} → ${r.son}`, yol: `/net-rotasi/${rotaSlug(r.bas, r.son)}` },
        ])}
      />
      <JsonLd
        data={nasilYapilir(
          `${r.bas} netten ${r.son} nete çıkmak`,
          `${fark} netlik farkı dört derse dağıtarak kapatma planı.`,
          DERSLER.map((d) => ({
            ad: d.ad,
            metin: `${d.ad}: ${mevcut[d.key]} netten ${mevcut[d.key] + hesap.artis[d.key]} nete, ${hesap.artis[d.key]} net artış.`,
          }))
        )}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(26px,4.6vw,42px)]">
          {r.bas} netten {r.son} nete nasıl çıkılır?
        </h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          {fark} netlik fark tek bir dersten gelmez. Aşağıda bu farkın dört derse nasıl
          dağıldığı, aylık tempo karşılığı ve sıralamada ne kadar oynattığı var.
        </p>

        <div className="mt-9 grid gap-5">
          <KisaCevap
            metin={`${r.bas} netten ${r.son} nete çıkmak ${fark} net demek.${kaldirac ? ` Bu farkın en büyük parçası ${kaldirac} dersinden gelir: ${hesap.artis[hesap.kaldirac!]} net.` : ""} Sınava ${gun} gün varken bu, ayda ${sayiYazi(t.aylik)} net, haftada ${sayiYazi(t.haftalik)} net anlamına geliyor. Sıralamada karşılığı yaklaşık ${bicim(siraTahminiSayi(r.bas))}. sıradan ${bicim(siraTahminiSayi(r.son))}. sıraya çıkmak.`}
          />
          <TekBakista
            satirlar={[
              ["Fark", `${fark} net`],
              ["Aylık gereken", `${sayiYazi(t.aylik)} net`],
              ["Haftalık gereken", `${sayiYazi(t.haftalik)} net`],
              ["Tempo", `${t.isaret} ${t.ad}`],
              ["Sıralama karşılığı", `~${bicim(siraTahminiSayi(r.bas))} → ~${bicim(siraTahminiSayi(r.son))}`],
              ["En büyük kaldıraç", kaldirac ?? "—"],
            ]}
          />
        </div>

        <BolumBasligi no="01" ad="Ders bazlı dağıtım" />
        <div className="kart mt-6 px-5 py-2 sm:px-7">
          {DERSLER.map((d) => (
            <div key={d.key}
              className="flex items-center justify-between gap-4 border-b border-[var(--line-soft)] py-3.5 last:border-0">
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.renk }} />
                <span className="etiket truncate">{d.ad}</span>
              </span>
              <span className="sayi shrink-0 text-[17px]">
                {mevcut[d.key]} <span className="text-[var(--text-muted)]">→</span>{" "}
                {mevcut[d.key] + hesap.artis[d.key]}
                <span className="ml-2 text-[15px]" style={{ color: "var(--up)" }}>
                  {hesap.artis[d.key] > 0 ? `+${hesap.artis[d.key]}` : "—"}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-secondary)]">
          {t.cumle} Bu tablo {r.bas} netin dört derse tipik dağılımını varsayıyor; kendi
          netlerini girersen dağıtım değişir.
        </p>

        <div className="kart kart-vurgu mt-8 p-6">
          <p className="text-[17px] font-semibold">Kendi netlerinle hesapla</p>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            Yukarıdaki dağılım örnek. Dört dersin gerçek netlerini gir, rota sana göre çıksın.
          </p>
          <Link href={`/hedef-net-rotasi?h=${r.son}`} className="btn btn-brand mt-5 w-full sm:w-auto">
            {r.son} netin rotasını çıkar →
          </Link>
        </div>

        <BolumBasligi no="02" ad="İlgili sayfalar" />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {[
            { yol: `/net/${netSlug(r.bas)}`, ad: `${r.bas} net kaç sıralama?` },
            { yol: `/net/${netSlug(r.son)}`, ad: `${r.son} net kaç sıralama?` },
            { yol: "/tercih-robotu", ad: `${r.son} netle nereye girilir?` },
            { yol: "/bu-tempoyla-kac-net", ad: "Bu tempoyla kaç net?" },
          ].map((x) => (
            <li key={x.yol}>
              <Link href={x.yol} className="btn btn-sessiz px-4 py-2.5 text-[14px]">
                {x.ad}
              </Link>
            </li>
          ))}
        </ul>

        <BolumBasligi no="03" ad="Kaynak" />
        <div className="mt-2">
          <VeriRozeti anahtarlar={["net", "siralama"]} />
        </div>
      </section>
    </>
  );
}
