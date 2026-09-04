import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { TekBakista } from "@/components/arac/TekBakista";
import { JsonLd } from "@/components/JsonLd";
import { VeriRozeti } from "@/components/VeriRozeti";
import { BOLUMLER, BOLUM_KAYNAK } from "@/data/bolumler";
import {
  benzerBolumler,
  bolumNetleri,
  bolumSlug,
  bolumSlugCoz,
  bolumunKarsilastirmalari,
  karsilastirmaSlug,
  netSlug,
} from "@/data/programatik";
import { kirintiYolu } from "@/lib/schema";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return BOLUMLER.map((b) => ({ slug: bolumSlug(b) }));
}

const bicim = (n: number) => n.toLocaleString("tr-TR");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const b = bolumSlugCoz((await params).slug);
  if (!b) return {};
  const { kolay, zorYazi } = bolumNetleri(b);
  return {
    title: `${b.ad} İçin Kaç Net Gerekir? 2025 | Maraton`.slice(0, 60),
    description: `${b.ad} 2025'te ${bicim(b.ustSira)} – ${bicim(b.sonSira)}. sıra bandında doldu; bu yaklaşık ${kolay}–${zorYazi} nete denk geliyor. Devlet üniversiteleri verisi.`,
    alternates: { canonical: `/bolum/${bolumSlug(b)}` },
  };
}

export default async function BolumSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const b = bolumSlugCoz((await params).slug);
  if (!b) notFound();

  const { kolay, zorYazi } = bolumNetleri(b);
  const benzer = benzerBolumler(b);
  const karsilastirmalar = bolumunKarsilastirmalari(b);

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Bölüm kaç net ister", yol: "/bolum-kac-net" },
          { ad: b.ad, yol: `/bolum/${bolumSlug(b)}` },
        ])}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(26px,4.6vw,42px)]">{b.ad} için kaç net gerekir?</h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          2025 yerleştirme sonuçlarına göre {b.ad} bölümünün sıra bandı, bunun net karşılığı ve
          aradaki farkı kapatmak için gereken plan.
        </p>

        <div className="mt-9 grid gap-5">
          <KisaCevap
            metin={`${b.ad} için 2025'te devlet üniversitelerinde en üst program ${bicim(b.ustSira)}. sırada kapandı, son yerleşen ise ${bicim(b.sonSira)}. sıradaydı. Net karşılığı yaklaşık ${kolay} ile ${zorYazi} arası: alt sınır bu bölümde bir yere yerleşmek, üst sınır en iyi programa girmek için.${b.ustPuan ? ` En yüksek taban puan ${b.ustPuan} ile ${b.ustOrnek}.` : ""}`}
          />
          <TekBakista
            satirlar={[
              ["Puan türü", b.alan],
              ["En üst program", `${bicim(b.ustSira)}. sıra`],
              ["Son yerleşen", `${bicim(b.sonSira)}. sıra`],
              ["Gereken net", `~${kolay} – ~${zorYazi}`],
              ...(b.ustPuan
                ? ([["2025 en yüksek taban", `${b.ustPuan} · ${b.ustOrnek}`]] as [string, string][])
                : []),
              ["Veri", b.dogrulanmis ? "Doğrulanmış · 2025" : "Yaklaşık · 2025"],
            ]}
          />
        </div>

        <BolumBasligi no="01" ad="Bu farkı nasıl kapatırsın" />
        <div className="kart mt-6 p-6">
          <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Şu an {kolay - 12} nettesin diyelim. {b.ad} için gereken alt sınıra {12} net var.
            Bu farkı dört derse dağıtmak, tek bir derse yüklenmekten hem daha hızlı hem daha
            gerçekçi: tavana yakın dersler pahalı, tavana uzak dersler ucuzdur.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/hedef-net-rotasi?h=${kolay}`} className="btn btn-brand flex-1">
              {kolay} netin rotasını çıkar →
            </Link>
            <Link href={`/net/${netSlug(Math.min(Math.max(kolay, 40), 115))}`}
              className="btn btn-sessiz flex-1">
              {kolay} net kaç sıralama?
            </Link>
          </div>
        </div>

        {benzer.length > 0 ? (
          <>
            <BolumBasligi no="02" ad={`Yakın bantta ${b.alan} bölümleri`} />
            <ul className="kart mt-6 px-5 py-2 sm:px-7">
              {benzer.map((x) => {
                const n = bolumNetleri(x);
                return (
                  <li key={x.ad} className="border-b border-[var(--line-soft)] py-3.5 last:border-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <Link href={`/bolum/${bolumSlug(x)}`}
                        className="min-w-0 flex-1 text-[15px] font-medium hover:text-[var(--brand-light)]">
                        {x.ad}
                      </Link>
                      <span className="sayi shrink-0 text-[15px]">
                        ~{n.kolay} – ~{n.zorYazi} net
                      </span>
                    </div>
                    <p className="etiket mt-1.5">
                      {bicim(x.ustSira)} – {bicim(x.sonSira)}. sıra
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {karsilastirmalar.length > 0 ? (
          <>
            <BolumBasligi no="03" ad="Karşılaştır" />
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {karsilastirmalar.map((c) => (
                <li key={karsilastirmaSlug(c.a, c.b)}>
                  <Link href={`/karsilastir/${karsilastirmaSlug(c.a, c.b)}`}
                    className="btn btn-sessiz px-4 py-2.5 text-[14px]">
                    {c.a.ad} mı {c.b.ad} mi?
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <BolumBasligi no="04" ad="Kaynak" />
        <div className="mt-2">
          <VeriRozeti anahtarlar={["bolum", "siralama"]} />
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">{BOLUM_KAYNAK}</p>
        </div>
      </section>
    </>
  );
}
