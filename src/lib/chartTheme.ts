/**
 * 圖表共用設定。
 *
 * 分類色票取自經驗證的三色組合：在「任意兩兩比較」的圖形（雷達、氣泡、散佈）
 * 上，這三色是唯一能同時通過色盲區辨（最差 ΔE 9.2）與一般視覺區辨
 * （最差 ΔE 24.0）門檻的組合，因此比較用的系列數上限為 3。
 * 需要比較更多公司時請用對照表，不要增加色階。
 *
 * aqua 對白底對比為 2.82:1（低於 3:1），故使用處一律附直接標籤或表格視圖。
 */
export const SERIES_COLORS = ["#2a78d6", "#eb6834", "#1baf7a"] as const;

/** 比較用圖表的系列數上限，由色票驗證結果決定，不可隨意調高。 */
export const MAX_COMPARE_SERIES = SERIES_COLORS.length;

/** 非重點資料的中性色，用於襯底的全市場散點。 */
export const NEUTRAL_MARK = "#cbd5e1";

const INK = { primary: "#111827", secondary: "#6b7280", line: "#e5e7eb" };

/** 沿用專案既有的 tooltip 外觀（白底、淺灰框、深灰字）。 */
export const tooltipStyle = {
  backgroundColor: "#fff",
  borderColor: INK.line,
  textStyle: { color: INK.primary, fontSize: 12 },
} as const;

export const legendStyle = {
  textStyle: { color: INK.secondary, fontSize: 11 },
  top: 0,
} as const;

export const axisStyle = {
  axisLine: { lineStyle: { color: INK.line } },
  axisLabel: { color: INK.secondary, fontSize: 11 },
  splitLine: { lineStyle: { color: INK.line, type: "dashed" as const } },
} as const;

export const chartInk = INK;

/**
 * 把「十億美元」格式化成中文金額。
 *
 * 注意單位換算：資料以十億（10^9）為單位，中文的「億」是 10^8，
 * 因此 1 單位 = 10 億美元、1000 單位 = 1 兆美元。
 */
export function formatUsdBillions(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(2)} 兆美元`;
  return `${(value * 10).toFixed(0)} 億美元`;
}

export function formatPercent(value: number | null, digits = 1): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(digits)}%`;
}
