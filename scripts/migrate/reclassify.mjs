// 一次性遷移：修正 168 家被統一標成 chip_design / 「半導體相關」的公司分類。
//
// 這批公司是後期批次新增主題（企業 SaaS、生技製藥、AI 能源、太空等）時
// 沿用了預設值，導致 292 家中有 197 家擠在 chip_design，
// 其中包含 Lockheed Martin、Palantir 等與晶片設計無關的公司。
//
// 修正依據是 topics.ts 的主題歸屬（乾淨且語意正確）：
//   category    ← 公司第一次出現的主題所對應的產業類別
//   subcategory ← 公司第一次出現的 section 名稱（取代籠統的「半導體相關」）
//
// 產出：改寫 src/data/companyProfiles.ts 的 category / subcategory 欄位。
import { readFileSync, writeFileSync } from "node:fs";
import { companyProfiles } from "../../src/data/companyProfiles.ts";
import { topics } from "../../src/data/topics.ts";

const PROFILES = new URL("../../src/data/companyProfiles.ts", import.meta.url);

// 主題 → 產業類別。半導體相關主題不在此表，因為同一主題內含設計/代工/封裝等
// 不同環節，需逐家判斷（見 SEMI_OVERRIDES）。
const TOPIC_CATEGORY = {
  enterprise_saas: "enterprise_software",
  ai_stack: "ai_model",
  cancer_drugs: "biotech_pharma",
  glp1: "biotech_pharma",
  chronic_drugs: "biotech_pharma",
  gene_therapy: "biotech_pharma",
  brain: "biotech_pharma",
  med_device: "med_device",
  ai_power: "energy_power",
  space_ai: "space_tech",
};

// 落在半導體主題、需逐家判斷的公司
const SEMI_OVERRIDES = {
  resonac: "materials",
  ajinomoto: "materials",
  dai_nippon: "materials",
  toppan: "materials",
  hoya: "materials",
  ibiden: "packaging",
  unimicron: "packaging",
  nan_ya_pcb: "packaging",
  chroma: "equipment",
  delta: "energy_power",
  liteon: "energy_power",
  servicenow: "enterprise_software",
};

const stale = new Set(
  companyProfiles.filter((c) => c.subcategory === "半導體相關").map((c) => c.id),
);

// 逐一找出每家公司第一次出現的主題與 section
const placement = new Map();
for (const topic of topics) {
  for (const section of topic.sections) {
    for (const company of section.companies) {
      if (stale.has(company.id) && !placement.has(company.id)) {
        placement.set(company.id, { topic: topic.slug, section: section.name });
      }
    }
  }
}

let text = readFileSync(PROFILES, "utf-8");
const unresolved = [];
const counts = {};
let changed = 0;

for (const id of stale) {
  const place = placement.get(id);
  const category =
    SEMI_OVERRIDES[id] ?? (place ? TOPIC_CATEGORY[place.topic] : undefined);
  if (!category || !place) {
    unresolved.push(id);
    continue;
  }

  // 只改這家公司物件內的 category / subcategory，用 id 定位避免誤傷
  const anchor = `    id: "${id}",`;
  const start = text.indexOf(anchor);
  if (start === -1) {
    unresolved.push(id);
    continue;
  }
  const end = text.indexOf("\n  },", start);
  const block = text.slice(start, end);
  const patched = block
    .replace(/category: "[^"]*"/, `category: "${category}"`)
    .replace(/subcategory: "[^"]*"/, `subcategory: "${place.section}"`);
  text = text.slice(0, start) + patched + text.slice(end);

  counts[category] = (counts[category] || 0) + 1;
  changed++;
}

writeFileSync(PROFILES, text);
console.log(`重新歸類 ${changed} / ${stale.size} 家`);
for (const [cat, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(20)} ${n}`);
}
if (unresolved.length) console.log("未能歸類:", unresolved.join(", "));
