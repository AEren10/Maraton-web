import type { Metadata } from "next";
import Link from "next/link";
import { YasalBolum, YasalSayfa } from "@/components/YasalSayfa";

export const metadata: Metadata = {
  title: "Maraton Hesabı ve Verileri Silme",
  description:
    "Maraton hesabınızı uygulama içinden silme veya e-posta ile hesap silme talebi gönderme adımları.",
  alternates: { canonical: "https://maratonapp.com/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <YasalSayfa
      baslik="Maraton Hesabı ve Verileri Silme"
      aciklama="Maraton hesabınızı uygulama içinden doğrudan silebilir veya uygulamaya erişemiyorsanız e-posta yoluyla silme talebi gönderebilirsiniz."
    >
      <YasalBolum baslik="Uygulama içinden silme">
        <p>Uygulamada aşağıdaki yolu izleyin:</p>
        <p className="ic-kart mt-4 px-4 py-3 font-semibold text-[var(--text)]">
          Profil <span aria-hidden="true">→</span> Ayarlar <span aria-hidden="true">→</span> Hesabımı sil
        </p>
        <p>Hesap silme seçeneğine şu alternatif yoldan da ulaşabilirsiniz:</p>
        <p className="ic-kart mt-4 px-4 py-3 font-semibold text-[var(--text)]">
          Profil <span aria-hidden="true">→</span> Ayarlar <span aria-hidden="true">→</span> Gizlilik ve şartlar <span aria-hidden="true">→</span> Hesabımı sil
        </p>
      </YasalBolum>

      <YasalBolum baslik="Uygulamaya erişemiyorsanız">
        <p>
          Uygulamayı kaldırdıysanız veya uygulamaya erişemiyorsanız,
          hesabınızda kullandığınız e-posta adresinden
          {" "}
          <a className="baglanti inline-flex min-h-11 items-center" href="mailto:destek@maratonapp.com">
            destek@maratonapp.com
          </a>
          {" "}adresine silme talebi gönderin.
        </p>
        <p>
          Talep, hesapla ilişkili e-posta adresi üzerinden doğrulanır. Sizden
          şifre, kimlik fotoğrafı veya başka bir kişisel bilgi istemeyiz.
        </p>
        <a
          className="btn btn-brand mt-6 min-h-11 w-full sm:w-auto"
          href="mailto:destek@maratonapp.com?subject=Maraton%20Hesap%20Silme%20Talebi"
        >
          Hesap Silme Talebi Gönder
        </a>
      </YasalBolum>

      <YasalBolum baslik="Hangi veriler silinir?">
        <p>
          Hesap silindiğinde profiliniz, çalışma kayıtlarınız, deneme
          sonuçlarınız, hedefleriniz, planlarınız, yanlış defteri kayıtlarınız
          ve yüklediğiniz kullanıcı dosyaları silinir.
        </p>
        <p>
          Verilerin nasıl işlendiği hakkında daha fazla bilgi için
          {" "}
          <Link className="baglanti inline-flex min-h-11 items-center" href="/privacy">
            Maraton Gizlilik Politikası
          </Link>
          {" "}sayfasını inceleyin.
        </p>
      </YasalBolum>
    </YasalSayfa>
  );
}
