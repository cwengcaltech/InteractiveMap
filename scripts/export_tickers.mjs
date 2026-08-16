// 從 TS 資料檔匯出 id -> ticker 清單，供 Python pipeline 使用。
// 之後在 companyProfiles.ts / topics.ts 新增公司，pipeline 下次執行會自動納入。
import { writeFileSync } from "node:fs";
import { companyProfiles } from "../src/data/companyProfiles.ts";
import { topics } from "../src/data/topics.ts";

const tickers = {};
for (const c of companyProfiles) {
  if (c.ticker) tickers[c.id] = c.ticker;
}
for (const topic of topics) {
  if (topic.category === "hl") continue; // 健康主題無股票資料
  for (const section of topic.sections) {
    for (const c of section.companies) {
      if (c.ticker && !tickers[c.id]) tickers[c.id] = c.ticker;
    }
  }
}

const sorted = Object.fromEntries(
  Object.entries(tickers).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(
  new URL("./.tickers.json", import.meta.url),
  JSON.stringify(sorted, null, 2) + "\n",
);
console.log(`exported ${Object.keys(sorted).length} tickers`);
