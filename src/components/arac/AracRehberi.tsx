import type { MiniKart } from "@/data/aracIcerik";
import { Beliriyor } from "../Beliriyor";

export function AracRehberi({ kartlar }: { kartlar: MiniKart[] }) {
  return (
    <Beliriyor as="ul" kademe className="grid gap-4 sm:grid-cols-2">
      {kartlar.map((k) => (
        <li key={k.baslik} className="kart p-5">
          <h3 className="text-[16px] font-semibold">{k.baslik}</h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            {k.metin}
          </p>
        </li>
      ))}
    </Beliriyor>
  );
}
