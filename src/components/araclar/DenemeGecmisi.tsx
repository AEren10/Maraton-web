"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  denemeEkle,
  denemeSil,
  denemeleriOku,
  denemeleriTemizle,
  ozetle,
  tarihYazi,
  type Deneme,
} from "@/lib/gecmis";
import { netYazi } from "@/lib/net";
import { olay } from "../Olcum";
import { Stat } from "../ui/Kart";
import { GecmisCizgisi } from "../grafik/GecmisCizgisi";

export function DenemeGecmisi() {
  const [liste, setListe] = useState<Deneme[]>([]);
  const [yuklendi, setYuklendi] = useState(false);
  const [net, setNet] = useState("");
  const [not, setNot] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depolama bir kez okunur
    setListe(denemeleriOku());
    setYuklendi(true);
  }, []);

  const ozet = ozetle(liste);
  const sayi = Number(net.replace(",", "."));
  const gecerli = Number.isFinite(sayi) && sayi > 0 && sayi <= 130;

  const ekle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gecerli) return;
    setListe(denemeEkle(sayi, not.trim() || undefined));
    setNet("");
    setNot("");
    olay("deneme_kaydedildi");
  };

  return (
    <div className="kart p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="etiket">Deneme geçmişin</p>
        <p className="text-[13px] text-[var(--text-muted)]">
          Bu tarayıcıda saklanır, sunucuya gitmez
        </p>
      </div>

      <form onSubmit={ekle} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <input
          type="text"
          inputMode="decimal"
          value={net}
          onChange={(e) => setNet(e.target.value)}
          placeholder="Toplam net, örn. 64,5"
          aria-label="Deneme neti"
          autoComplete="off"
          className="giris sayi sm:w-44"
        />
        <input
          type="text"
          value={not}
          onChange={(e) => setNot(e.target.value)}
          placeholder="Not, örn. 3D TYT-7"
          aria-label="Deneme notu"
          autoComplete="off"
          maxLength={40}
          className="giris flex-1"
        />
        <button type="submit" disabled={!gecerli} className="btn btn-brand shrink-0 px-5">
          Kaydet
        </button>
      </form>

      {!yuklendi ? null : liste.length === 0 ? (
        <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
          Henüz kayıt yok. Her denemeden sonra netini buraya yaz; üç kayıttan sonra
          trend, ortalama ve dalgalanma aralığın kendiliğinden çıkar.
        </p>
      ) : (
        <>
          {ozet && liste.length > 1 ? (
            <div className="mt-7">
              <GecmisCizgisi denemeler={liste} />
            </div>
          ) : null}

          {ozet ? (
            <div className="mt-6 grid grid-cols-2 gap-5 border-t border-[var(--line)] pt-6 sm:grid-cols-4">
              <Stat etiket="Son 3 ortalama" deger={netYazi(ozet.son3)} />
              <Stat etiket="Genel ortalama" deger={netYazi(ozet.ortalama)} />
              <Stat
                etiket="İlk kayda göre"
                deger={`${ozet.degisim >= 0 ? "+" : ""}${netYazi(ozet.degisim)}`}
                renk={ozet.degisim >= 0 ? "var(--up)" : "var(--down)"}
              />
              <Stat etiket="Aralık" deger={`${netYazi(ozet.enAz)}–${netYazi(ozet.enCok)}`} />
            </div>
          ) : null}

          <ul className="mt-6 border-t border-[var(--line)]">
            {[...liste].reverse().map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-3 border-b border-[var(--line-soft)] py-3 last:border-0"
              >
                <span className="min-w-0">
                  <span className="sayi text-[17px]">{netYazi(d.net)}</span>
                  <span className="etiket ml-3">{tarihYazi(d.tarih)}</span>
                  {d.not ? (
                    <span className="ml-3 truncate text-[13px] text-[var(--text-muted)]">
                      {d.not}
                    </span>
                  ) : null}
                </span>
                <button
                  onClick={() => setListe(denemeSil(d.id))}
                  aria-label={`${tarihYazi(d.tarih)} kaydını sil`}
                  className="kucuk-btn rounded-[10px] border border-transparent p-2 text-[var(--text-muted)]"
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setListe(denemeleriTemizle())}
            className="etiket mt-5 underline underline-offset-4"
          >
            Tümünü sil
          </button>
        </>
      )}
    </div>
  );
}
