"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Her yol değişiminde içerik yeniden monte olur ve yukarı doğru belirir. */
export function SayfaGecisi({ children }: { children: ReactNode }) {
  const yol = usePathname();
  return (
    <div key={yol} className="sayfa-girer">
      {children}
    </div>
  );
}
