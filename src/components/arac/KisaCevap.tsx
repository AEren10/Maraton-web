export function KisaCevap({ metin }: { metin: string }) {
  return (
    <div
      className="rounded-r-[14px] border-l-[3px] bg-[var(--surface)] px-5 py-5 sm:px-6"
      style={{ borderColor: "var(--brand)" }}
    >
      <p className="etiket" style={{ color: "var(--brand-light)" }}>
        Kısa cevap
      </p>
      <p className="mt-3 text-[16px] leading-relaxed text-[var(--text-secondary)]">{metin}</p>
    </div>
  );
}
