/** 01 · HESAPLAMA tarzı numaralı bölüm başlığı. */
export function BolumBasligi({ no, ad }: { no: string; ad: string }) {
  return (
    <div className="mt-14 border-b border-[var(--line)] pb-3">
      <p className="etiket">
        <span style={{ color: "var(--brand)" }}>{no}</span>
        <span className="mx-2 text-[var(--text-muted)]">·</span>
        {ad}
      </p>
    </div>
  );
}
