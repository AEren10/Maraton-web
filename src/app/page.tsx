import type { Metadata } from "next";
import Link from "next/link";
import { AnaSayfaBolumleri } from "@/components/sections/AnaSayfaBolumleri";
import { JsonLd } from "@/components/JsonLd";
import { GeriSayimRozeti } from "@/components/GeriSayimRozeti";
import { RotaSahnesi } from "@/components/grafik/RotaSahnesi";
import { ARACLAR } from "@/data/araclar";
import { kalanGun as hesapla, SINAV_YILI } from "@/lib/sinav";
import { websitesi } from "@/lib/schema";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: `YKS Net Hesaplama, Puan ve Sıralama Araçları ${SINAV_YILI} | Maraton`,
  description:
    "TYT ve AYT net hesaplama, puan tahmini, net–sıralama tablosu ve hedef net rotası. Kayıt yok, e-posta yok; hepsi tek sayfada biter.",
  alternates: { canonical: "/" },
};

const ONE_CIKAN = ["tyt-net-hesaplama", "hedef-net-rotasi", "tercih-robotu"];

export default function AnaSayfa() {
  const kalanGun = hesapla();
  const one = ARACLAR.filter((a) => ONE_CIKAN.includes(a.slug));

  return (
    <>
      <JsonLd data={websitesi} />

      <section className="sinir flex min-h-[calc(100svh-4rem)] flex-col justify-center py-8">
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="max-w-[720px]">
          <h1 className="text-[clamp(26px,4.4vw,44px)]">
            Netini hesapla, sıranı gör, neyi çalışacağını bul.
          </h1>
          <p className="metin mt-4 max-w-[680px] text-[16px]">
            On araç ve bir rehber. Hepsi aynı soruyu farklı yerinden tutuyor: bu netlerle
            nereye gidiyorsun ve nereden net kazanırsın.
          </p>
          </div>
          <GeriSayimRozeti kalanGun={kalanGun} />
        </div>

        <figure className="mt-6 sm:mt-8">
          <div className="[&>svg]:max-h-[min(44vh,420px)]">
            <RotaSahnesi />
          </div>
        </figure>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {one.map((a, i) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className={`btn ${i === 0 ? "btn-brand" : "btn-sessiz"} px-5 py-3 text-[15px]`}
            >
              {a.ad}
            </Link>
          ))}
          <span className="text-[13px] text-[var(--text-muted)]">
            E-posta yok, kayıt yok. Sayılar tarayıcından çıkmıyor.
          </span>
        </div>
      </section>

      <AnaSayfaBolumleri kalanGun={kalanGun} />
    </>
  );
}
