import Link from "next/link";
import { AracIzgarasi } from "@/components/AracIzgarasi";

export const metadata = { title: "Sayfa bulunamadı | Maraton", robots: { index: false } };

export default function Bulunamadi() {
  return (
    <section className="sinir py-16 sm:py-24">
      <p className="etiket" style={{ color: "var(--brand)" }}>
        404
      </p>
      <h1 className="mt-3 text-[clamp(28px,5vw,44px)]">Bu sayfa yok.</h1>
      <div className="metin mt-5 max-w-[620px] text-[17px]">
        <p>
          Adres yanlış olabilir ya da sayfa taşınmış olabilir. Aradığın hesaplayıcı
          büyük ihtimalle aşağıdadır.
        </p>
      </div>
      <p className="mt-6">
        <Link href="/" className="baglanti text-[15px]">
          Ana sayfaya dön
        </Link>
      </p>
      <div className="mt-12">
        <AracIzgarasi />
      </div>
    </section>
  );
}
