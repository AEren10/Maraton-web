"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ARACLAR, POPULER } from "@/data/araclar";

const MENU = [
  { href: "/araclar", ad: "Araçlar" },
  { href: "/rehber", ad: "Rehber" },
  { href: "/sss", ad: "Sık sorulanlar" },
];

export function Navbar() {
  const [acik, setAcik] = useState(false);
  const [kaydi, setKaydi] = useState(false);
  const yol = usePathname();

  useEffect(() => {
    const bak = () => setKaydi(window.scrollY > 24);
    bak();
    window.addEventListener("scroll", bak, { passive: true });
    return () => window.removeEventListener("scroll", bak);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-0 transition-[padding] duration-300 sm:data-[kaydi=true]:pt-3"
      data-kaydi={kaydi}>
      <div className={`sinir transition-[max-width] duration-300 ${kaydi ? "sm:max-w-[1000px]" : ""}`}>
        <div
          className={`flex h-16 items-center justify-between gap-6 px-4 transition-all duration-300 sm:px-6 ${
            kaydi
              ? "border border-[var(--line)] bg-[var(--ink)]/85 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:rounded-2xl"
              : "border border-transparent border-b-[var(--line)] bg-[var(--ink)]/70 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold tracking-tight" style={{ color: "var(--brand)" }}>
              Maraton
            </span>
            <span className="hidden text-[13px] text-[var(--text-muted)] sm:inline">
              YKS rehberi
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href}
                className="nav-link rounded-lg px-3 py-2 text-[15px] transition-colors hover:text-[var(--text)]"
                data-etkin={yol.startsWith(m.href) ? "evet" : "hayir"}
                style={{ color: yol.startsWith(m.href) ? "var(--text)" : "var(--text-secondary)" }}>
                {m.ad}
              </Link>
            ))}
            <Link href="/hedef-net-rotasi" className="btn btn-brand ml-3 px-5 py-2.5 text-[15px]">
              Hedef rotası
            </Link>
          </nav>

          <button
            className="kucuk-btn flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-[14px] md:hidden"
            aria-expanded={acik}
            aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setAcik((a) => !a)}
          >
            {acik ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
            {acik ? "Kapat" : "Menü"}
          </button>
        </div>

        {acik ? (
          <div className="max-h-[calc(100svh-5rem)] overflow-y-auto rounded-b-2xl border border-t-0 border-[var(--line)] bg-[var(--ink-2)] px-4 py-4 md:hidden">
            <nav className="grid gap-1" aria-label="Mobil menü">
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} onClick={() => setAcik(false)}
                  className="rounded-lg px-2 py-3 text-[16px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]">
                  {m.ad}
                </Link>
              ))}
            </nav>

            <p className="etiket mt-5 px-2">En çok kullanılan</p>
            <div className="mt-2 grid gap-2">
              {POPULER.map((a) => (
                <Link key={a.slug} href={`/${a.slug}`} onClick={() => setAcik(false)}
                  className="kart flex items-center justify-between gap-3 px-4 py-3"
                  style={{ ["--aksan" as string]: a.renk ?? "var(--brand)" }}>
                  <span className="text-[15px] font-medium">{a.ad}</span>
                  <span className="text-[15px]" style={{ color: a.renk ?? "var(--brand)" }}>→</span>
                </Link>
              ))}
            </div>

            <p className="etiket mt-5 px-2">Diğer araçlar</p>
            <div className="mt-1 grid grid-cols-2 gap-x-3">
              {ARACLAR.filter((a) => !a.populer).map((a) => (
                <Link key={a.slug} href={`/${a.slug}`} onClick={() => setAcik(false)}
                  className="liste-baglanti px-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text)]">
                  {a.ad}
                </Link>
              ))}
            </div>

            <Link href="/hedef-net-rotasi" onClick={() => setAcik(false)}
              className="btn btn-brand mt-5 w-full">
              Hedef rotası
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
