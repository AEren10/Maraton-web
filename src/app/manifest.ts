import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maraton – YKS rehberi",
    short_name: "Maraton",
    description:
      "YKS net hesaplama, puan tahmini, sıralama tablosu ve hedef net rotası araçları.",
    start_url: "/",
    display: "standalone",
    background_color: "#1C1C23",
    theme_color: "#1C1C23",
    lang: "tr",
    icons: [{ src: "/brand/maraton-icon-v2.png", sizes: "1024x1024", type: "image/png" }],
  };
}
