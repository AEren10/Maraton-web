import { ImageResponse } from "next/og";
import { ARACLAR, aracBul } from "@/data/araclar";
import { aracIcerikBul } from "@/data/aracIcerik";

export const alt = "Maraton YKS aracı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ARACLAR.map((a) => ({ slug: a.slug }));
}

export default async function AracOgGorseli({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const arac = aracBul(slug);
  const icerik = aracIcerikBul(slug);
  const aksan = "#EC3347";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: "#0E1015", color: "#F5F7FA",
          padding: "64px 72px", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: aksan }}>Maraton</span>
          <span style={{ fontSize: 21, color: "#838D9B" }}>YKS rehberi</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 21, letterSpacing: 3, color: aksan }}>
            {(arac?.kategori ?? "Araç").toLocaleUpperCase("tr")}
          </span>
          <span style={{ fontSize: 66, lineHeight: 1.1, maxWidth: 950 }}>
            {arac?.h1 ?? "YKS aracı"}
          </span>
          <span style={{ fontSize: 25, lineHeight: 1.45, color: "#B3BCC8", maxWidth: 940 }}>
            {(icerik?.kisaCevap ?? arac?.description ?? "").slice(0, 150)}
          </span>
        </div>

        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 28, fontSize: 23,
          }}
        >
          <span style={{ color: "#838D9B" }}>Kayıt yok · e-posta yok</span>
          <span style={{ color: "#838D9B" }}>maratonapp.com/{slug}</span>
        </div>
      </div>
    ),
    size
  );
}
