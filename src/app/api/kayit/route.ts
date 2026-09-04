import { NextResponse } from "next/server";

export const runtime = "nodejs";

const HEDEF = process.env.KAYIT_WEBHOOK_URL;
const GECERLI = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Bekleme listesi kaydı. Adres burada saklanmaz; KAYIT_WEBHOOK_URL ile
 * tanımlanan servise (Buttondown, Resend, Formspree, kendi uç noktan) iletilir.
 */
export async function POST(request: Request) {
  let govde: { eposta?: string; kaynak?: string; izin?: boolean };
  try {
    govde = await request.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  const eposta = String(govde.eposta ?? "").trim().toLowerCase();
  if (!GECERLI.test(eposta) || eposta.length > 160) {
    return NextResponse.json({ hata: "E-posta adresi geçerli görünmüyor." }, { status: 400 });
  }
  if (govde.izin !== true) {
    return NextResponse.json({ hata: "Onay kutusu işaretlenmeli." }, { status: 400 });
  }
  if (!HEDEF) {
    return NextResponse.json(
      { hata: "Kayıt henüz açık değil. Birkaç gün içinde açılacak." },
      { status: 503 }
    );
  }

  try {
    const cevap = await fetch(HEDEF, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: eposta,
        kaynak: String(govde.kaynak ?? "site").slice(0, 60),
        tarih: new Date().toISOString(),
      }),
    });
    if (!cevap.ok) throw new Error(String(cevap.status));
  } catch {
    return NextResponse.json({ hata: "Kayıt alınamadı, sonra dener misin?" }, { status: 502 });
  }

  return NextResponse.json({ tamam: true });
}
