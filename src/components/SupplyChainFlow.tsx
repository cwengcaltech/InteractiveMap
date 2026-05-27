"use client";

import { useMemo } from "react";
import { companies, type Company } from "@/data/companies";
import { categories, marketTypeLabels } from "@/data/categories";

interface SupplyChainFlowProps {
  onSelectCompany: (id: string | null) => void;
  selectedCompany: string | null;
}

const stages: {
  label: string;
  sublabel: string;
  categoryIds: string[];
  flowLabels?: string[];
}[] = [
  {
    label: "上游基礎設施",
    sublabel: "Foundation & Tools",
    categoryIds: ["materials", "equipment", "eda_ip"],
  },
  {
    label: "製造與設計",
    sublabel: "Manufacturing & Design",
    categoryIds: ["foundry", "chip_design", "memory"],
    flowLabels: ["矽晶圓・光阻劑", "製程設備", "設計工具・矽智財"],
  },
  {
    label: "封裝與整合",
    sublabel: "Packaging & Integration",
    categoryIds: ["packaging"],
    flowLabels: ["晶圓代工", "晶片設計下單", "HBM 整合封裝"],
  },
  {
    label: "終端應用",
    sublabel: "End Market & Application",
    categoryIds: ["ai_cloud", "ai_model"],
    flowLabels: ["先進封裝成品", "記憶體模組"],
  },
];

const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

function getRevenueDisplay(company: Company): string {
  const annual = company.financials.annual;
  if (annual.length === 0) return "";
  const latest = annual[annual.length - 1];
  if (company.financials.currency === "TWD") {
    return `NT$${latest.revenue.toLocaleString()}B`;
  }
  return `$${latest.revenue.toFixed(1)}B`;
}

function getGrowthDisplay(company: Company): { text: string; positive: boolean } {
  const annual = company.financials.annual;
  if (annual.length === 0) return { text: "", positive: true };
  const latest = annual[annual.length - 1];
  return {
    text: `${latest.growth_rate >= 0 ? "+" : ""}${(latest.growth_rate * 100).toFixed(0)}%`,
    positive: latest.growth_rate >= 0,
  };
}

function getRevenueUSD(company: Company): number {
  const annual = company.financials.annual;
  if (annual.length === 0) return 0;
  const latest = annual[annual.length - 1];
  return company.financials.currency === "TWD"
    ? latest.revenue / 32
    : latest.revenue;
}

