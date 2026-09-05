import Link from "next/link";
import { BookOpen, CalendarDays, Calculator, Compass, PencilLine, Target, TrendingUp } from "lucide-react";

const ROZETLER = [
  { yol: "/tyt-net-hesaplama", ad: "net", Ikon: Calculator, renk: "var(--turkce)",
    konum: "-left-[210px] top-[6%]", gecikme: "0ms" },
  { yol: "/hedef-net-rotasi", ad: "rota", Ikon: Target, renk: "var(--brand)",
    konum: "-left-[136px] top-[40%]", gecikme: "120ms" },
  { yol: "/deneme-ortalamasi", ad: "deneme", Ikon: PencilLine, renk: "var(--matematik)",
    konum: "-left-[228px] top-[74%]", gecikme: "240ms" },
  { yol: "/tercih-robotu", ad: "tercih", Ikon: Compass, renk: "var(--din)",
    konum: "-right-[210px] top-[8%]", gecikme: "360ms" },
  { yol: "/bu-tempoyla-kac-net", ad: "tempo", Ikon: TrendingUp, renk: "var(--fen)",
    konum: "-right-[136px] top-[44%]", gecikme: "480ms" },
  { yol: "/yks-2027-takvimi", ad: "takvim", Ikon: CalendarDays, renk: "var(--cografya)",
    konum: "-right-[228px] top-[76%]", gecikme: "600ms" },
  { yol: "/rehber", ad: "rehber", Ikon: BookOpen, renk: "var(--sosyal)",
    konum: "-left-[300px] top-[24%]", gecikme: "720ms", genis: true },
];

/**
 * Çok geniş ekranda içerik sütununun dışında kalan boşluğa yerleşen
 * kısayollar. Dekoratif değil: hepsi bir araca gidiyor. İçerikle
 * çakışmasın diye 1536 piksel altında gizli; en dıştaki ikon ancak
 * gerçekten yer varsa görünüyor.
 */
export function HeroIkonlari() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden 2xl:block">
      {ROZETLER.map(({ yol, ad, Ikon, renk, konum, gecikme, genis }) => (
        <Link
          key={yol}
          href={yol}
          className={`hero-rozet pointer-events-auto absolute ${konum} ${genis ? "hidden min-[1800px]:block" : ""}`}
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
