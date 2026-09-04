import type { ReactNode } from "react";

export function Kart({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return <Tag className={`kart p-6 sm:p-7 ${className}`}>{children}</Tag>;
}

export function Etiket({ children }: { children: ReactNode }) {
  return <p className="etiket">{children}</p>;
}

export function Stat({
  etiket,
  deger,
  not,
  renk,
}: {
  etiket: string;
  deger: ReactNode;
  not?: string;
  renk?: string;
}) {
  return (
    <div>
      <Etiket>{etiket}</Etiket>
      <p className="sayi kart-sayi mt-2" style={renk ? { color: renk } : undefined}>
        {deger}
      </p>
      {not ? <p className="text-[13px] text-[var(--text-secondary)] mt-1">{not}</p> : null}
    </div>
  );
}
