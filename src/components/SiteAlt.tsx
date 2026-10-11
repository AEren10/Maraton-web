import Link from "next/link";
import { ARACLAR } from "@/data/araclar";
import { MarkaLogo } from "./MarkaLogo";

export function SiteAlt() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="sinir py-12">
        <Link href="/" className="mb-8 inline-flex min-h-11 items-center">
          <MarkaLogo kompakt />
        </Link>

        <nav aria-label="Araçlar">
          <p className="etiket">Araçlar</p>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {ARACLAR.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}`}
                  className="liste-baglanti min-h-11 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text)]"
                >
                  {a.ad}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-8 flex flex-wrap gap-x-6 border-t border-[var(--line-soft)] pt-4">
          {[
            ["/yks-2027-takvimi", "YKS 2027 takvimi"],
            ["/rehber", "Rehber"],
            ["/veriler", "Veri kaynakları"],
            ["/sss", "Sık sorulan sorular"],
            ["/privacy", "Gizlilik"],
            ["/terms", "Kullanım Koşulları"],
            ["/support", "Destek"],
            ["/delete-account", "Hesap Silme"],
          ].map(([href, ad]) => (
            <li key={href}>
              <Link
                href={href}
                className="liste-baglanti min-h-11 text-[14px] text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {ad}
              </Link>
            </li>
          ))}
        </ul>

        <address className="mt-6 not-italic text-[14px] text-[var(--text-muted)]">
          Destek: {" "}
          <a
            href="mailto:destekmaraton@gmail.com"
            className="baglanti inline-flex min-h-11 items-center"
          >
            destekmaraton@gmail.com
          </a>
        </address>

        <p className="mt-10 text-[14px] text-[var(--text-muted)]">
          Maraton · Hedef aynı, rota farklı. Buradaki sayılar tahmindir, ÖSYM sonucu değildir.
        </p>
      </div>
    </footer>
  );
}
