import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik – Ne Topluyoruz, Ne Toplamıyoruz | Maraton",
  description:
    "Bu sitede sonucu görmek için e-posta istenmez. Netlerin ve hedefin yalnızca tarayıcında ve bağlantıda tutulur.",
  alternates: { canonical: "/gizlilik" },
};

const MADDELER = [
  ["Sonuç için e-posta istenmez.", "Hiçbir araç sonucu bir formun arkasında değil."],
  [
    "Kişisel veri toplanmaz.",
    "İsim, okul, telefon, doğum tarihi, T.C. kimlik numarası: hiçbiri sorulmaz.",
  ],
  [
    "Netler tarayıcıda kalır.",
    "Girdiğin netler sunucuya gönderilmez. Rotanı paylaşırsan sayılar bağlantının içinde taşınır, bir veritabanına yazılmaz.",
  ],
  [
    "Çerez kullanılmaz.",
    "Ziyaretçi sayısı çerezsiz bir sayaçla ölçülür; kişiye bağlanabilir bir kayıt tutulmaz.",
  ],
  [
    "E-posta yalnızca sen istersen.",
    "Uygulama duyurusu için bırakılan adres ayrı bir onay kutusuyla alınır, sadece o duyuru için kullanılır, üçüncü kişiyle paylaşılmaz ve her e-postada çıkış bağlantısı bulunur. Sonucu görmek için hiçbir yerde e-posta gerekmez.",
  ],
  [
    "Kullanıcıların önemli kısmı 18 yaşın altında.",
    "Bu yüzden veri toplamayı en baştan devre dışı bıraktık. Toplamadığımız veri sızmaz.",
  ],
];

export default function GizlilikSayfasi() {
  return (
    <section className="sinir py-14 sm:py-20">
      <h1 className="text-[clamp(28px,5vw,46px)] leading-tight">Gizlilik</h1>
      <ul className="mt-10 max-w-[680px] flex flex-col gap-6">
        {MADDELER.map(([baslik, metin]) => (
          <li key={baslik} className="kart p-6">
            <h2 className="text-[17px] font-semibold">{baslik}</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {metin}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[14px] text-[var(--text-muted)]">
        Soru için: merhaba@maratonapp.com
      </p>
    </section>
  );
}
