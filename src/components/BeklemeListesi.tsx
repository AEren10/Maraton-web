"use client";

import { useState } from "react";
import { olay } from "./Olcum";

type Durum = "bos" | "gonderiliyor" | "tamam" | "hata";

/** Sonucu engellemeyen kayıt kutusu. Sonuç görüldükten sonra gösterilir. */
export function BeklemeListesi({
  kaynak,
  baslik = "Tarihleri kaçırma",
  metin = "ÖSYM başvuru takvimi, sınav tarihi ve tercih dönemi açıklandığında tek satırlık bir hatırlatma gönderiyoruz. Bir de yeni yılın sıralama verileri çıkınca bu sayfadaki sayılar güncellenince haber veriyoruz.",
}: {
  kaynak: string;
  baslik?: string;
  metin?: string;
}) {
  const [eposta, setEposta] = useState("");
  const [izin, setIzin] = useState(false);
  const [durum, setDurum] = useState<Durum>("bos");
  const [mesaj, setMesaj] = useState("");

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    setDurum("gonderiliyor");
    try {
      const cevap = await fetch("/api/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eposta, izin, kaynak }),
      });
      const veri = await cevap.json();
      if (!cevap.ok) throw new Error(veri.hata ?? "Olmadı.");
      setDurum("tamam");
      olay("bekleme_listesi_kaydi", { kaynak });
    } catch (hata) {
      setDurum("hata");
      setMesaj(hata instanceof Error ? hata.message : "Olmadı, sonra dener misin?");
    }
  };

  if (durum === "tamam") {
    return (
      <div className="kart kart-vurgu mt-6 p-6">
        <p className="etiket" style={{ color: "var(--up)" }}>
          Kaydedildi
        </p>
        <p className="mt-3 text-[16px] text-[var(--text-secondary)]">
          Başvuru ve tercih tarihleri yaklaşınca haber vereceğiz. Yılda birkaç e-posta,
          fazlası yok.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={gonder} className="kart kart-vurgu mt-6 p-6">
      <p className="text-[18px] font-semibold">{baslik}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">{metin}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={eposta}
          onChange={(e) => setEposta(e.target.value)}
          placeholder="eposta@ornek.com"
          aria-label="E-posta adresin"
          className="giris flex-1"
        />
        <button type="submit" className="btn btn-brand shrink-0" disabled={durum === "gonderiliyor"}>
          {durum === "gonderiliyor" ? "Kaydediliyor" : "Hatırlat"}
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={izin}
          onChange={(e) => setIzin(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
        />
        <span className="text-[13px] leading-relaxed text-[var(--text-muted)]">
          YKS takvimi ve veri güncellemeleri için bana e-posta gönderilmesini kabul
          ediyorum. Adresim başka amaçla kullanılmaz, üçüncü kişiyle paylaşılmaz; her
          e-postadaki bağlantıyla tek tıkla çıkabilirim. 18 yaşından küçüksen velinden
          izin al.
        </span>
      </label>

      {durum === "hata" ? (
        <p className="mt-4 text-[13px]" style={{ color: "var(--brand-light)" }}>
          {mesaj}
        </p>
      ) : null}
    </form>
  );
}
