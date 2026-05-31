"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { topics } from "@/data/topics";
import { priceData } from "@/data/priceData";
import { companies } from "@/data/companies";

interface SearchResult {
  companyName: string;
  companyId: string;
  ticker?: string;
  country: string;
  role: string;
  topicName: string;
  topicSlug: string;
  topicCategory: string;
  sectionName: string;
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
};

function getFlag(country: string): string {
  return countryFlags[country] || "\u{1F3F3}\u{FE0F}";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hwTopics = useMemo(() => topics.filter((t) => t.category === "hw"), []);
  const swTopics = useMemo(() => topics.filter((t) => t.category === "sw"), []);
  const hlTopics = useMemo(() => topics.filter((t) => t.category === "hl"), []);

  // Build a flat searchable list of all companies across all topics
  const allCompanies = useMemo(() => {
    const results: SearchResult[] = [];
    for (const topic of topics) {
      for (const section of topic.sections) {
        for (const company of section.companies) {
          results.push({
            companyName: company.name,
            companyId: company.id,
            ticker: company.ticker,
            country: company.country,
            role: company.role,
            topicName: topic.name,
            topicSlug: topic.slug,
            topicCategory: topic.category,
            sectionName: section.name,
          });
        }
      }
    }
    return results;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    // Deduplicate by companyId + topicSlug to avoid showing same company in same topic multiple times
    const seen = new Set<string>();
    return allCompanies
      .filter((c) => {
        const match =
          c.companyName.toLowerCase().includes(q) ||
          (c.ticker && c.ticker.toLowerCase().includes(q)) ||
          c.role.toLowerCase().includes(q);
        if (!match) return false;
        const key = `${c.companyId}-${c.topicSlug}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 12);
  }, [query, allCompanies]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalSections = useMemo(
    () => topics.reduce((sum, t) => sum + t.sections.length, 0),
    []
  );

  const totalCompanies = useMemo(() => {
    const ids = new Set<string>();
    for (const topic of topics) {
      for (const section of topic.sections) {
        for (const company of section.companies) {
          ids.add(company.id);
        }
      }
    }
    return ids.size;
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4f6df5]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-[#6c8cff] to-[#4ecdc4] bg-clip-text text-transparent">
                產業知識地圖
              </span>
            </h1>
            <p className="text-lg text-gray-500">
              AI・半導體・健康長壽 知識全景
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-400">
              <span>{topics.length} 個主題</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{totalSections} 個產業環節</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{totalCompanies} 家公司</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="搜尋公司名稱、股票代號..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => query.trim() && setIsSearchOpen(true)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4f6df5]/50 focus:ring-1 focus:ring-[#4f6df5]/30 transition-colors shadow-sm"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setIsSearchOpen(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 5L5 15M5 5l10 10" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white border border-gray-200 shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto"
              >
                {searchResults.map((result, index) => (
                  <Link
                    key={`${result.companyId}-${result.topicSlug}-${index}`}
                    href={`/${result.topicCategory}/${result.topicSlug}`}
                    onClick={() => {
                      setQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-lg leading-none shrink-0">
                      {getFlag(result.country)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {result.companyName}
                        </span>
                        {result.ticker && (
                          <span className="text-xs text-gray-400 shrink-0">
                            {result.ticker}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {result.role}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-500">{result.topicName}</p>
                      <p className="text-[10px] text-gray-400">{result.sectionName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {isSearchOpen && query.trim() && searchResults.length === 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white border border-gray-200 shadow-xl p-4 text-center z-50"
              >
                <p className="text-sm text-gray-500">找不到符合的公司</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Topic directory */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Stock watchlist */}
        <StockWatchlist />

        {/* HW section */}
        {hwTopics.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#6c8cff] to-[#4ecdc4]" />
              <h2 className="text-xl font-bold text-gray-900">半導體硬體供應鏈</h2>
              <span className="text-sm text-gray-400">{hwTopics.length} 個主題</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hwTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}

        {/* SW section */}
        {swTopics.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#a78bfa] to-[#6c8cff]" />
              <h2 className="text-xl font-bold text-gray-900">AI 軟體生態系</h2>
              <span className="text-sm text-gray-400">{swTopics.length} 個主題</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {swTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}

        {/* Health & Longevity section */}
        {hlTopics.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#22c55e] to-[#0ea5a0]" />
              <h2 className="text-xl font-bold text-gray-900">健康與長壽知識</h2>
              <span className="text-sm text-gray-400">{hlTopics.length} 個主題</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hlTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            資料為公開資訊整理，僅供研究參考，非投資建議
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Topic Card Component ─────────────────────────────────── */

interface TopicCardTopic {
  id: string;
  slug: string;
  category: "hw" | "sw" | "hl";
  name: string;
  name_en: string;
  description: string;
  icon: string;
  color: string;
  flowSummary: string;
  sections: Array<{ id: string; companies: Array<{ id: string }> }>;
}

function TopicCard({ topic }: { topic: TopicCardTopic }) {
  const companyCount = new Set(
    topic.sections.flatMap((s) => s.companies.map((c) => c.id))
  ).size;

  return (
    <Link
      href={`/${topic.category}/${topic.slug}`}
      className="group block rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div
        className="h-1 w-full"
        style={{ backgroundColor: topic.color }}
      />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl leading-none mt-0.5">{topic.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#4f6df5] transition-colors">
              {topic.name}
            </h3>
            <p className="text-xs text-gray-400">{topic.name_en}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {topic.description}
        </p>

        {/* Flow summary */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 font-mono truncate">
            {topic.flowSummary}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            {topic.sections.length} 個環節
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            {companyCount} 家公司
          </span>
          <svg
            className="ml-auto text-gray-300 group-hover:text-[#4f6df5] transition-colors"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ── Stock Watchlist Component ─────────────────────────────── */
function StockWatchlist() {
  const watchlist = useMemo(() => {
    const companyMap = Object.fromEntries(companies.map((c) => [c.id, c]));
    const topicMap: Record<string, { topicSlug: string; topicCategory: string; topicName: string; sectionName: string }> = {};
    for (const topic of topics) {
      for (const section of topic.sections) {
        for (const company of section.companies) {
          if (!topicMap[company.id]) {
            topicMap[company.id] = {
              topicSlug: topic.slug,
              topicCategory: topic.category,
              topicName: topic.name,
              sectionName: section.name,
            };
          }
        }
      }
    }

    type Entry = {
      id: string;
      name: string;
      ticker: string;
      return_1w: number | null;
      return_1m: number | null;
      return_3m: number | null;
      bullish_score: number;
      early_score?: number;
      rapid_rise: boolean;
      early_signal?: boolean;
      topic: typeof topicMap[string];
    };

    const rapidRise: Entry[] = [];
    const earlySignal: Entry[] = [];

    for (const [id, p] of Object.entries(priceData)) {
      const c = companyMap[id];
      const t = topicMap[id];
      if (!c || !t) continue;
      const entry: Entry = {
        id,
        name: c.name,
        ticker: c.ticker,
        return_1w: p.return_1w,
        return_1m: p.return_1m,
        return_3m: p.return_3m,
        bullish_score: p.bullish_score,
        early_score: p.early_score,
        rapid_rise: p.rapid_rise,
        early_signal: p.early_signal,
        topic: t,
      };
      if (p.rapid_rise) rapidRise.push(entry);
      else if (p.early_signal) earlySignal.push(entry);
    }

    rapidRise.sort((a, b) => (b.return_1m || 0) - (a.return_1m || 0));
    earlySignal.sort((a, b) => (b.early_score || 0) - (a.early_score || 0));

    return {
      rapidRise: rapidRise.slice(0, 8),
      earlySignal: earlySignal.slice(0, 8),
    };
  }, []);

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rapid rise */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-rose-50 to-orange-50 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>🚀</span>
              快速上漲中
              <span className="text-xs font-normal text-gray-500">技術分析強勢 Top 8</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {watchlist.rapidRise.map((e) => (
              <Link
                key={e.id}
                href={`/${e.topic.topicCategory}/${e.topic.topicSlug}`}
                className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{e.name}</span>
                    <span className="text-[10px] text-gray-400">{e.ticker}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{e.topic.topicName} · {e.topic.sectionName}</p>
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0">
                  <span className="text-emerald-600 font-semibold">
                    {e.return_1m !== null ? `+${e.return_1m.toFixed(1)}%` : "—"}
                  </span>
                  <span className="text-[10px] text-gray-400">1月</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Early signal */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>👀</span>
              預測即將上漲
              <span className="text-xs font-normal text-gray-500">早期訊號 Top 8</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {watchlist.earlySignal.map((e) => (
              <Link
                key={e.id}
                href={`/${e.topic.topicCategory}/${e.topic.topicSlug}`}
                className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{e.name}</span>
                    <span className="text-[10px] text-gray-400">{e.ticker}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{e.topic.topicName} · {e.topic.sectionName}</p>
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {e.early_score}/8
                  </span>
                  <span className="text-[10px] text-gray-400">訊號分</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
