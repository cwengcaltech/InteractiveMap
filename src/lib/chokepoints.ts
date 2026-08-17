import { companyProfiles } from "@/data/companyProfiles";
import { topics } from "@/data/topics";
import type { MarketType } from "@/data/categories";

export interface CountryShare {
  country: string;
  count: number;
  share: number;
  companies: string[];
}

export interface Chokepoint {
  sectionId: string;
  sectionName: string;
  topicSlug: string;
  topicName: string;
  topicCategory: string;
  topicColor: string;
  marketType: MarketType;
  /** 該環節中可判定國別的公司數 */
  playerCount: number;
  /** 依佔比排序的國別分佈 */
  byCountry: CountryShare[];
  /** 最大國別的佔比，0–1 */
  topShare: number;
  topCountry: string;
  /**
   * 集中度指數（Herfindahl，0–1）。
   * 所有公司同國為 1；平均分散於 n 國為 1/n。
   */
  hhi: number;
}

const countryOf = new Map(companyProfiles.map((c) => [c.id, c.country]));
const nameOf = new Map(companyProfiles.map((c) => [c.id, c.name]));
const tickerOf = new Map(companyProfiles.map((c) => [c.id, c.ticker]));

/**
 * 同一家公司在資料中可能以多個 id 出現（例如 Synopsys 與「Synopsys (原 Kilopass)」
 * 分別代表本體與併購來的產品線）。計算集中度時必須視為同一家，
 * 否則會把「兩家供應商」誤算成三家而低估風險。以 ticker 為身分依據。
 */
function dedupeByCompany(ids: string[]): string[] {
  const seen = new Set<string>();
  return ids.filter((id) => {
    const key = tickerOf.get(id) || id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * 各供應鏈環節的國別集中度。
 *
 * 只收 hw/sw 主題（健康主題沒有供應鏈意涵），且至少要有 3 家可判定國別的公司——
 * 兩家公司的「100% 集中」多半只是收錄不全，不足以稱為瓶頸。
 */
export const chokepoints: Chokepoint[] = topics
  .filter((topic) => topic.category !== "hl")
  .flatMap((topic) =>
    topic.sections.map((section) => {
      const members = dedupeByCompany(
        section.companies.map((c) => c.id).filter((id) => countryOf.has(id)),
      );

      const counts = new Map<string, string[]>();
      for (const id of members) {
        const country = countryOf.get(id)!;
        counts.set(country, [...(counts.get(country) ?? []), nameOf.get(id)!]);
      }

      const byCountry: CountryShare[] = [...counts.entries()]
        .map(([country, names]) => ({
          country,
          count: names.length,
          share: names.length / members.length,
          companies: names,
        }))
        .sort((a, b) => b.count - a.count);

      return {
        sectionId: section.id,
        sectionName: section.name,
        topicSlug: topic.slug,
        topicName: topic.name,
        topicCategory: topic.category,
        topicColor: topic.color,
        marketType: section.marketType,
        playerCount: members.length,
        byCountry,
        topShare: byCountry[0]?.share ?? 0,
        topCountry: byCountry[0]?.country ?? "",
        hhi: byCountry.reduce((sum, c) => sum + c.share * c.share, 0),
      };
    }),
  )
  .filter((c) => c.playerCount >= 3);

/**
 * 各國「主導」的環節數——該國在環節中佔比最高者才計入。
 *
 * 用主導數而非參與數：幾乎每個環節都有美國公司參與，參與數會讓所有國家
 * 看起來差不多；主導數才看得出誰真的掐著哪些環節。
 */
export const chokepointCountries: Array<{ country: string; sections: number }> =
  (() => {
    const counts = new Map<string, number>();
    for (const c of chokepoints) {
      counts.set(c.topCountry, (counts.get(c.topCountry) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([country, sections]) => ({ country, sections }))
      .sort((a, b) => b.sections - a.sections);
  })();

export type RiskLevel = "critical" | "high" | "moderate" | "diversified";

/**
 * 風險分級。
 *
 * 分級只看「單一國家佔比」與「供應商家數」——兩者都是資料算得出來的事實，
 * 不摻入地緣政治評分之類無法從資料驗證的主觀權重。
 */
export function riskLevel(c: Chokepoint): RiskLevel {
  if (c.topShare === 1) return c.playerCount <= 4 ? "critical" : "high";
  if (c.topShare >= 0.75) return "high";
  if (c.topShare >= 0.5) return "moderate";
  return "diversified";
}

export const RISK_META: Record<
  RiskLevel,
  { label: string; color: string; bg: string; description: string }
> = {
  critical: {
    label: "極高",
    color: "#b91c1c",
    bg: "#fee2e2",
    description: "單一國家包辦，且供應商在 4 家以內",
  },
  high: {
    label: "高",
    color: "#c2410c",
    bg: "#ffedd5",
    description: "單一國家佔 75% 以上",
  },
  moderate: {
    label: "中",
    color: "#a16207",
    bg: "#fef3c7",
    description: "單一國家佔 50%–75%",
  },
  diversified: {
    label: "分散",
    color: "#15803d",
    bg: "#dcfce7",
    description: "無單一國家過半",
  },
};
