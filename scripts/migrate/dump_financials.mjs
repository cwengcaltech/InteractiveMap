// 一次性遷移：把 companies.ts 各公司的 financials dump 成 generated/financials.json
import { writeFileSync } from "node:fs";
import { companies } from "../../src/data/companies.ts";

const out = {};
for (const c of companies) out[c.id] = c.financials;
writeFileSync(
  new URL("../../src/data/generated/financials.json", import.meta.url),
  JSON.stringify(out, null, 2) + "\n",
);
console.log(`wrote ${Object.keys(out).length} entries`);
