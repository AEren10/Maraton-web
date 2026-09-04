import { ARACLAR, KATEGORILER, POPULER, kategorininAraclari, type Arac } from "@/data/araclar";
import { AracKarti } from "./AracKarti";
import { Beliriyor } from "./Beliriyor";

const IZGARA = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

function Grup({ baslik, not, araclar }: { baslik: string; not?: string; araclar: Arac[] }) {
  if (araclar.length === 0) return null;
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-[17px]">{baslik}</h3>
        {not ? <span className="etiket">{not}</span> : null}
      </div>
      <Beliriyor as="ul" kademe className={`${IZGARA} mt-4`}>
        {araclar.map((a) => (
          <AracKarti key={a.slug} arac={a} />
        ))}
      </Beliriyor>
    </section>
  );
}

export function AracIzgarasi({ gruplu = true }: { gruplu?: boolean }) {
  if (!gruplu) {
    return (
      <Beliriyor as="ul" kademe className={IZGARA}>
        {ARACLAR.map((a) => (
          <AracKarti key={a.slug} arac={a} />
        ))}
      </Beliriyor>
    );
  }

  return (
    <div>
      <Grup baslik="En çok kullanılan" not={`${POPULER.length} araç`} araclar={POPULER} />
      {KATEGORILER.map((k) => (
        <Grup key={k} baslik={k} araclar={kategorininAraclari(k)} />
      ))}
    </div>
  );
}
