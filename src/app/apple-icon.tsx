import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIkon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", background: "#0E1015", color: "#EC3347",
          fontSize: 112, fontWeight: 700, fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    size
  );
}
