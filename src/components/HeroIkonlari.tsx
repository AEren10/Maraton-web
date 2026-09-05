import Link from "next/link";
import { Calculator, Compass, Target, TrendingUp } from "lucide-react";

const ROZETLER = [
  { yol: "/tyt-net-hesaplama", ad: "net", Ikon: Calculator, renk: "var(--turkce)",
    konum: "-left-[96px] top-[16%]", gecikme: "0ms" },
  { yol: "/hedef-net-rotasi", ad: "rota", Ikon: Target, renk: "var(--brand)",
    konum: "-left-[76px] top-[58%]", gecikme: "160ms" },
  { yol: "/tercih-robotu", ad: "tercih", Ikon: Compass, renk: "var(--din)",
    konum: "-right-[96px] top-[22%]", gecikme: "320ms" },
  { yol: "/bu-tempoyla-kac-net", ad: "tempo", Ikon: TrendingUp, renk: "var(--fen)",
    konum: "-right-[76px] top-[62%]", gecikme: "480ms" },
];

/**
 * Çok geniş ekranda içerik sütununun dışında kalan boşluğa yerleşen
 * kısayollar. Dekoratif değil: hepsi bir araca gidiyor. İçerikle
 * çakışmasın diye 1536 piksel altında gizli.
 */
export function HeroIkonlari() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden 2xl:block">
      {ROZETLER.map(({ yol, ad, Ikon, renk, konum, gecikme }) => (
        <Link
          key={yol}
          href={yol}
          className={`hero-rozet pointer-events-auto absolute ${konum}`}
          style={{ ["--aksan" as string]: renk, ["--gecikme" as string]: gecikme }}
        >
          <span className="hero-rozet-kutu">
            <Ikon size={20} strokeWidth={2} aria-hidden />
          </span>
          <span className="etiket mt-2 block text-center">{ad}</span>
        </Link>
      ))}
    </div>
  );
}
