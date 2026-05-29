"use client";

import { marketTypeLabels, healthMarketTypeLabels } from "@/data/categories";
import type { MarketType } from "@/data/categories";
import { priceData } from "@/data/priceData";

interface SectionCompany {
  id: string;
  name: string;
  ticker?: string;
  country: string;
  role: string;
  marketShare?: string;
  howTo?: string;
  frequency?: string;
  notes?: string;
}

interface TopicSection {
  id: string;
  name: string;
  name_en: string;
  keyInfo: string;
  marketType: MarketType;
  companies: SectionCompany[];
  relationships?: string[];
}

interface TopicSectionCardProps {
  section: TopicSection;
  topicColor: string;
  onSelectCompany: (id: string) => void;
  selectedCompany: string | null;
  topicCategory?: string;
}

const countryFlags: Record<string, string> = {
  US: "\u{1F1FA}\u{1F1F8}",
  TW: "\u{1F1F9}\u{1F1FC}",
  KR: "\u{1F1F0}\u{1F1F7}",
  JP: "\u{1F1EF}\u{1F1F5}",
  NL: "\u{1F1F3}\u{1F1F1}",
  UK: "\u{1F1EC}\u{1F1E7}",
  DE: "\u{1F1E9}\u{1F1EA}",
  CN: "\u{1F1E8}\u{1F1F3}",
  SG: "\u{1F1F8}\u{1F1EC}",
  FR: "\u{1F1EB}\u{1F1F7}",
  IL: "\u{1F1EE}\u{1F1F1}",
  GB: "\u{1F1EC}\u{1F1E7}",
  IE: "\u{1F1EE}\u{1F1EA}",
  CA: "\u{1F1E8}\u{1F1E6}",
  SP: "\u{1F48A}",
  EX: "\u{1F3CB}",
  BM: "\u{1F9EA}",
  FD: "\u{1F957}",
  MD: "\u{1F3E5}",
  HA: "\u{1F9D8}",
  RS: "\u{1F4CA}",
};

function getFlag(country: string): string {
  return countryFlags[country] || "\u{1F3F3}\u{FE0F}";
}

export default function TopicSectionCard({
  section,
  topicColor,
  onSelectCompany,
  selectedCompany,
  topicCategory,
}: TopicSectionCardProps) {
  const labels = topicCategory === "hl" ? healthMarketTypeLabels : marketTypeLabels;
  const mtInfo = labels[section.marketType];

  return (
    <div
      className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden"
      style={{ borderLeftWidth: "3px", borderLeftColor: topicColor }}
    >
      {/* Section header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{section.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{section.name_en}</p>
          </div>
          <span
            className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: mtInfo.bg,
              color: mtInfo.color,
            }}
          >
            {mtInfo.label}
          </span>
        </div>

        {/* Key info */}
        <div className="mt-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="text-gray-400 text-xs mr-1.5">Key</span>
            {section.keyInfo}
          </p>
        </div>
      </div>

      {/* Company grid */}
      <div className="px-5 pb-4 pt-1">
        <div className="flex flex-wrap gap-2.5">
          {section.companies.map((company) => {
            const isSelected = selectedCompany === company.id;
            const isHealth = topicCategory === "hl";
            const hasDetails = isHealth && (company.howTo || company.frequency || company.notes);
            const price = !isHealth ? priceData[company.id] : null;
            return (
              <button
                key={company.id}
                onClick={() => onSelectCompany(company.id)}
                className={`text-left p-3 rounded-lg transition-all duration-200 ${
                  isHealth
                    ? "min-w-[260px] max-w-[320px] basis-[260px]"
                    : "min-w-[140px] max-w-[180px] basis-[140px]"
                } flex-1 ${
                  isSelected
                    ? "bg-gray-50 scale-[1.02]"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                }`}
                style={
                  isSelected
                    ? { outline: `2px solid ${topicColor}`, outlineOffset: "-1px", borderColor: topicColor }
                    : undefined
                }
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base leading-none">{getFlag(company.country)}</span>
                  <span className="text-sm font-semibold text-gray-900 truncate flex-1 min-w-0">
                    {company.name}
                  </span>
                  {price?.rapid_rise && (
                    <span className="text-[9px] shrink-0" title="技術分析: 快速上漲">🚀</span>
                  )}
                </div>
                {company.ticker && (
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-gray-400">{company.ticker}</p>
                    {price && price.return_1m !== null && (
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: price.return_1m >= 0 ? "#16a34a" : "#dc2626" }}
                      >
                        {price.return_1m >= 0 ? "+" : ""}{price.return_1m.toFixed(1)}%
                      </span>
                    )}
                  </div>
                )}
                <p className={`text-xs text-gray-600 leading-snug ${isHealth ? "" : "line-clamp-2"}`}>
                  {company.role}
                </p>
                {company.marketShare && (
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: topicColor }}
                  >
                    {company.marketShare}
                  </p>
                )}

                {/* Health-specific details */}
                {hasDetails && (
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1.5">
                    {company.howTo && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-500 mb-0.5 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                          </svg>
                          如何實行
                        </p>
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          {company.howTo}
                        </p>
                      </div>
                    )}
                    {company.frequency && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-500 mb-0.5 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          頻率
                        </p>
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          {company.frequency}
                        </p>
                      </div>
                    )}
                    {company.notes && (
                      <div>
                        <p className="text-[10px] font-semibold text-amber-700 mb-0.5 flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                          注意事項
                        </p>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                          {company.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Relationships */}
      {section.relationships && section.relationships.length > 0 && (
        <div className="px-5 pb-4 border-t border-gray-100">
          <div className="pt-3">
            <p className="text-[11px] font-medium text-gray-400 mb-1.5 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              關聯關係
            </p>
            <div className="space-y-1">
              {section.relationships.map((rel, i) => (
                <p key={i} className="text-xs text-gray-500 leading-relaxed pl-3 border-l-2 border-gray-200">
                  {rel}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
