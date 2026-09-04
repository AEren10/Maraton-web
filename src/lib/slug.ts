const HARF: Record<string, string> = {
  ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
};

/** Türkçe karakterleri sadeleştirip URL parçasına çevirir. */
export function slugla(metin: string) {
  return metin
    .split("")
    .map((h) => HARF[h] ?? h)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
