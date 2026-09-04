import type { MetadataRoute } from "next";
import { ARACLAR } from "@/data/araclar";

const SITE = "https://maratonapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // İçerik gerçekten değiştiğinde elle güncelle; her derlemede değişmesi zayıf bir sinyal.
  const guncelleme = new Date("2026-09-04");
  return [
    { url: SITE, lastModified: guncelleme, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/araclar`, lastModified: guncelleme, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/rehber`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/veriler`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/sss`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/maraton`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.5 },
    ...ARACLAR.map((a) => ({
      url: `${SITE}/${a.slug}`,
      lastModified: guncelleme,
      changeFrequency: "weekly" as const,
      priority: a.tur === "rota" ? 0.9 : 0.7,
    })),
  ];
}
