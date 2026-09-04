const SATIRLAR = [
  "Bugün ne yapacağını bilir.",
  "Denemeden sonra rotayı değiştirir.",
  "Konu borcunu gösterir.",
  "Hedefe ne kadar kaldığını sayar.",
];

export function MaratonBolumu() {
  return (
    <div className="kart p-7 sm:p-10">
      <p className="text-[clamp(20px,3.4vw,30px)] leading-snug">
        Bu sitenin verdiği tek bir rota.
        <br />
        <span className="text-[var(--text-muted)]">Maraton her gün yenisini veriyor.</span>
      </p>
      <ul className="mt-9 flex flex-col gap-3 border-t border-[var(--line)] pt-8">
        {SATIRLAR.map((s) => (
          <li key={s} className="text-[15px] text-[var(--text-secondary)]">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
