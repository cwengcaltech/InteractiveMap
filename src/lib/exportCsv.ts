import type { CompareRow } from "./compare";

const COLUMNS: Array<[string, (row: CompareRow) => string | number | null]> = [
  ["公司", (r) => r.name],
  ["代號", (r) => r.ticker],
  ["國家", (r) => r.country],
  ["產業", (r) => r.category],
  ["環節", (r) => r.subcategory],
  ["市值(十億美元)", (r) => r.marketCap],
  ["年營收(十億美元)", (r) => r.revenue],
  ["年增率", (r) => r.growth],
  ["毛利率", (r) => r.grossMargin],
  ["營益率", (r) => r.operatingMargin],
  ["3月報酬(%)", (r) => r.return3m],
  ["1年報酬(%)", (r) => r.return1y],
  ["RSI", (r) => r.rsi],
  ["多頭分數", (r) => r.bullishScore],
];

function escape(value: string | number | null): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  // 逗號、引號、換行都必須包成引號欄位，內部引號再加倍
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * 把目前的對照表下載成 CSV。
 *
 * 開頭加上 UTF-8 BOM，否則 Excel 會把中文欄位讀成亂碼。
 */
export function downloadCsv(rows: CompareRow[], label: string): void {
  const header = COLUMNS.map(([name]) => name).join(",");
  const body = rows
    .map((row) => COLUMNS.map(([, get]) => escape(get(row))).join(","))
    .join("\n");
  const blob = new Blob([`﻿${header}\n${body}\n`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `同業比較-${label.replace(/[\\/:*?"<>|]/g, "-")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
