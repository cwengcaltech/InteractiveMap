import { companies, type Company } from "@/data/companies";
import { priceData, type PriceData } from "@/data/priceData";
import { topics } from "@/data/topics";
import { toUsd } from "@/data/fx";

/** 一家公司在比較視圖中需要的全部欄位，財務與股價都已正規化成可跨市場比較的值。 */
export interface CompareRow {
  id: string;
  name: string;
  ticker: string;
  country: string;
  category: string;
  subcategory: string;
  /** 最新年度營收（十億美元） */
  revenue: number | null;
  /** 年增率，0.15 表示 +15% */
  growth: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  /** 市值（十億美元） */
  marketCap: number | null;
  return1m: number | null;
  return3m: number | null;
  return1y: number | null;
  rsi: number | null;
  bullishScore: number | null;
  viewType: string | null;
}

/** 同業群組：來自 topics.ts 的 section，是資料中語意最乾淨的分組依據。 */
export interface PeerGroup {
  id: string;
  /** 環節名稱，例如「ASIC 設計服務 Tier-1」 */
  name: string;
  topicSlug: string;
  topicName: string;
  topicCategory: string;
  topicColor: string;
  memberIds: string[];
}

function latestAnnual(company: Company) {
  const annual = company.financials.annual;
  return annual.length ? annual[annual.length - 1] : null;
}

function buildRow(company: Company, price: PriceData | undefined): CompareRow {
  const annual = latestAnnual(company);
  const currency = company.financials.currency;
  return {
    id: company.id,
    name: company.name,
    ticker: company.ticker,
    country: company.country,
    category: company.category,
    subcategory: company.subcategory,
    revenue: annual ? toUsd(annual.revenue, currency) : null,
    growth: annual ? annual.growth_rate : null,
    grossMargin: annual ? annual.gross_margin : null,
    operatingMargin: annual ? annual.operating_margin : null,
    marketCap: price?.market_cap_usd ?? null,
    return1m: price?.return_1m ?? null,
    return3m: price?.return_3m ?? null,
    return1y: price?.return_1y ?? null,
    rsi: price?.rsi ?? null,
    bullishScore: price?.bullish_score ?? null,
    viewType: price?.view_type ?? null,
  };
}

/** 全部可比較的公司（有完整 profile 者）。 */
export const compareRows: CompareRow[] = companies.map((c) =>
  buildRow(c, priceData[c.id]),
);

const rowById = new Map<string, CompareRow>(compareRows.map((r) => [r.id, r]));

export function getRow(id: string): CompareRow | undefined {
  return rowById.get(id);
}

/**
 * 所有同業群組。
 *
 * 以 topics 的 section 為單位，只保留至少 2 家有財務資料的群組——
 * 少於 2 家就沒有「比較」可言。健康主題（hl）沒有股票與財務資料，排除。
 */
export const peerGroups: PeerGroup[] = topics
  .filter((topic) => topic.category !== "hl")
  .flatMap((topic) =>
    topic.sections.map((section) => ({
      id: section.id,
      name: section.name,
      topicSlug: topic.slug,
      topicName: topic.name,
      topicCategory: topic.category,
      topicColor: topic.color,
      memberIds: section.companies
        .map((c) => c.id)
        .filter((id) => rowById.has(id)),
    })),
  )
  .filter((group) => group.memberIds.length >= 2);

const groupById = new Map<string, PeerGroup>(peerGroups.map((g) => [g.id, g]));

export function getPeerGroup(id: string): PeerGroup | undefined {
  return groupById.get(id);
}

/** 一家公司所屬的所有同業群組，用於從公司面板跳進比較頁。 */
export function groupsForCompany(companyId: string): PeerGroup[] {
  return peerGroups.filter((g) => g.memberIds.includes(companyId));
}
