import Link from "next/link";
import { ARACLAR } from "@/data/araclar";

export function SiteAlt() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="sinir py-12">
        <nav aria-label="Araçlar">
          <p className="etiket">Araçlar</p>
          <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {ARACLAR.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}`}
                  className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text)]"
                >
                  {a.ad}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line-soft)] pt-6">
          {[
            ["/rehber", "Rehber"],
            ["/veriler", "Veri kaynakları"],
            ["/sss", "Sık sorulan sorular"],
            ["/gizlilik", "Gizlilik"],
            ["mailto:merhaba@maratonapp.com", "İletişim"],
          ].map(([href, ad]) => (
            <li key={href}>
              <Link href={href} className="text-[14px] text-[var(--text-muted)] hover:text-[var(--text)]">
                {ad}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[14px] text-[var(--text-muted)]">
          Maraton · Hedef aynı, rota farklı. Buradaki sayılar tahmindir, ÖSYM sonucu değildir.
        </p>
      </div>
    </footer>
  );
}
