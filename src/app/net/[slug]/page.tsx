import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { TekBakista } from "@/components/arac/TekBakista";
import { JsonLd } from "@/components/JsonLd";
import { VeriRozeti } from "@/components/VeriRozeti";
import { SIRALAMA_KAYNAK, siraTahminiSayi } from "@/data/siralama";
import { NETLER, komsuNetler, netSlug, netSlugCoz, netinBolumleri } from "@/data/programatik";
import { bolumSlug } from "@/data/programatik";
import { kirintiYolu } from "@/lib/schema";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return NETLER.map((n) => ({ slug: netSlug(n) }));
}

const bicim = (n: number) => n.toLocaleString("tr-TR");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const net = netSlugCoz((await params).slug);
  if (net === null) return {};
  const sira = siraTahminiSayi(net);
  return {
    title: `${net} Net Kaç Sıralama Yapar? 2025 Karşılığı | Maraton`,
    description: `${net} net 2025 yerleştirmesinde yaklaşık ${bicim(sira)}. sıraya denk geliyordu. Bu sırayla girilebilen bölümler ve hedefini yükseltmek için gereken net.`,
    alternates: { canonical: `/net/${netSlug(net)}` },
  };
}

export default async function NetSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const net = netSlugCoz((await params).slug);
  if (net === null) notFound();

  const sira = siraTahminiSayi(net);
  const bolumler = netinBolumleri(net);
  const komsu = komsuNetler(net);

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Net sıralama tablosu", yol: "/net-siralama-tablosu" },
          { ad: `${net} net`, yol: `/net/${netSlug(net)}` },
        ])}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(28px,5vw,44px)]">{net} net kaç sıralama yapar?</h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          2025 yerleştirme sonuçlarına göre {net} netin sıra karşılığı, bu sırayla açılan
          bölümler ve bir üst banda geçmek için gereken fark.
        </p>

        <div className="mt-9 grid gap-5">
          <KisaCevap
            metin={`${net} net 2025 yerleştirmesinde yaklaşık ${bicim(sira)}. sıraya denk geliyordu. Bu bant her yıl sınavın zorluğuna ve aday sayısına göre kayar; ${net} netle bu yıl birkaç bin sıra yukarıda da olabilirsin, aşağıda da.`}
          />
          <TekBakista
            satirlar={[
              ["Net", `${net}`],
              ["2025 sıra karşılığı", `~${bicim(sira)}. sıra`],
              ["Açılan bölüm sayısı", `${bolumler.length} bölüm (listemizde)`],
              ["Bir üst bant", `${Math.min(net + 5, 115)} net → ~${bicim(siraTahminiSayi(Math.min(net + 5, 115)))}. sıra`],
              ["Niteliği", "Yaklaşık — ÖSYM net–sıra tablosu yayımlamaz"],
            ]}
          />
        </div>

        <BolumBasligi no="01" ad={`${net} netle girilebilen bölümler`} />
        {bolumler.length > 0 ? (
          <ul className="kart mt-6 px-5 py-2 sm:px-7">
            {bolumler.slice(0, 16).map((b) => (
              <li key={b.ad} className="border-b border-[var(--line-soft)] py-3.5 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Link href={`/bolum/${bolumSlug(b)}`}
                    className="min-w-0 flex-1 text-[15px] font-medium hover:text-[var(--brand-light)]">
                    {b.ad}
                  </Link>
                  <span className="sayi shrink-0 text-[15px]" style={{ color: "var(--up)" }}>
                    son yerleşen {bicim(b.sonSira)}.
                  </span>
                </div>
                <p className="etiket mt-1.5">{b.alan}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[15px] text-[var(--text-secondary)]">
            Bu net listemizdeki bölümlerin sıra bantlarının altında kalıyor. Önce{" "}
            <Link href="/hedef-net-rotasi" className="baglanti">hedef net rotasına</Link> bak.
          </p>
        )}

        <BolumBasligi no="02" ad="Yakın netler" />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {komsu.map((n) => (
            <li key={n}>
              <Link href={`/net/${netSlug(n)}`} className="btn btn-sessiz px-4 py-2.5 text-[14px]">
                {n} net → ~{bicim(siraTahminiSayi(n))}.
              </Link>
            </li>
          ))}
        </ul>

        <div className="kart kart-vurgu mt-10 p-6">
          <p className="text-[17px] font-semibold">Bu neti nasıl yükseltirsin?</p>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            {net} netten {Math.min(net + 10, 115)} nete çıkmak sıralamada yaklaşık{" "}
            {bicim(sira - siraTahminiSayi(Math.min(net + 10, 115)))} basamak demek. Farkın hangi
            dersten geleceğini hesaplayalım.
          </p>
          <Link href={`/hedef-net-rotasi?h=${Math.min(net + 10, 115)}`}
            className="btn btn-brand mt-5 w-full sm:w-auto">
            {Math.min(net + 10, 115)} netin rotasını çıkar →
          </Link>
        </div>

        <BolumBasligi no="03" ad="Kaynak" />
        <div className="mt-2">
          <VeriRozeti anahtarlar={["siralama", "bolum"]} />
          <p className="mt-4 text-[13px] text-[var(--text-muted)]">{SIRALAMA_KAYNAK}</p>
        </div>
      </section>
    </>
  );
}
