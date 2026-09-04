import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maraton – YKS rehberi",
    short_name: "Maraton",
    description:
      "YKS net hesaplama, puan tahmini, sıralama tablosu ve hedef net rotası araçları.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1015",
    theme_color: "#0E1015",
    lang: "tr",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
