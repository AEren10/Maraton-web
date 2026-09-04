import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Ikon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", background: "#EC3347", color: "#fff",
          fontSize: 42, fontWeight: 700, borderRadius: 14, fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    size
  );
}
