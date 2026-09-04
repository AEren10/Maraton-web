import type { ReactNode } from "react";
import { Beliriyor } from "./Beliriyor";

export function Bolum({
  id,
  etiket,
  baslik,
  alt,
  children,
}: {
  id?: string;
  etiket?: string;
  baslik?: string;
  alt?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="bolum border-t border-[var(--line-soft)]">
      <div className="sinir">
        <Beliriyor>
        {etiket ? <p className="etiket">{etiket}</p> : null}
        {baslik ? (
          <h2 className="mt-4 max-w-[720px] text-[clamp(24px,4vw,38px)] leading-tight">
            {baslik}
          </h2>
        ) : null}
        {alt ? (
          <p className="mt-4 max-w-[640px] text-[15px] text-[var(--text-secondary)]">{alt}</p>
        ) : null}
        </Beliriyor>
        <Beliriyor className={etiket || baslik ? "mt-10" : ""}>{children}</Beliriyor>
      </div>
    </section>
  );
}
