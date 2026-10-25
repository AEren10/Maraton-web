import Image from "next/image";

export function MarkaLogo({
  kompakt = false,
  oncelikli = false,
}: {
  kompakt?: boolean;
  oncelikli?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Maraton">
      <Image
        src="/brand/maraton-mark-v2.png"
        alt=""
        width={76}
        height={30}
        className={kompakt ? "h-[22px] w-auto" : "h-[26px] w-auto"}
        priority={oncelikli}
      />
      <span
        className={`font-[family-name:var(--font-marka)] font-semibold tracking-[0.02em] ${
          kompakt ? "text-[15px]" : "text-[17px]"
        }`}
      >
        MARATON
      </span>
    </span>
  );
}
