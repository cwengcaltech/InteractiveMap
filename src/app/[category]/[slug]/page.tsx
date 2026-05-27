"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { topics } from "@/data/topics";
import { companies as masterCompanies } from "@/data/companies";
import CompanyPanel from "@/components/CompanyPanel";
import TopicSectionCard from "@/components/TopicSectionCard";
import FlowBar from "@/components/FlowBar";

/* ── Country flags ────────────────────────────────────────── */
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
};

function getFlag(country: string): string {
  return countryFlags[country] || "\u{1F3F3}\u{FE0F}";
}

/* ── Master company ID set for checking ───────────────────── */
const masterCompanyIds = new Set(masterCompanies.map((c) => c.id));

/* ── Search result type ───────────────────────────────────── */
interface LocalSearchResult {
  companyName: string;
  companyId: string;
  ticker?: string;
  country: string;
  role: string;
  sectionName: string;
}

/* ── Main page component ──────────────────────────────────── */
export default function TopicPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = React.use(params);

  const topic = useMemo(
    () => topics.find((t) => t.category === category && t.slug === slug) ?? null,
    [category, slug]
  );

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showMiniPanel, setShowMiniPanel] = useState(false);
  const [miniPanelCompany, setMiniPanelCompany] = useState<{
    name: string;
    ticker?: string;
    country: string;
    role: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Build local search index for this topic
  const localCompanies = useMemo(() => {
    if (!topic) return [];
    const results: LocalSearchResult[] = [];
    for (const section of topic.sections) {
      for (const company of section.companies) {
        results.push({
          companyName: company.name,
          companyId: company.id,
          ticker: company.ticker,
          country: company.country,
          role: company.role,
          sectionName: section.name,
        });
      }
    }
    return results;
  }, [topic]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const seen = new Set<string>();
    return localCompanies
      .filter((c) => {
        const match =
          c.companyName.toLowerCase().includes(q) ||
          (c.ticker && c.ticker.toLowerCase().includes(q)) ||
          c.role.toLowerCase().includes(q);
        if (!match) return false;
        if (seen.has(c.companyId)) return false;
        seen.add(c.companyId);
        return true;
      })
      .slice(0, 10);
  }, [searchQuery, localCompanies]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCompany = useCallback(
    (id: string) => {
      if (masterCompanyIds.has(id)) {
        // Company exists in master data — open the full CompanyPanel
        setSelectedCompany(id);
        setShowMiniPanel(false);
      } else {
        // Company not in master data — find it in topic data and show mini panel
        if (!topic) return;
        let found: { name: string; ticker?: string; country: string; role: string } | null = null;
        for (const section of topic.sections) {
          const company = section.companies.find((c) => c.id === id);
          if (company) {
            found = {
              name: company.name,
              ticker: company.ticker,
              country: company.country,
              role: company.role,
            };
            break;
          }
        }
        if (found) {
          setMiniPanelCompany(found);
          setShowMiniPanel(true);
          setSelectedCompany(null);
        }
      }
    },
    [topic]
  );

  const handleClosePanel = useCallback(() => {
    setSelectedCompany(null);
    setShowMiniPanel(false);
    setMiniPanelCompany(null);
  }, []);

  // 404 case
  if (!topic) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-gray-500 mb-6">找不到此主題</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            回主題列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                className="shrink-0 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">回主題列表</span>
              </Link>
              <div className="w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl leading-none">{topic.icon}</span>
                <h1 className="text-base font-bold text-gray-900 truncate">{topic.name}</h1>
                <span className="text-xs text-gray-400 hidden sm:inline">{topic.name_en}</span>
              </div>
            </div>

            {/* Search in topic */}
            <div className="relative w-64 shrink-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜尋公司..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4f6df5]/50 transition-colors"
              />

              {/* Search dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div
                  ref={searchDropdownRef}
                  className="absolute top-full right-0 left-0 mt-1 rounded-lg bg-white border border-gray-200 shadow-xl overflow-hidden z-50 max-h-[300px] overflow-y-auto"
                >
                  {searchResults.map((result, idx) => (
                    <button
                      key={`${result.companyId}-${idx}`}
                      onClick={() => {
                        handleSelectCompany(result.companyId);
                        setSearchQuery("");
                        setIsSearchOpen(false);
                        // Scroll to the section containing this company
                        const sectionEl = document.getElementById(`section-${result.sectionName}`);
                        if (sectionEl) {
                          sectionEl.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-sm leading-none">{getFlag(result.country)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-gray-900 font-medium truncate">{result.companyName}</span>
                          {result.ticker && (
                            <span className="text-xs text-gray-400">{result.ticker}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{result.sectionName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Topic info + flow bar */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-2xl">
          {topic.description}
        </p>
        <FlowBar flow={topic.flowSummary} color={topic.color} />
      </div>

      {/* Sections */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative">
          {topic.sections.map((section, index) => (
            <div key={section.id} id={`section-${section.name}`}>
              {/* Flow arrow between sections */}
              {index > 0 && (
                <div className="flex justify-center py-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-px h-6"
                      style={{ backgroundColor: `${topic.color}30` }}
                    />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke={topic.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      />
                    </svg>
                    <div
                      className="w-px h-6"
                      style={{ backgroundColor: `${topic.color}30` }}
                    />
                  </div>
                </div>
              )}

              <TopicSectionCard
                section={section}
                topicColor={topic.color}
                onSelectCompany={handleSelectCompany}
                selectedCompany={selectedCompany}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            資料為公開資訊整理，僅供研究參考，非投資建議
          </p>
        </div>
      </footer>

      {/* Full CompanyPanel for companies in master data */}
      <CompanyPanel
        companyId={selectedCompany}
        onClose={handleClosePanel}
        onSelectCompany={handleSelectCompany}
      />

      {/* Mini panel for companies NOT in master data */}
      {showMiniPanel && miniPanelCompany && (
        <div className="fixed top-0 right-0 h-full z-40" style={{ width: "360px" }}>
          <div className="h-full bg-white border-l border-gray-200 flex flex-col shadow-xl">
            <div className="flex items-start justify-between p-4 border-b border-gray-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg leading-none">{getFlag(miniPanelCompany.country)}</span>
                  <span
                    className="inline-block w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: topic.color }}
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{miniPanelCompany.name}</h2>
                {miniPanelCompany.ticker && (
                  <p className="text-sm text-gray-400 mt-0.5">{miniPanelCompany.ticker}</p>
                )}
              </div>
              <button
                onClick={handleClosePanel}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="關閉面板"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-[10px] text-gray-400 mb-1">角色</p>
                  <p className="text-sm text-gray-700">{miniPanelCompany.role}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-[10px] text-gray-400 mb-1">國家</p>
                  <p className="text-sm text-gray-900">{miniPanelCompany.country}</p>
                </div>
                <p className="text-xs text-gray-400 text-center mt-8">
                  此公司尚未收錄完整財務資料
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
