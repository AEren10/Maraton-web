export type Alan = "Sayısal" | "Eşit Ağırlık" | "Sözel" | "Dil";

export type Bolum = {
  ad: string;
  alan: Alan;
  /** Devlet üniversitelerinde en üst programın 2025 başarı sırası. */
  ustSira: number;
  /** Devlet üniversitelerinde son yerleşenin 2025 başarı sırası. */
  sonSira: number;
  /** Doğrulanabildiği yerde 2025 taban puanı ve programı. */
  ustPuan?: number;
  ustOrnek?: string;
  sonPuan?: number;
  sonOrnek?: string;
  dogrulanmis?: boolean;
};

export const BOLUM_KAYNAK =
  "2025 yerleştirme sonuçları. İki sayı veriyoruz: en üst devlet programının sırası ve o bölüme son yerleşenin sırası. Doğrulanmış işaretli satırların taban puanları kaynaktan alındı; diğerleri o yılın dağılımından çıkarılmış yaklaşık değerlerdir. Sıralar her yıl kayar.";

export const BOLUMLER: Bolum[] = [
  {
    ad: "Tıp", alan: "Sayısal", ustSira: 1169, sonSira: 39903,
    ustPuan: 534.82, ustOrnek: "Hacettepe (İngilizce)",
    sonPuan: 456.99, sonOrnek: "SBÜ Gülhane", dogrulanmis: true,
  },
  {
    ad: "Bilgisayar Mühendisliği", alan: "Sayısal", ustSira: 1800, sonSira: 220000,
    ustPuan: 534, ustOrnek: "ODTÜ Ankara", dogrulanmis: true,
  },
  {
    ad: "Hukuk", alan: "Eşit Ağırlık", ustSira: 1500, sonSira: 180000,
    ustPuan: 520, ustOrnek: "Galatasaray", dogrulanmis: true,
  },
  { ad: "Diş Hekimliği", alan: "Sayısal", ustSira: 9000, sonSira: 75000 },
  { ad: "Eczacılık", alan: "Sayısal", ustSira: 18000, sonSira: 120000 },
  { ad: "Veterinerlik", alan: "Sayısal", ustSira: 60000, sonSira: 260000 },
  { ad: "Elektrik-Elektronik Mühendisliği", alan: "Sayısal", ustSira: 4000, sonSira: 300000 },
  { ad: "Yazılım Mühendisliği", alan: "Sayısal", ustSira: 12000, sonSira: 320000 },
  { ad: "Endüstri Mühendisliği", alan: "Sayısal", ustSira: 6000, sonSira: 310000 },
  { ad: "Makine Mühendisliği", alan: "Sayısal", ustSira: 15000, sonSira: 400000 },
  { ad: "İnşaat Mühendisliği", alan: "Sayısal", ustSira: 30000, sonSira: 500000 },
  { ad: "Mimarlık", alan: "Sayısal", ustSira: 14000, sonSira: 330000 },
  { ad: "Fizyoterapi ve Rehabilitasyon", alan: "Sayısal", ustSira: 45000, sonSira: 260000 },
  { ad: "Beslenme ve Diyetetik", alan: "Sayısal", ustSira: 60000, sonSira: 300000 },
  { ad: "Hemşirelik", alan: "Sayısal", ustSira: 90000, sonSira: 480000 },
  { ad: "Psikoloji", alan: "Eşit Ağırlık", ustSira: 6000, sonSira: 190000 },
  { ad: "Rehberlik ve Psikolojik Danışmanlık", alan: "Eşit Ağırlık", ustSira: 25000, sonSira: 200000 },
  { ad: "Uluslararası İlişkiler", alan: "Eşit Ağırlık", ustSira: 20000, sonSira: 400000 },
  { ad: "İktisat", alan: "Eşit Ağırlık", ustSira: 12000, sonSira: 450000 },
  { ad: "İşletme", alan: "Eşit Ağırlık", ustSira: 15000, sonSira: 550000 },
  { ad: "Yönetim Bilişim Sistemleri", alan: "Eşit Ağırlık", ustSira: 40000, sonSira: 420000 },
  { ad: "Sınıf Öğretmenliği", alan: "Sözel", ustSira: 70000, sonSira: 300000 },
  { ad: "Türk Dili ve Edebiyatı", alan: "Sözel", ustSira: 30000, sonSira: 400000 },
  { ad: "Tarih", alan: "Sözel", ustSira: 45000, sonSira: 500000 },
  { ad: "Sosyoloji", alan: "Sözel", ustSira: 40000, sonSira: 450000 },
  { ad: "İngilizce Öğretmenliği", alan: "Dil", ustSira: 3000, sonSira: 60000 },
  { ad: "İngiliz Dili ve Edebiyatı", alan: "Dil", ustSira: 6000, sonSira: 120000 },
  { ad: "Mütercim-Tercümanlık", alan: "Dil", ustSira: 8000, sonSira: 140000 },
];

export const ALANLAR: Alan[] = ["Sayısal", "Eşit Ağırlık", "Sözel", "Dil"];

export const bolumAra = (q: string) => {
  const t = q.trim().toLocaleLowerCase("tr");
  if (t.length < 2) return [];
  return BOLUMLER.filter((b) => b.ad.toLocaleLowerCase("tr").includes(t)).slice(0, 6);
};

export const alaninBolumleri = (a: Alan) =>
  BOLUMLER.filter((b) => b.alan === a).sort((x, y) => x.ustSira - y.ustSira);

/** Verilen sıraya göre girilebilen ve az kalan bölümler. */
export function tercihListesi(sira: number) {
  const sirali = [...BOLUMLER].sort((a, b) => a.ustSira - b.ustSira);
  return {
    girer: sirali.filter((b) => b.sonSira >= sira),
    yakin: sirali.filter((b) => b.sonSira < sira && b.sonSira >= sira * 0.5),
  };
}
