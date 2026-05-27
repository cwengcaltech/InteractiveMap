"use client";

import { marketTypeLabels, healthMarketTypeLabels } from "@/data/categories";
import type { MarketType } from "@/data/categories";

interface SectionCompany {
  id: string;
  name: string;
  ticker?: string;
  country: string;
  role: string;
  marketShare?: string;
}

interface TopicSection {
  id: string;
  name: string;
  name_en: string;
  keyInfo: string;
  marketType: MarketType;
  companies: SectionCompany[];
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
            return (
              <button
                key={company.id}
                onClick={() => onSelectCompany(company.id)}
                className={`text-left p-3 rounded-lg transition-all duration-200 min-w-[140px] max-w-[180px] flex-1 basis-[140px] ${
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
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {company.name}
                  </span>
                </div>
                {company.ticker && (
                  <p className="text-xs text-gray-400 mb-1">{company.ticker}</p>
                )}
                <p className="text-xs text-gray-500 leading-snug line-clamp-2">
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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
