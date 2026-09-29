import type { Metadata } from "next";
import Link from "next/link";
import { YasalBolum, YasalSayfa } from "@/components/YasalSayfa";

export const metadata: Metadata = {
  title: "Maraton Gizlilik Politikası",
  description:
    "Maraton mobil uygulamasında işlenen veriler, kullanım amaçları, hizmet sağlayıcılar ve kullanıcı hakları hakkında gizlilik politikası.",
  alternates: { canonical: "https://maratonapp.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <YasalSayfa
      baslik="Maraton Gizlilik Politikası"
      aciklama="Bu politika, Maraton mobil uygulamasının ilk sürümünde hangi bilgileri neden işlediğimizi ve verileriniz üzerindeki haklarınızı açıklar."
      guncelleme="30 Eylül 2026"
    >
      <YasalBolum baslik="İletişim">
        <p>
          Maraton uygulamasıyla veya bu politikayla ilgili sorularınız için
          {" "}
          <a className="baglanti inline-flex min-h-11 items-center" href="mailto:destek@maratonapp.com">
            destek@maratonapp.com
          </a>
          {" "}adresine ulaşabilirsiniz.
        </p>
      </YasalBolum>

      <YasalBolum baslik="İşlenen bilgiler">
        <p>
          Hesap oluştururken adınız ve e-posta adresiniz işlenir. Uygulamayı
          kullandıkça çalışma kayıtlarınız, hedefleriniz, planlarınız, deneme
          sonuçlarınız, yanlış defteri kayıtlarınız ve uygulama tercihleriniz
          hesabınızda saklanabilir.
        </p>
        <p>
          Tercihinize bağlı olarak profil fotoğrafı ve yanlış soru görseli
          yükleyebilirsiniz. Bildirimleri etkinleştirirseniz bildirim tokenı ve
          bildirim tercihleriniz işlenebilir.
        </p>
        <p>
          Uygulama güvenliği, hata giderme ve performans takibi için uygulama
          sürümü, cihaz bilgileri ve teknik hata bilgileri işlenebilir.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Bilgileri neden kullanıyoruz?">
        <p>
          Bu bilgiler uygulamanın çalışması, verilerin cihazlar arasında
          senkronize edilmesi, deneyimin kişiselleştirilmesi, güvenliğin
          sağlanması, destek sunulması ve teknik hataların giderilmesi amacıyla
          kullanılır.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Hizmet sağlayıcılar">
        <p>
          Maraton&apos;un çalışması için aşağıdaki teknik hizmet sağlayıcılardan
          yararlanılabilir. Bu sağlayıcılar, ilgili hizmeti sunmak amacıyla veri
          işleyebilir:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-secondary)] marker:text-[var(--brand)]">
          <li><strong className="text-[var(--text)]">Supabase:</strong> hesap, veritabanı ve dosya saklama</li>
          <li><strong className="text-[var(--text)]">Sentry:</strong> hata ve performans takibi</li>
          <li><strong className="text-[var(--text)]">Expo/EAS:</strong> uygulama altyapısı, güncelleme ve bildirim</li>
          <li><strong className="text-[var(--text)]">Apple ve Google:</strong> giriş, bildirim ve mağaza hizmetleri</li>
        </ul>
        <p>Verileriniz reklam amacıyla satılmaz.</p>
      </YasalBolum>

      <YasalBolum baslik="Saklama ve hesap silme">
        <p>
          Verileriniz hesabınız aktif olduğu sürece saklanabilir. Hesabınızı
          uygulama içinden silebilirsiniz. Hesap silindiğinde hesapla ilişkili
          kullanıcı verileri silinir.
        </p>
        <p>
          Ayrıntılı adımlar ve uygulamaya erişemediğiniz durumlarda kullanacağınız
          e-posta kanalı için
          {" "}
          <Link className="baglanti inline-flex min-h-11 items-center" href="/delete-account">
            Maraton Hesabı ve Verileri Silme
          </Link>
          {" "}sayfasını inceleyin.
        </p>
      </YasalBolum>

      <YasalBolum baslik="Haklarınız">
        <p>
          Hesabınızla ilişkili verilere erişme, yanlış bilgilerin düzeltilmesini
          isteme ve verilerinizin silinmesini talep etme hakkınız vardır. Bu
          talepler için
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
