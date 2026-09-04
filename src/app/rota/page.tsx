import type { Metadata } from "next";
import { RotaAkisi } from "@/components/rota/RotaAkisi";
import { toplam } from "@/lib/dersler";
import { kalanGun as hesapla } from "@/lib/sinav";
import { rotaParse, rotaQuery } from "@/lib/url";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { hedef, mevcut } = rotaParse(await searchParams);
  const bas = Math.round(toplam(mevcut));
  const gecerli = hedef > 0 && bas > 0;
  const baslik = gecerli
    ? `${bas} netten ${hedef} nete giden rota | Maraton`
    : "Paylaşılan rota | Maraton";
  const aciklama = gecerli
    ? `${bas} → ${hedef}. Bu ${hedef - bas} netin hangi dersten geleceği ders ders yazılı.`
    : "Hedef netini gir, dağıtımı ders ders gör.";
  const og = `/api/og?${rotaQuery(hedef, mevcut)}`;

  return {
    title: baslik,
    description: aciklama,
    alternates: { canonical: "/rota" },
    robots: { index: false, follow: true },
    openGraph: { title: baslik, description: aciklama, images: [og] },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default async function RotaSayfasi({ searchParams }: Props) {
  const { hedef, mevcut } = rotaParse(await searchParams);
  const gecerli = hedef > 0 && toplam(mevcut) > 0;

  return (
    <section className="sinir flex min-h-[calc(100svh-140px)] flex-col items-center justify-center py-16">
      <RotaAkisi
        kalanGun={hesapla()}
        baslangicHedef={gecerli ? hedef : undefined}
        baslangicNetler={gecerli ? mevcut : undefined}
      />
    </section>
  );
}
