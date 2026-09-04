import { ImageResponse } from "next/og";
import { SINAV_YILI, kalanGun } from "@/lib/sinav";

export const alt = "Maraton – YKS net hesaplama, puan ve sıralama araçları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgGorseli() {
  const gun = kalanGun();
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
          <span style={{ fontSize: 34, fontWeight: 700, color: "#EC3347" }}>Maraton</span>
          <span style={{ fontSize: 22, color: "#838D9B" }}>YKS rehberi</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 62, lineHeight: 1.12, maxWidth: 880 }}>
            Netini hesapla, sıranı gör, neyi çalışacağını bul.
          </span>
          <span style={{ fontSize: 26, color: "#B3BCC8", maxWidth: 820 }}>
            On iki araç ve bir rehber. Kayıt yok, e-posta yok.
          </span>
        </div>

        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 76, fontWeight: 700, color: "#EC3347" }}>{gun}</span>
            <span style={{ fontSize: 24, color: "#838D9B" }}>
              gün · YKS {SINAV_YILI}
            </span>
          </div>
          <span style={{ fontSize: 24, color: "#838D9B" }}>maratonapp.com</span>
        </div>
      </div>
    ),
    size
  );
}
