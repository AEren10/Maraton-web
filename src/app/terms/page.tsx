import type { Metadata } from "next";
import Link from "next/link";
import { YasalBolum, YasalSayfa } from "@/components/YasalSayfa";

export const metadata: Metadata = {
  title: "Maraton Kullanım Koşulları",
  description:
    "Maraton mobil uygulamasının kullanımına, kullanıcı sorumluluklarına ve hizmet koşullarına ilişkin kısa bilgiler.",
  alternates: { canonical: "https://maratonapp.com/terms" },
  openGraph: { url: "https://maratonapp.com/terms" },
};

export default function TermsPage() {
  return (
    <YasalSayfa
      baslik="Maraton Kullanım Koşulları"
      aciklama="Bu koşullar, eğitim ve çalışma takibi için sunulan Maraton mobil uygulamasının kullanımına ilişkin temel kuralları açıklar."
      guncelleme="30 Eylül 2026"
    >
      <YasalBolum baslik="Hizmetin kapsamı">
        <p>
          Maraton, eğitim ve çalışma takip uygulamasıdır. Uygulamadaki veriler,
          tahminler ve öneriler bilgilendirme amacı taşır; sınav başarısı, puan,
          net veya sıralama garantisi vermez.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Kullanıcı sorumlulukları">
        <p>
          Hesabınızın ve giriş bilgilerinizin güvenliğinden siz sorumlusunuz.
          Uygulama hukuka aykırı, yanıltıcı, başkalarının haklarını ihlal eden
          veya hizmetin çalışmasını bozacak biçimde kullanılamaz.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Fikri haklar ve hizmet değişiklikleri">
        <p>
          Maraton markası, tasarımı ve yazılımı ilgili hak sahiplerine aittir.
          Hizmet; bakım, güvenlik çalışmaları ve güncellemeler nedeniyle zaman
          içinde değişebilir veya geçici olarak kullanılamayabilir.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Hesabınızı silme">
        <p>
          Hesabınızı istediğiniz zaman silebilirsiniz. İzlenecek adımlar için
          {" "}
          <Link className="baglanti inline-flex min-h-11 items-center" href="/delete-account">
            Maraton Hesabı ve Verileri Silme
          </Link>
          {" "}sayfasını inceleyin.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Gizlilik ve iletişim">
        <p>
          Verilerinizin işlenmesi hakkında
          {" "}
          <Link className="baglanti inline-flex min-h-11 items-center" href="/privacy">
            Maraton Gizlilik Politikası
          </Link>
          {" "}geçerlidir. Sorularınız için
          {" "}
          <a className="baglanti inline-flex min-h-11 items-center" href="mailto:destek@maratonapp.com">
            destek@maratonapp.com
          </a>
          {" "}adresine yazabilirsiniz.
        </p>
      </YasalBolum>
    </YasalSayfa>
  );
}
