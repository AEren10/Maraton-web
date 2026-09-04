const ROTALAR = [
  { ad: "Rota A", satir: [["Türkçe", 33], ["Matematik", 17], ["Sosyal", 12], ["Fen", 10]] },
  { ad: "Rota B", satir: [["Türkçe", 28], ["Matematik", 25], ["Sosyal", 11], ["Fen", 8]] },
  { ad: "Rota C", satir: [["Türkçe", 30], ["Matematik", 14], ["Sosyal", 15], ["Fen", 13]] },
] as const;

export function KanitSeridi() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {ROTALAR.map((r) => (
          <li key={r.ad} className="kart p-6">
            <p className="etiket">{r.ad}</p>
            <dl className="mt-5">
              {r.satir.map(([ad, net]) => (
                <div key={ad} className="flex items-center justify-between py-1.5">
                  <dt className="text-[14px] text-[var(--text-secondary)]">{ad}</dt>
                  <dd className="sayi text-[17px]">{net}</dd>
                </div>
              ))}
            </dl>
            <p className="sayi mt-4 border-t border-[var(--line)] pt-4 text-right text-[26px]">
              = 72
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-[clamp(20px,3.4vw,30px)] text-[var(--text-secondary)]">
        Hedef aynı. Rota farklı.
      </p>
    </div>
  );
}
