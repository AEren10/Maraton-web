import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tur = "brand" | "sessiz";
const sinif = (t: Tur, extra = "") => `btn btn-${t} ${extra}`;

export function Buton({
  tur = "brand",
  className = "",
  children,
  ...rest
}: { tur?: Tur; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button className={sinif(tur, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButonLink({
  tur = "brand",
  className = "",
  children,
  href,
  ...rest
}: { tur?: Tur; children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={sinif(tur, className)} {...rest}>
      {children}
    </Link>
  );
}
