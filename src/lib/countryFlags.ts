/**
 * 國碼 → 國旗 emoji。
 *
 * 頁面與元件中原本各自複製了一份對照表，新程式一律用這裡的版本。
 */
const FLAGS: Record<string, string> = {
  US: "🇺🇸",
  TW: "🇹🇼",
  KR: "🇰🇷",
  JP: "🇯🇵",
  CN: "🇨🇳",
  HK: "🇭🇰",
  NL: "🇳🇱",
  DE: "🇩🇪",
  FR: "🇫🇷",
  UK: "🇬🇧",
  CH: "🇨🇭",
  IL: "🇮🇱",
  CA: "🇨🇦",
  SE: "🇸🇪",
  DK: "🇩🇰",
  BE: "🇧🇪",
  ES: "🇪🇸",
  AU: "🇦🇺",
};

export function countryFlag(code: string): string {
  return FLAGS[code.toUpperCase()] ?? "🏳️";
}
