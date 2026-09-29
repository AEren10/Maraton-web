import type { MetadataRoute } from "next";
import { ARACLAR } from "@/data/araclar";
import { BOLUMLER } from "@/data/bolumler";
import {
  KARSILASTIRMALAR,
  NETLER,
  ROTALAR,
  bolumSlug,
  karsilastirmaSlug,
  netSlug,
  rotaSlug,
} from "@/data/programatik";

const SITE = "https://maratonapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // İçerik gerçekten değiştiğinde elle güncelle; her derlemede değişmesi zayıf bir sinyal.
  const guncelleme = new Date("2026-09-04");
  const yasalGuncelleme = new Date("2026-09-30");
  return [
    { url: SITE, lastModified: guncelleme, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/araclar`, lastModified: guncelleme, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/rehber`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/yks-2027-takvimi`, lastModified: guncelleme, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/veriler`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/sss`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/maraton`, lastModified: guncelleme, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/privacy`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/support`, lastModified: yasalGuncelleme, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/delete-account`, lastModified: yasalGuncelleme, changeFrequency: "yearly", priority: 0.4 },
    ...ARACLAR.map((a) => ({
      url: `${SITE}/${a.slug}`,
      lastModified: guncelleme,
      changeFrequency: "weekly" as const,
      priority: a.tur === "rota" ? 0.9 : 0.7,
    })),
    ...BOLUMLER.map((b) => ({
      url: `${SITE}/bolum/${bolumSlug(b)}`,
      lastModified: guncelleme,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...NETLER.map((n) => ({
      url: `${SITE}/net/${netSlug(n)}`,
      lastModified: guncelleme,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...ROTALAR.map((r) => ({
      url: `${SITE}/net-rotasi/${rotaSlug(r.bas, r.son)}`,
      lastModified: guncelleme,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...KARSILASTIRMALAR.map((c) => ({
      url: `${SITE}/karsilastir/${karsilastirmaSlug(c.a, c.b)}`,
      lastModified: guncelleme,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
