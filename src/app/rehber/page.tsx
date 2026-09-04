import type { Metadata } from "next";
import { BILGI, BILGI_KATEGORILERI, bilgiKategorisi } from "@/data/bilgi";

export const metadata: Metadata = {
  title: "YKS Rehberi – Net, OBP ve Baraj | Maraton",
  description:
    "Net nasıl hesaplanır, OBP kaç puan ekler, TYT barajı kaç, hangi ders daha hızlı yükselir? On iki konu, kısa ve sayılı.",
  alternates: { canonical: "/rehber" },
};

export default function RehberSayfasi() {
  return (
    <section className="sinir py-14 sm:py-20">
      <h1 className="text-[clamp(28px,5vw,44px)]">Rehber</h1>
      <div className="metin mt-5 max-w-[640px] text-[17px]">
        <p>
          On iki başlık, üç bölüm. Sınavın kuralları, yapısı ve çalışma düzeni. Sırayla
          okunmak zorunda değil; aradığın konuya soldaki listeden atlayabilirsin.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Rehber başlıkları" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          {BILGI_KATEGORILERI.map((k) => (
            <div key={k} className="mt-7 first:mt-0">
              <p className="etiket">{k}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {bilgiKategorisi(k).map((b) => (
                  <li key={b.baslik}>
                    <a
                      href={`#konu-${BILGI.indexOf(b)}`}
                      className="liste-baglanti text-[14px] text-[var(--text-secondary)] hover:text-[var(--text)]"
                    >
                      {b.baslik}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="max-w-[720px]">
          {BILGI_KATEGORILERI.map((k) => (
            <section key={k} className="mt-12 first:mt-0">
              <h2 className="etiket border-b border-[var(--line)] pb-3">{k}</h2>
              {bilgiKategorisi(k).map((b, i) => (
                <article key={b.baslik} id={`konu-${BILGI.indexOf(b)}`} className="konu scroll-mt-24">
                  <span className="konu-no" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="konu-baslik">{b.baslik}</h3>
                    <p className="mt-2.5 text-[16px] leading-relaxed text-[var(--text-secondary)]">
                      {b.metin}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