export default function SupplyChainFlow({
  onSelectCompany,
  selectedCompany,
}: SupplyChainFlowProps) {
  const companiesByCategory = useMemo(() => {
    const map: Record<string, Company[]> = {};
    for (const c of companies) {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    }
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => getRevenueUSD(b) - getRevenueUSD(a));
    }
    return map;
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Flow direction indicator */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium text-gray-400">供應鏈流向</span>
            <span>上游</span>
            <svg width="60" height="12" viewBox="0 0 60 12" className="text-gray-600">
              <line x1="0" y1="6" x2="48" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="48,2 56,6 48,10" fill="currentColor" />
            </svg>
            <span>下游</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(marketTypeLabels).map(([key, mt]) => (
              <span
                key={key}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: mt.bg, color: mt.color }}
              >
                {mt.label}
              </span>
            ))}
          </div>
        </div>

        {stages.map((stage, stageIdx) => (
          <div key={stage.label}>
            {/* Flow arrow between stages */}
            {stageIdx > 0 && (
              <FlowArrow labels={stage.flowLabels} />
            )}

            {/* Stage section */}
            <div className="mb-2">
              {/* Stage header */}
              <div className="flex items-baseline gap-3 mb-3 px-1">
                <h2 className="text-sm font-bold text-white">{stage.label}</h2>
                <span className="text-xs text-gray-600">{stage.sublabel}</span>
              </div>

              {/* Category cards grid */}
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(stage.categoryIds.length, 3)}, 1fr)`,
                }}
              >
                {stage.categoryIds.map((catId) => {
                  const cat = categoryMap[catId];
                  if (!cat) return null;
                  const catCompanies = companiesByCategory[catId] || [];
                  const mt = marketTypeLabels[cat.marketType];

                  return (
                    <div
                      key={catId}
                      className="rounded-xl border overflow-hidden transition-colors"
                      style={{
                        backgroundColor: "rgba(26, 29, 39, 0.8)",
                        borderColor: `${cat.color}30`,
                      }}
                    >
                      {/* Card header */}
                      <div
                        className="px-4 py-3 border-b flex items-center justify-between"
                        style={{
                          borderColor: `${cat.color}20`,
                          background: `linear-gradient(135deg, ${cat.color}10, transparent)`,
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">{cat.icon}</span>
                          <div className="min-w-0">
                            <h3
                              className="text-sm font-bold truncate"
                              style={{ color: cat.color }}
                            >
                              {cat.name}
                            </h3>
                            <p className="text-[10px] text-gray-500 truncate">
                              {cat.name_en}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: mt.bg, color: mt.color }}
                          >
                            {mt.label}
                          </span>
                          <span className="text-[10px] text-gray-600">
                            {catCompanies.length} 家
                          </span>
                        </div>
                      </div>

                      {/* Company nodes */}
                      <div className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {catCompanies.map((company) => {
                            const revenue = getRevenueDisplay(company);
                            const growth = getGrowthDisplay(company);
                            const isSelected = selectedCompany === company.id;

                            return (
                              <button
                                key={company.id}
                                onClick={() => onSelectCompany(company.id)}
                                className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-left"
                                style={{
                                  backgroundColor: isSelected
                                    ? `${cat.color}20`
                                    : "rgba(35, 39, 54, 0.8)",
                                  borderColor: isSelected
                                    ? `${cat.color}60`
                                    : "rgba(46, 51, 71, 0.6)",
                                  boxShadow: isSelected
                                    ? `0 0 12px ${cat.color}20`
                                    : "none",
                                }}
                              >
                                {/* Country flag */}
                                <span className="text-[10px] text-gray-500 shrink-0">
                                  {countryFlag(company.country)}
                                </span>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-semibold text-white group-hover:text-[#6c8cff] transition-colors truncate">
                                      {shortName(company.name_en)}
                                    </span>
                                    <span className="text-[10px] text-gray-600 shrink-0">
                                      {company.ticker}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-gray-500">
                                      {revenue}
                                    </span>
                                    <span
                                      className="text-[10px] font-medium"
                                      style={{
                                        color: growth.positive
                                          ? "#4ecdc4"
                                          : "#ef4444",
                                      }}
                                    >
                                      {growth.text}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card footer - description */}
                      <div
                        className="px-4 py-2 border-t"
                        style={{ borderColor: `${cat.color}15` }}
                      >
                        <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowArrow({ labels }: { labels?: string[] }) {
  return (
    <div className="flex items-center justify-center py-3 my-1">
      <div className="flex items-center gap-3">
        {/* Left dashed line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-700" />

        {/* Arrow with labels */}
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-600 shrink-0">
            <line x1="10" y1="2" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="5,12 10,18 15,12" fill="currentColor" />
          </svg>
          {labels && labels.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {labels.map((label, i) => (
                <span
                  key={i}
                  className="text-[10px] text-gray-500 bg-[#232736] px-2 py-0.5 rounded-full border border-[#2e3347]"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-600 shrink-0">
            <line x1="10" y1="2" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="5,12 10,18 15,12" fill="currentColor" />
          </svg>
        </div>

        {/* Right dashed line */}
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-700" />
      </div>
    </div>
  );
}

function shortName(name: string): string {
  return name
    .replace(/[,]?\s*(Corporation|Incorporated|Inc\.?|Corp\.?|Holdings?|Holding|Limited|Ltd\.?|Co\.\s*Ltd\.?|Technology|Platforms|Group|\.com)\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countryFlag(code: string): string {
  const flags: Record<string, string> = {
    US: "🇺🇸",
    TW: "🇹🇼",
    KR: "🇰🇷",
    NL: "🇳🇱",
    JP: "🇯🇵",
    UK: "🇬🇧",
    DE: "🇩🇪",
    SG: "🇸🇬",
  };
  return flags[code] || code;
}
