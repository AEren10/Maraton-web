export type PaylasimVerisi = {
  /** Kartın üst satırı: hangi araçtan geldiği. */
  arac: string;
  /** Ortadaki büyük sayı. */
  anaSayi: string;
  anaEtiket: string;
  /** Alt kısımdaki ayrıntı satırları. */
  satirlar: [string, string][];
  /** Paylaşılan bağlantı; sonucu geri açan adres. */
  url: string;
  /** Mesaj uygulamalarına düşen metin. */
  metin: string;
};

const G = 1080;
const Y = 1920;

const RENK = {
  zemin: "#0E1015",
  kart: "#181B22",
  cizgi: "rgba(255,255,255,0.10)",
  marka: "#EC3347",
  metin: "#F5F7FA",
  ikincil: "#B3BCC8",
  soluk: "#838D9B",
};

function yuvarlak(c: CanvasRenderingContext2D, x: number, y: number, g: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + g, y, x + g, y + h, r);
  c.arcTo(x + g, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + g, y, r);
  c.closePath();
}

/** 9:16 hikâye kartını çizer ve PNG blob'u döndürür. */
export async function storyKarti(v: PaylasimVerisi): Promise<Blob | null> {
  const tuval = document.createElement("canvas");
  tuval.width = G;
  tuval.height = Y;
  const c = tuval.getContext("2d");
  if (!c) return null;

  try {
    await document.fonts.ready;
  } catch {
    /* font yüklenmediyse sistem yazı tipiyle devam */
  }

  const sans = 'Figtree, "Segoe UI", system-ui, sans-serif';

  c.fillStyle = RENK.zemin;
  c.fillRect(0, 0, G, Y);

  const parilti = c.createRadialGradient(G * 0.8, 120, 0, G * 0.8, 120, 900);
  parilti.addColorStop(0, "rgba(236,51,71,0.22)");
  parilti.addColorStop(1, "rgba(236,51,71,0)");
  c.fillStyle = parilti;
  c.fillRect(0, 0, G, Y);

  c.fillStyle = RENK.marka;
  c.font = `700 58px ${sans}`;
  c.fillText("Maraton", 90, 170);
  c.fillStyle = RENK.soluk;
  c.font = `400 34px ${sans}`;
  c.fillText("YKS rehberi", 350, 170);

  c.fillStyle = RENK.soluk;
  c.font = `600 32px ${sans}`;
  c.letterSpacing = "4px";
  c.fillText(v.arac.toLocaleUpperCase("tr"), 90, 420);
  c.letterSpacing = "0px";

  c.fillStyle = RENK.marka;
  c.font = `700 220px ${sans}`;
  c.fillText(v.anaSayi, 84, 640);

  c.fillStyle = RENK.ikincil;
  c.font = `600 40px ${sans}`;
  c.fillText(v.anaEtiket, 90, 710);

  const kartY = 830;
  const kartH = 120 + v.satirlar.length * 96;
  c.fillStyle = RENK.kart;
  yuvarlak(c, 84, kartY, G - 168, kartH, 40);
  c.fill();

  v.satirlar.forEach(([ad, deger], i) => {
    const y = kartY + 108 + i * 96;
    c.fillStyle = RENK.soluk;
    c.font = `500 38px ${sans}`;
    c.fillText(ad, 140, y);
    c.fillStyle = RENK.metin;
    c.font = `700 44px ${sans}`;
    c.textAlign = "right";
    c.fillText(deger, G - 140, y);
    c.textAlign = "left";
    if (i < v.satirlar.length - 1) {
      c.strokeStyle = RENK.cizgi;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(140, y + 32);
      c.lineTo(G - 140, y + 32);
      c.stroke();
    }
  });

  c.strokeStyle = RENK.cizgi;
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(90, Y - 230);
  c.lineTo(G - 90, Y - 230);
  c.stroke();

  c.fillStyle = RENK.metin;
  c.font = `600 40px ${sans}`;
  c.fillText("Kendi netini hesapla", 90, Y - 150);
  c.fillStyle = RENK.marka;
  c.font = `700 40px ${sans}`;
  c.fillText("maratonapp.com", 90, Y - 90);

  return new Promise((coz) => tuval.toBlob((b) => coz(b), "image/png"));
}

/** Adres çubuğunu sonuca göre günceller; sayfayı yeniden yüklemez. */
export function adresiGuncelle(parametreler: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const u = new URL(window.location.href);
  u.search = "";
  for (const [k, d] of Object.entries(parametreler)) u.searchParams.set(k, String(d));
  window.history.replaceState(null, "", u.toString());
}

export function adrestenOku() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}
