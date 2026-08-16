// 一次性遷移：把 priceData.ts 的內容 dump 成 generated/prices.json
import { writeFileSync } from "node:fs";
import { priceData } from "../../src/data/priceData.ts";

const sorted = Object.fromEntries(
  Object.entries(priceData).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(
  new URL("../../src/data/generated/prices.json", import.meta.url),
  JSON.stringify(sorted, null, 2) + "\n",
);
console.log(`wrote ${Object.keys(sorted).length} entries`);
