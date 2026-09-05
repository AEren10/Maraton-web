import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BolumBasligi } from "@/components/arac/BolumBasligi";
import { KisaCevap } from "@/components/arac/KisaCevap";
import { TekBakista } from "@/components/arac/TekBakista";
import { JsonLd } from "@/components/JsonLd";
import { VeriRozeti } from "@/components/VeriRozeti";
import { SIRALAMA_KAYNAK } from "@/data/siralama";
import { DagilimTablosu } from "@/components/net/DagilimTablosu";
import { dagilimFarki, dagilimlar, tipikDagilim } from "@/lib/dagilim";
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
  const { sira } = tipikDagilim(net);
  return {
    title: `${net} Net Kaç Sıralama Yapar? TYT–AYT Dağılımına Göre | Maraton`,
    description: `${net} net dengeli bir dağılımda 2025'te yaklaşık ${bicim(sira)}. sıraya denk geliyordu. Netin TYT ile AYT arasında nasıl bölündüğü sırayı değiştirir; beş dağılımın karşılığı ve açılan bölümler.`,
    alternates: { canonical: `/net/${netSlug(net)}` },
  };
}

export default async function NetSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const net = netSlugCoz((await params).slug);
  if (net === null) notFound();

  const tipik = tipikDagilim(net);
  const sira = tipik.sira;
  const secenekler = dagilimlar(net);
  const fark = dagilimFarki(net);
  const bolumler = netinBolumleri(net);
  const komsu = komsuNetler(net);

  return (
    <>
      <JsonLd
        data={kirintiYolu([
          { ad: "Ana sayfa", yol: "/" },
          { ad: "Net – sıralama", yol: "/net-siralama-tablosu" },
          { ad: `${net} net`, yol: `/net/${netSlug(net)}` },
        ])}
      />

      <section className="sinir max-w-[900px] py-12 sm:py-16">
        <h1 className="text-[clamp(28px,5vw,44px)]">{net} net kaç sıralama yapar?</h1>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          Cevap tek bir sayı değil: {net} netin TYT ile AYT arasında nasıl bölündüğü
          sıranı değiştirir. Aşağıda beş dağılımın 2025 karşılığı, açılan bölümler ve
          bir üst banda geçmek için gereken fark var.
        </p>

        <div className="mt-9 grid gap-5">
          <KisaCevap
            metin={`${net} net dengeli bir dağılımda (${tipik.tyt} TYT + ${tipik.ayt} AYT) 2025'te yaklaşık ${bicim(sira)}. sıraya denk geliyordu. Ama netler toplanmaz: ham puanın %60'ı AYT'den gelir. Aynı ${net} netin en AYT ağırlıklı hâliyle en TYT ağırlıklı hâli arasında yaklaşık ${bicim(fark)} sıra fark var. Bant her yıl sınavın zorluğuna göre de kayar.`}
          />
          <TekBakista
            satirlar={[
              ["Toplam net", `${net}`],
              ["Dengeli dağılım", `${tipik.tyt} TYT + ${tipik.ayt} AYT`],
              ["2025 sıra karşılığı", `~${bicim(sira)}. sıra`],
              ["Dağılımın yarattığı fark", `~${bicim(fark)} sıra`],
              ["Açılan bölüm sayısı", `${bolumler.length} bölüm (listemizde)`],
              ["Bir üst bant", `${Math.min(net + 5, 115)} net → ~${bicim(tipikDagilim(Math.min(net + 5, 115)).sira)}. sıra`],
              ["Niteliği", "Yaklaşık — OBP hariç, ÖSYM net–sıra tablosu yayımlamaz"],
            ]}
          />
        </div>

        <BolumBasligi no="01" ad={`Aynı ${net} net, beş farklı sıra`} />
        <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
          AYT&apos;de 80 soru var ama ham puanın %60&apos;ını o belirliyor; TYT&apos;de 120
          soru var ama payı %40. Bu yüzden AYT&apos;den kazanılan bir net TYT&apos;den
          kazanılandan değerli. Toplamın aynı kaldığı beş dağılım:
        </p>
        <div className="mt-6">
          <DagilimTablosu satirlar={secenekler} />
        </div>

        <BolumBasligi no="02" ad={`${net} netle girilebilen bölümler`} />
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

        <BolumBasligi no="03" ad="Yakın netler" />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {komsu.map((n) => (
            <li key={n}>
              <Link href={`/net/${netSlug(n)}`} className="btn btn-sessiz px-4 py-2.5 text-[14px]">
                {n} net → ~{bicim(tipikDagilim(n).sira)}.
              </Link>
            </li>
          ))}
        </ul>

        <div className="kart kart-vurgu mt-10 p-6">
          <p className="text-[17px] font-semibold">Bu neti nasıl yükseltirsin?</p>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            {net} netten {Math.min(net + 10, 115)} nete çıkmak sıralamada yaklaşık{" "}
            {bicim(sira - tipikDagilim(Math.min(net + 10, 115)).sira)} basamak demek. Farkın hangi
            dersten geleceğini hesaplayalım.
          </p>
          <Link href={`/hedef-net-rotasi?h=${Math.min(net + 10, 115)}`}
            className="btn btn-brand mt-5 w-full sm:w-auto">
            {Math.min(net + 10, 115)} netin rotasını çıkar →
          </Link>
        </div>

        <BolumBasligi no="04" ad="Kaynak" />
        <div className="mt-2">
          <VeriRozeti anahtarlar={["siralama", "bolum"]} />
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
            Sıralar, ham puana ortalama bir diploma katkısı eklenerek 2025 taban puanlarından
            çıkarıldı; OBP&apos;n yüksekse daha öndesin. {SIRALAMA_KAYNAK}
          </p>
        </div>
      </section>
    </>
  );
}
