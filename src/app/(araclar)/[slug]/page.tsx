import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARACLAR, aracBul } from "@/data/araclar";
import { aracIcerikBul } from "@/data/aracIcerik";
import { AracGovdesi } from "@/components/sections/AracGovdesi";
import { AracRehberi } from "@/components/arac/AracRehberi";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { IlgiliAraclar } from "@/components/arac/IlgiliAraclar";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { TekBakista } from "@/components/arac/TekBakista";
import { BeklemeListesi } from "@/components/BeklemeListesi";
import { JsonLd } from "@/components/JsonLd";
import { SSSListesi } from "@/components/icerik/SSSListesi";
import { VeriRozeti } from "@/components/VeriRozeti";
import { SSS } from "@/data/sss";
import { kalanGun as hesapla } from "@/lib/sinav";
import { kirintiYolu, nasilYapilir } from "@/lib/schema";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ARACLAR.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const arac = aracBul(slug);
  if (!arac) return {};
  return {
    title: arac.title,
    description: arac.description,
    alternates: { canonical: `/${arac.slug}` },
    openGraph: { title: arac.title, description: arac.description, url: `/${arac.slug}` },
  };
}

export default async function AracSayfasi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const arac = aracBul(slug);
  if (!arac) notFound();

  const icerik = aracIcerikBul(slug);
  const kalanGun = hesapla();
  const genis = ["bolum", "siralama", "tercih"].includes(arac.tur);
  const sorular = SSS.slice(0, 8);

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Araçlar", yol: "/araclar" },
          { ad: arac.ad, yol: `/${arac.slug}` },
        ])}
      />
      {icerik ? (
        <JsonLd
          data={nasilYapilir(
            arac.h1,
            icerik.kisaCevap,
            icerik.tekBakista
              .slice(0, 4)
              .map(([ad, deger]) => ({ ad, metin: `${ad}: ${deger}` }))
          )}
        />
      ) : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sorular.map((s) => ({
            "@type": "Question",
            name: s.soru,
            acceptedAnswer: { "@type": "Answer", text: s.cevap },
          })),
        }}
      />

      <section className={`sinir py-12 sm:py-16 ${genis ? "max-w-[1000px]" : "max-w-[820px]"}`}>
        <h1 className="text-[clamp(28px,5vw,44px)]">{arac.h1}</h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          {arac.description}
        </p>
        {icerik?.rozet ? (
          <p
            className="etiket mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--up)]" aria-hidden />
            {icerik.rozet}
          </p>
        ) : null}

        {icerik ? (
          <div className="mt-9 grid gap-5">
            <KisaCevap metin={icerik.kisaCevap} />
            <TekBakista satirlar={icerik.tekBakista} />
          </div>
        ) : null}

        <BolumBasligi no="01" ad="Hesaplama" />
        <div className={`mt-6 ${genis ? "" : "max-w-[640px]"}`}>
          <AracGovdesi arac={arac} kalanGun={kalanGun} />
        </div>

        {icerik ? (
          <>
            <BolumBasligi no="02" ad="Kısa rehber" />
            <div className="mt-6">
              <AracRehberi kartlar={icerik.rehber} />
              <p className="etiket mt-9">Bunlar da işine yarar</p>
              <IlgiliAraclar slugler={icerik.ilgili} />
            </div>
          </>
        ) : null}

        <BolumBasligi no="03" ad="Sık sorulanlar" />
        <div className="mt-6 max-w-[760px]">
          <SSSListesi adet={8} />
        </div>

        <BolumBasligi no="04" ad="Kaynaklar" />
        <div className="mt-2 max-w-[760px]">
          {arac.veri ? <VeriRozeti anahtarlar={arac.veri} /> : null}
          <BeklemeListesi kaynak={arac.slug} />
        </div>
      </section>
    </>
  );
}
