import type { Metadata, Viewport } from "next";
import { Figtree, Lora } from "next/font/google";
import { Olcum } from "@/components/Olcum";
import { SiteAlt } from "@/components/SiteAlt";
import { Navbar } from "@/components/Navbar";
import { SayfaGecisi } from "@/components/SayfaGecisi";
import "./globals.css";

const govde = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-govde",
});

const baslik = Lora({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-baslik",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maratonapp.com"),
  title: {
    default: "TYT Hedef Net Rotası 2027 – Kaç Nete Nasıl Çıkarsın? | Maraton",
    template: "%s",
  },
  description:
    "Hedef netini gir, mevcut netlerini yaz; hangi dersten kaç net kazanman gerektiğini ders ders gör. Kayıt yok, e-posta yok.",
  applicationName: "Maraton",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Maraton",
    url: "https://maratonapp.com",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1015",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${govde.variable} ${baslik.variable}`}>
      <body>
        <Navbar />
        <main>
          <SayfaGecisi>{children}</SayfaGecisi>
        </main>
        <SiteAlt />
        <Olcum />
      </body>
    </html>
  );
}
