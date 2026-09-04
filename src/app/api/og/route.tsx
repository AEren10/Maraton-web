import { ImageResponse } from "next/og";
import { DERSLER, toplam } from "@/lib/dersler";
import { rotaCikar } from "@/lib/rota";
import { rotaParse } from "@/lib/url";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RENK: Record<string, string> = {
  turkce: "#58A7FA",
  matematik: "#FF9F2E",
  sosyal: "#A78BFA",
  fen: "#30D98A",
};

async function fontYukle(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const sp = Object.fromEntries(new URL(request.url).searchParams);
  const { hedef, mevcut } = rotaParse(sp);
  const bas = Math.round(toplam(mevcut));
  const son = hedef > bas ? hedef : bas;
  const { artis } = rotaCikar(mevcut, son);
  const font = await fontYukle();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: "#171C23", color: "#F5F7FA", padding: "56px 64px",
          fontFamily: font ? "Space Grotesk" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4 }}>
          <span>MARATON</span>
          <span style={{ color: "#6F7785" }}>YKS 2027</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 56 }}>
          <span style={{ fontSize: 96, color: "#A7B7C5" }}>{bas}</span>
          <div style={{ display: "flex", width: 180, height: 4, background: "#EC3347" }} />
          <span style={{ fontSize: 132, color: "#F5F7FA" }}>{son}</span>
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#EC3347", marginTop: 8 }}>
          +{son - bas} NET
        </div>

        <div style={{ display: "flex", gap: 44, marginTop: 48 }}>
          {DERSLER.map((d) => (
            <div key={d.key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 18, letterSpacing: 3, color: "#6F7785" }}>
                {d.ad.toLocaleUpperCase("tr")}
              </span>
              <span style={{ fontSize: 44, color: RENK[d.key] }}>+{artis[d.key]}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex", justifyContent: "space-between", marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, fontSize: 22,
          }}
        >
          <span style={{ letterSpacing: 3 }}>HEDEF AYNI. ROTA FARKLI.</span>
          <span style={{ color: "#6F7785" }}>maratonapp.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" as const }]
        : undefined,
    }
  );
}
