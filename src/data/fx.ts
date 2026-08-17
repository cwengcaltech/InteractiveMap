import rawFx from "./generated/fx.json";

interface FxData {
  updated: string;
  usd_per: Record<string, number>;
}

const fx = rawFx as FxData;

export const fxUpdated = fx.updated;

/**
 * 把某幣別的金額換算成美元。
 *
 * 財務數字的單位是「該幣別的十億」，換算後即為「十億美元」，
 * 可直接跨市場比較。查無匯率時回傳 null，呼叫端自行決定如何呈現。
 */
export function toUsd(value: number, currency: string): number | null {
  const rate = fx.usd_per[currency.toUpperCase()];
  if (rate === undefined) return null;
  return value * rate;
}
