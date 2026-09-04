"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ARACLAR } from "@/data/araclar";

const MENU = [
  { href: "/araclar", ad: "Araçlar" },
  { href: "/rehber", ad: "Rehber" },
  { href: "/sss", ad: "Sık sorulanlar" },
];

export function Navbar() {
  const [acik, setAcik] = useState(false);
  const yol = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--ink)]/80 backdrop-blur-xl">
      <div className="sinir flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setAcik(false)}>
          <span className="text-[26px] font-bold tracking-tight" style={{ color: "var(--brand)" }}>
            Maraton
          </span>
          <span className="hidden text-[13px] text-[var(--text-muted)] sm:inline">
            YKS rehberi
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="nav-link rounded-lg px-3 py-2 text-[15px] transition-colors hover:text-[var(--text)]"
              data-etkin={yol.startsWith(m.href) ? "evet" : "hayir"}
              style={{ color: yol.startsWith(m.href) ? "var(--text)" : "var(--text-secondary)" }}
            >
              {m.ad}
            </Link>
          ))}
          <Link href="/hedef-net-rotasi" className="btn btn-brand ml-3 px-5 py-2.5 text-[15px]">
            Hedef rotası
          </Link>
        </nav>

        <button
          className="kucuk-btn rounded-lg border border-[var(--line)] px-3 py-2 text-[14px] md:hidden"
          aria-expanded={acik}
          aria-label="Menüyü aç"
          onClick={() => setAcik((a) => !a)}
        >
          {acik ? "Kapat" : "Menü"}
        </button>
      </div>

      {acik ? (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-[var(--line)] bg-[var(--ink-2)] md:hidden">
          <div className="sinir grid gap-1 py-4">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href} onClick={() => setAcik(false)}
                className="rounded-lg px-2 py-2.5 text-[15px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]">
                {m.ad}
              </Link>
            ))}
            <p className="etiket mt-4 px-2">Tüm araçlar</p>
            {ARACLAR.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} onClick={() => setAcik(false)}
                className="rounded-lg px-2 py-2 text-[14px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]">
                {a.ad}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
