import localFont from "next/font/local";

export const archivo = localFont({
  src: [
    { path: "./fonts/Archivo_400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Archivo_500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Archivo_600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Archivo_700.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-govde",
});

export const bricolage = localFont({
  src: "./fonts/Bricolage_400.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-baslik",
});

export const unbounded = localFont({
  src: "./fonts/Unbounded_600.ttf",
  weight: "600",
  display: "swap",
  variable: "--font-marka",
});
