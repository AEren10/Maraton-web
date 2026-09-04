import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { JsonLd } from "@/components/JsonLd";
import { VeriRozeti } from "@/components/VeriRozeti";
import { BOLUM_KAYNAK, type Bolum } from "@/data/bolumler";
import {
  KARSILASTIRMALAR,
  bolumNetleri,
  bolumSlug,
  karsilastirmaCoz,
  karsilastirmaSlug,
  netSlug,
} from "@/data/programatik";
import { kirintiYolu } from "@/lib/schema";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return KARSILASTIRMALAR.map((c) => ({ slug: karsilastirmaSlug(c.a, c.b) }));
}

const bicim = (n: number) => n.toLocaleString("tr-TR");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const c = karsilastirmaCoz((await params).slug);
  if (!c) return {};
  return {
    title: `${c.a.ad} mı ${c.b.ad} mi? 2025 Karşılaştırma | Maraton`.slice(0, 60),
    description: `${c.a.ad} ve ${c.b.ad} arasındaki sıra ve net farkı, 2025 yerleştirme verisiyle. Hangisi kaç net istiyordu, aradaki fark ne kadar?`,
    alternates: { canonical: `/karsilastir/${karsilastirmaSlug(c.a, c.b)}` },
  };
}

function Sutun({ b, vurgu }: { b: Bolum; vurgu: boolean }) {
  const n = bolumNetleri(b);
  return (
    <div className="kart p-6" style={{ borderColor: vurgu ? "var(--brand)" : undefined }}>
      <Link href={`/bolum/${bolumSlug(b)}`} className="text-[19px] font-semibold hover:text-[var(--brand-light)]">
        {b.ad}
      </Link>
      <p className="etiket mt-2">{b.alan}</p>
      <dl className="mt-5 flex flex-col gap-4 border-t border-[var(--line)] pt-5">
        {[
          ["Gereken net", `~${n.kolay} – ~${n.zorYazi}`],
          ["En üst program", `${bicim(b.ustSira)}. sıra`],
          ["Son yerleşen", `${bicim(b.sonSira)}. sıra`],
          ...(b.ustPuan ? [["2025 en yüksek taban", `${b.ustPuan} · ${b.ustOrnek}`]] : []),
        ].map(([ad, deger]) => (
          <div key={ad}>
            <dt className="etiket">{ad}</dt>
            <dd className="sayi mt-1 text-[19px]">{deger}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function KarsilastirmaSayfasi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const c = karsilastirmaCoz((await params).slug);
  if (!c) notFound();

  const na = bolumNetleri(c.a);
  const nb = bolumNetleri(c.b);
  const netFarki = nb.kolay - na.kolay;
  const siraFarki = c.b.sonSira - c.a.sonSira;
  const kolayOlan = netFarki > 0 ? c.a : c.b;
  const zorOlan = netFarki > 0 ? c.b : c.a;

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Bölüm kaç net ister", yol: "/bolum-kac-net" },
          { ad: `${c.a.ad} – ${c.b.ad}`, yol: `/karsilastir/${karsilastirmaSlug(c.a, c.b)}` },
        ])}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(24px,4.2vw,40px)]">
          {c.a.ad} mı, {c.b.ad} mi?
        </h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          İki bölümün 2025 yerleştirmesindeki sıra bantları, net karşılıkları ve aradaki
          gerçek fark.
        </p>

        <div className="mt-9">
          <KisaCevap
            metin={`2025 verisine göre ${zorOlan.ad} daha seçiciydi: ${zorOlan === c.b ? nb.kolay : na.kolay} net isterken ${kolayOlan.ad} ${kolayOlan === c.a ? na.kolay : nb.kolay} netle giriliyordu. Aradaki fark ${Math.abs(netFarki)} net, sıralamada ${bicim(Math.abs(siraFarki))} basamak. İkisi de ${c.a.alan} puan türünde, yani aynı testleri çözüyorsun; seçim sıralamana ve mesleğe göre.`}
          />
        </div>

        <BolumBasligi no="01" ad="Yan yana" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Sutun b={c.a} vurgu={zorOlan === c.a} />
          <Sutun b={c.b} vurgu={zorOlan === c.b} />
        </div>

        <div className="kart kart-vurgu mt-8 p-6">
          <p className="text-[17px] font-semibold">
            Aradaki {Math.abs(netFarki)} net ne kadar sürer?
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Düzenli çalışan bir öğrencide {Math.abs(netFarki)} netlik artış yaklaşık{" "}
            {Math.max(Math.round(Math.abs(netFarki) / 2), 1)} ay sürer. Bu farkın hangi
            dersten geleceğini hesaplayalım.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href={`/hedef-net-rotasi?h=${Math.max(na.kolay, nb.kolay)}`}
              className="btn btn-brand flex-1">
              {Math.max(na.kolay, nb.kolay)} netin rotasını çıkar →
            </Link>
            <Link href={`/net/${netSlug(Math.min(Math.max(Math.max(na.kolay, nb.kolay), 40), 115))}`}
              className="btn btn-sessiz flex-1">
              Bu net kaç sıralama?
            </Link>
          </div>
        </div>

        <BolumBasligi no="02" ad="Kaynak" />
        <div className="mt-2">
          <VeriRozeti anahtarlar={["bolum", "siralama"]} />
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">{BOLUM_KAYNAK}</p>
        </div>
      </section>
    </>
  );
}
