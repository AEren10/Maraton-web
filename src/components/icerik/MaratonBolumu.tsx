import Image from "next/image";
import Link from "next/link";
import { MarkaLogo } from "../MarkaLogo";

const SATIRLAR = [
  "Hedefine ve netlerine göre günlük çalışma rotası",
  "TYT, AYT ve branş denemelerinde ders ders analiz",
  "Fotoğraflı yanlış defteri ve aralıklı tekrar",
  "Net grafiği, tahmini sıralama ve haftalık rapor",
];

const EKRANLAR = [
  { src: "/app-screens/rota.png", alt: "Maraton uygulamasında bugünün çalışma rotası" },
  { src: "/app-screens/hedef.png", alt: "Maraton uygulamasında hedef net rotası" },
  { src: "/app-screens/analiz.png", alt: "Maraton uygulamasında deneme analizi" },
];

export function MaratonBolumu({ detayLinki = false }: { detayLinki?: boolean }) {
  return (
    <div className="kart maraton-tanitim overflow-hidden p-6 sm:p-9 lg:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <MarkaLogo />
          <p className="mt-7 text-[clamp(25px,4vw,38px)] leading-[1.12] tracking-[-0.025em]">
            Her sabah rotan hazır.
          </p>
          <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Maraton, YKS hazırlığını günlere böler. Ne çalışacağını gösterir;
            denemelerin değiştikçe rotanı da yeniler.
          </p>
          <ul className="mt-7 grid gap-3 border-t border-[var(--line)] pt-7">
            {SATIRLAR.map((s) => (
              <li key={s} className="flex gap-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {detayLinki ? (
              <Link href="/maraton" className="btn btn-brand min-h-11 px-5">
                Uygulamayı tanı
              </Link>
            ) : null}
            <span className="text-[13px] text-[var(--text-muted)]">
              iOS ve Android yayını hazırlanıyor.
            </span>
          </div>
        </div>

        <div className="app-ekranlari" aria-label="Maraton uygulamasından ekranlar">
          {EKRANLAR.map((ekran, i) => (
            <figure key={ekran.src} className="app-telefon" data-orta={i === 1 ? "evet" : "hayir"}>
              <Image
                src={ekran.src}
                alt={ekran.alt}
                width={390}
                height={844}
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 190px"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
