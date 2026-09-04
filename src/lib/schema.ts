const SITE = "https://maratonapp.com";

export const ORGANIZASYON = {
  "@type": "Organization",
  "@id": `${SITE}/#organizasyon`,
  name: "Maraton",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon` },
  description:
    "YKS hazırlığı için net hesaplama, puan tahmini ve hedef net rotası araçları.",
};

export const kirintiYolu = (parcalar: { ad: string; yol: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: parcalar.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.ad,
    item: `${SITE}${p.yol}`,
  })),
});

export const yazilimUygulamasi = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Maraton",
  applicationCategory: "EducationalApplication",
  operatingSystem: "iOS, Android",
  inLanguage: "tr-TR",
  publisher: ORGANIZASYON,
  description:
    "YKS hazırlığında günlük çalışma rotası: deneme sonrası güncellenen plan, konu borcu takibi ve hedef geri sayımı.",
};

export const nasilYapilir = (
  ad: string,
  aciklama: string,
  adimlar: { ad: string; metin: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: ad,
  description: aciklama,
  inLanguage: "tr-TR",
  step: adimlar.map((a, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: a.ad,
    text: a.metin,
  })),
});

export const websitesi = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#site`,
  name: "Maraton",
  url: SITE,
  inLanguage: "tr-TR",
  publisher: ORGANIZASYON,
  description:
    "YKS net hesaplama, puan tahmini, sıralama tablosu ve hedef net rotası araçları.",
};
