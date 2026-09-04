"use client";

import { useMemo, useState } from "react";
import { KEYS, SIFIR, TAVAN, toplam, type DersKey, type Netler } from "@/lib/dersler";
import { rotaCikar } from "@/lib/rota";
import { olay } from "../Olcum";
import { Buton } from "../ui/Buton";
import { Dagitim } from "./Dagitim";
import { FarkEkrani } from "./FarkEkrani";
import { HedefAdimi } from "./HedefAdimi";
import { HedefSlider } from "./HedefSlider";
import { NetGirisi } from "./NetGirisi";
import { RotaKarti } from "./RotaKarti";

type Props = {
  kalanGun: number;
  baslangicHedef?: number;
  baslangicNetler?: Netler;
};

export function RotaAkisi({ kalanGun, baslangicHedef, baslangicNetler }: Props) {
  const [adim, setAdim] = useState(
    baslangicHedef && baslangicNetler ? 4 : baslangicHedef ? 2 : 1
  );
  const [hedef, setHedef] = useState(baslangicHedef ?? 72);
  const [mevcut, setMevcut] = useState<Netler>(baslangicNetler ?? { ...SIFIR });
  // Elle yapılan düzeltme yalnızca girildiği hedef/net çiftine ait olur;
  // hedef kayınca otomatik dağıtıma dönülür.
  const [elle, setElle] = useState<{ anahtar: string; artis: Netler } | null>(null);

  const hesap = useMemo(() => rotaCikar(mevcut, hedef), [mevcut, hedef]);
  const anahtar = `${hedef}:${KEYS.map((k) => mevcut[k]).join("-")}`;
  const artis = elle?.anahtar === anahtar ? elle.artis : hesap.artis;

  const degis = (k: DersKey, d: number) => {
    olay("dagitim_kurcalandi", { ders: k });
    setElle({
      anahtar,
      artis: { ...artis, [k]: Math.max(0, Math.min(artis[k] + d, TAVAN[k] - mevcut[k])) },
    });
  };

  const hedefeGec = (h: number) => {
    olay("slider_oynatildi", { hedef: h });
    setHedef(h);
  };

  const tam = Math.round(toplam(mevcut) + toplam(artis)) === Math.round(hedef);

  if (adim === 1)
    return (
      <HedefAdimi
        onDevam={(h) => {
          olay("hedef_girildi", { hedef: h });
          setHedef(h);
          setAdim(2);
        }}
      />
    );

  if (adim === 2)
    return (
      <NetGirisi
        hedef={hedef}
        baslangic={mevcut}
        onDevam={(n) => {
          olay("netler_girildi", { toplam: toplam(n) });
          setMevcut(n);
          setAdim(3);
        }}
      />
    );

  if (adim === 3)
    return (
      <FarkEkrani mevcut={toplam(mevcut)} hedef={hedef} onDevam={() => { olay("fark_goruldu"); setAdim(4); }} />
    );

  return (
    <div className="w-full max-w-[560px]">
      {adim === 4 ? (
        <>
          <p className="etiket">
            {hesap.uyari ? "Dürüst cevap" : `${Math.round(hesap.fark)} net nereden gelecek`}
          </p>

          {hesap.uyari ? (
            <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "var(--brand-light)" }}>
              {hesap.uyari}
            </p>
          ) : null}

          <div className="mt-5">
            <Dagitim
              mevcut={mevcut}
              artis={artis}
              hedef={hedef}
              kaldirac={hesap.kaldirac}
              onDegis={degis}
            />
          </div>

          <HedefSlider
            hedef={hedef}
            mevcutToplam={toplam(mevcut)}
            kalanGun={kalanGun}
            onDegis={hedefeGec}
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Buton className="flex-1" disabled={!tam} onClick={() => setAdim(5)}>
              {tam ? "Rotayı kapat →" : "Önce toplamı tuttur"}
            </Buton>
            <Buton tur="sessiz" onClick={() => setAdim(2)}>
              Netleri düzelt
            </Buton>
          </div>
        </>
      ) : (
        <>
          <RotaKarti mevcut={mevcut} artis={artis} hedef={hedef} />
          <button
            onClick={() => setAdim(4)}
            className="etiket mt-6 underline underline-offset-4"
          >
            Dağıtıma dön
          </button>
        </>
      )}
    </div>
  );
}
