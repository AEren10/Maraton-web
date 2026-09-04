import type { Arac } from "@/data/araclar";
import { DenemeGecmisi } from "../araclar/DenemeGecmisi";
import { DenemeOrtalamasi } from "../araclar/DenemeOrtalamasi";
import { GeriSayim } from "../araclar/GeriSayim";
import { NetHesaplama } from "../araclar/NetHesaplama";
import { ObpHesaplama } from "../araclar/ObpHesaplama";
import { PuanHesaplama } from "../araclar/PuanHesaplama";
import { SiralamaTablosu } from "../araclar/SiralamaTablosu";
import { TempoAraci } from "../araclar/TempoAraci";
import { BolumTablosu } from "../araclar/BolumTablosu";
import { TercihRobotu } from "../araclar/TercihRobotu";
import { TersArama } from "../araclar/TersArama";
import { RotaAkisiUrl } from "../rota/RotaAkisiUrl";

export function AracGovdesi({ arac, kalanGun }: { arac: Arac; kalanGun: number }) {
  switch (arac.tur) {
    case "net":
      return <NetHesaplama sinav={arac.varsayilan ?? "tyt"} />;
    case "obp":
      return <ObpHesaplama />;
    case "puan":
      return <PuanHesaplama />;
    case "rota":
      return <RotaAkisiUrl kalanGun={kalanGun} />;
    case "tempo":
      return (
        <div className="flex flex-col gap-6">
          <TempoAraci kalanGun={kalanGun} />
          <DenemeGecmisi />
        </div>
      );
    case "gunsayaci":
      return <GeriSayim kalanGun={kalanGun} />;
    case "ortalama":
      return (
        <div className="flex flex-col gap-6">
          <DenemeGecmisi />
          <DenemeOrtalamasi />
        </div>
      );
    case "siralama":
      return <SiralamaTablosu />;
    case "tercih":
      return <TercihRobotu />;
    case "bolum":
      return (
        <div className="flex flex-col gap-6">
          <TersArama />
          <BolumTablosu />
        </div>
      );
  }
}
