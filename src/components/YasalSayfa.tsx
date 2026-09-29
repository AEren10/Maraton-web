import type { ReactNode } from "react";

type YasalSayfaProps = {
  baslik: string;
  aciklama: string;
  children: ReactNode;
  guncelleme?: string;
};

export function YasalSayfa({
  baslik,
  aciklama,
  children,
  guncelleme,
}: YasalSayfaProps) {
  return (
    <section className="sinir py-14 sm:py-20">
      <div className="max-w-[760px]">
        <p className="etiket">Maraton mobil uygulaması</p>
        <h1 className="mt-3 text-[clamp(30px,5vw,46px)] leading-tight">
          {baslik}
        </h1>
        <p className="mt-5 max-w-[680px] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
          {aciklama}
        </p>
        {guncelleme ? (
          <p className="mt-4 text-[14px] text-[var(--text-muted)]">
            Son güncelleme: <time dateTime="2026-09-30">{guncelleme}</time>
          </p>
        ) : null}

        <div className="mt-10 space-y-5 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

export function YasalBolum({
  baslik,
  children,
}: {
  baslik: string;
  children: ReactNode;
}) {
  return (
    <section className="kart p-5 sm:p-7">
      <h2 className="text-[20px] sm:text-[22px]">{baslik}</h2>
      <div className="metin mt-3 text-[15px] sm:text-[16px]">{children}</div>
    </section>
  );
}
