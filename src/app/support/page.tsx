import type { Metadata } from "next";
import Link from "next/link";
import { YasalBolum, YasalSayfa } from "@/components/YasalSayfa";

export const metadata: Metadata = {
  title: "Maraton Destek",
  description:
    "Maraton mobil uygulaması için teknik destek, hesap işlemleri ve gizlilik talepleri hakkında iletişim bilgileri.",
  alternates: { canonical: "https://maratonapp.com/support" },
};

export default function SupportPage() {
  return (
    <YasalSayfa
      baslik="Maraton Destek"
      aciklama="Teknik sorunlar, hesap işlemleri ve gizlilik talepleri için Maraton destek ekibine e-posta gönderebilirsiniz."
    >
      <YasalBolum baslik="Bize ulaşın">
        <p>
          Destek için
          {" "}
          <a className="baglanti inline-flex min-h-11 items-center" href="mailto:destek@maratonapp.com">
            destek@maratonapp.com
          </a>
          {" "}adresini kullanın. Sorununuzu daha hızlı inceleyebilmemiz için
          mesajınıza uygulama sürümünü, cihaz modelini ve sorunun kısa bir
          açıklamasını ekleyebilirsiniz.
        </p>
        <a className="btn btn-brand mt-6 min-h-11 w-full sm:w-auto" href="mailto:destek@maratonapp.com">
          Destek Ekibine Yaz
        </a>
      </YasalBolum>

      <nav className="kart p-5 sm:p-7" aria-label="Destek bağlantıları">
        <h2 className="text-[20px] sm:text-[22px]">Yararlı bağlantılar</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            ["/privacy", "Gizlilik Politikası"],
            ["/terms", "Kullanım Koşulları"],
            ["/delete-account", "Hesap ve Verileri Silme"],
          ].map(([href, ad]) => (
            <li key={href}>
              <Link
                className="inline-flex min-h-11 w-full items-center rounded-lg px-3 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
                href={href}
              >
                {ad} <span className="ml-auto text-[var(--brand)]" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </YasalSayfa>
  );
}
