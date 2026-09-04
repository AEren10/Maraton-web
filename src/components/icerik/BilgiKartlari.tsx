import { BILGI, BILGI_KATEGORILERI, bilgiKategorisi, type BilgiKarti } from "@/data/bilgi";
import { Beliriyor } from "../Beliriyor";

const sira = (baslik: string) => BILGI.findIndex((b) => b.baslik === baslik) + 1;

function Liste({ konular }: { konular: BilgiKarti[] }) {
  return (
    <Beliriyor kademe className="mt-2">
      {konular.map((k) => (
        <article key={k.baslik} className="konu">
          <span className="konu-no" aria-hidden>
            {String(sira(k.baslik)).padStart(2, "0")}
          </span>
          <div>
            <h3 className="konu-baslik">{k.baslik}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {k.metin}
            </p>
          </div>
        </article>
      ))}
    </Beliriyor>
  );
}

/** Rehber konuları: kart değil, numaralı okuma listesi. */
export function BilgiKartlari({ gruplu = true }: { gruplu?: boolean }) {
  if (!gruplu) return <Liste konular={BILGI} />;

  return (
    <div className="max-w-[780px]">
      {BILGI_KATEGORILERI.map((k) => (
        <section key={k} className="mt-10 first:mt-0">
          <h3 className="etiket border-b border-[var(--line)] pb-3">{k}</h3>
          <Liste konular={bilgiKategorisi(k)} />
        </section>
      ))}
    </div>
  );
}
