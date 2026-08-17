import rawPrices from "./generated/prices.json";

export interface PriceData {
  ticker: string;
  price: number;
  return_1w: number | null;
  return_1m: number | null;
  return_3m: number | null;
  return_1y: number | null;
  rsi: number;
  ma_50?: number | null;
  ma_200?: number | null;
  signals: string[];
  bullish_score: number;
  rapid_rise: boolean;
  early_signals?: string[];
  early_score?: number;
  early_signal?: boolean;
  dist_from_52w_high?: number;
  /** 市值（十億美元），由股價 × 在外流通股數 × 匯率算得 */
  market_cap_usd?: number | null;
  view?: string;
  view_type?: string;
  updated: string;
  /** true 表示本次更新抓取失敗、沿用前次資料 */
  stale?: boolean;
}

export const priceData: Record<string, PriceData> = rawPrices as Record<
  string,
  PriceData
>;
