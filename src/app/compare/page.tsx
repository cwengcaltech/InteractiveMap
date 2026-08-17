"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";
import CompareTable from "@/components/compare/CompareTable";
import FilterBar, {
  EMPTY_FILTERS,
  type Filters,
} from "@/components/compare/FilterBar";
import PeerBubble from "@/components/compare/PeerBubble";
import PeerRadar from "@/components/compare/PeerRadar";
import { MAX_COMPARE_SERIES } from "@/lib/chartTheme";
import {
  compareRows,
  getPeerGroup,
  getRow,
  peerGroups,
  type CompareRow,
} from "@/lib/compare";
import { countryFlag } from "@/lib/countryFlags";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-gray-500">載入中…</div>}>
      <CompareView />
    </Suspense>
  );
}

function CompareView() {
  const router = useRouter();
  const params = useSearchParams();

  const groupId = params.get("group");
  const group = groupId ? getPeerGroup(groupId) : undefined;

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [groupQuery, setGroupQuery] = useState("");

  const selectedIds = useMemo(() => {
    const raw = params.get("ids");
    return raw ? raw.split(",").filter((id) => getRow(id)) : [];
  }, [params]);

  /** 比較對象的母體：選定同業群組時是該群組，否則是全市場。 */
  const population: CompareRow[] = useMemo(() => {
    if (group) {
      return group.memberIds
        .map((id) => getRow(id))
        .filter((r): r is CompareRow => r !== undefined);
    }
    return compareRows;
  }, [group]);

  const filtered = useMemo(() => {
    return population.filter((row) => {
      if (filters.countries.length && !filters.countries.includes(row.country))
        return false;
      if (filters.categories.length && !filters.categories.includes(row.category))
        return false;
      if (filters.minGrowth !== null) {
        if (row.growth === null || row.growth * 100 < filters.minGrowth)
          return false;
      }
      if (filters.minMarketCap !== null) {
        if (row.marketCap === null || row.marketCap < filters.minMarketCap)
          return false;
      }
      return true;
    });
  }, [population, filters]);

  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => getRow(id))
        .filter((r): r is CompareRow => r !== undefined),
    [selectedIds],
  );

  /**
   * 表格與圖表共用同一份資料。
   *
   * 選中的公司可能來自其他群組或被篩選條件排除，若不併回來，
   * 圖上看得到的公司在表格裡卻找不到，兩邊會對不起來。
   */
  const displayRows = useMemo(() => {
    const ids = new Set(filtered.map((r) => r.id));
    return [...filtered, ...selected.filter((r) => !ids.has(r.id))];
  }, [filtered, selected]);

  const updateUrl = useCallback(
    (nextGroup: string | null, nextIds: string[]) => {
      const q = new URLSearchParams();
      if (nextGroup) q.set("group", nextGroup);
      if (nextIds.length) q.set("ids", nextIds.join(","));
      const qs = q.toString();
      router.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
    },
    [router],
  );

  const toggleCompany = useCallback(
    (id: string) => {
      const next = selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : // 已達色票允許的系列上限時，替換最早選的那一家
          [...selectedIds, id].slice(-MAX_COMPARE_SERIES);
      updateUrl(groupId, next);
    },
    [selectedIds, groupId, updateUrl],
  );

  const availableCountries = useMemo(
    () => [...new Set(population.map((r) => r.country))].sort(),
    [population],
  );

  const groupOptions = useMemo(() => {
    const q = groupQuery.trim().toLowerCase();
    if (!q) return peerGroups.slice(0, 40);
    return peerGroups
      .filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.topicName.toLowerCase().includes(q),
      )
      .slice(0, 40);
  }, [groupQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← 回首頁
          </Link>
          <h1 className="text-base font-semibold text-gray-900">同業比較</h1>
          {group && (
            <span className="text-sm text-gray-500 truncate">
              {group.topicName} · {group.name}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5 space-y-5">
        <section className="rounded-xl bg-white border border-gray-200 shadow-sm p-3">
          <p className="text-xs text-gray-500 mb-1.5">同業群組</p>
          <input
            value={groupQuery}
            onChange={(e) => setGroupQuery(e.target.value)}
            placeholder="搜尋環節或主題，例如「HBM」「載板」"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#4f6df5] transition-colors"
          />
          <div className="flex flex-wrap gap-1.5 mt-2 max-h-32 overflow-y-auto">
            <button
              onClick={() => updateUrl(null, selectedIds)}
              className={`px-2 py-1 rounded-lg text-xs border transition-colors ${
                !groupId
                  ? "bg-[#4f6df5] border-transparent text-white"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              全市場 ({compareRows.length})
            </button>
            {groupOptions.map((g) => (
              <button
                key={g.id}
                onClick={() => updateUrl(g.id, selectedIds)}
                className={`px-2 py-1 rounded-lg text-xs border transition-colors ${
                  groupId === g.id
                    ? "border-transparent text-white"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  groupId === g.id ? { backgroundColor: g.topicColor } : undefined
                }
                title={`${g.topicName} · ${g.name}`}
              >
                {g.name} ({g.memberIds.length})
              </button>
            ))}
          </div>
        </section>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          availableCountries={availableCountries}
          countryFlag={countryFlag}
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-3">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-sm font-medium text-gray-900">
                指標雷達（最多 {MAX_COMPARE_SERIES} 家）
              </h2>
              <span className="text-xs text-gray-400">
                數值為同業百分位
              </span>
            </div>
            <PeerRadar population={displayRows} selected={selected} />
          </div>

          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-3">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-sm font-medium text-gray-900">
                成長 × 獲利分佈
              </h2>
              <span className="text-xs text-gray-400">泡泡大小為年營收</span>
            </div>
            <PeerBubble universe={displayRows} selected={selected} />
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-gray-900">
              對照表（{displayRows.length} 家）
            </h2>
            <span className="text-xs text-gray-400">
              點選任一列即可加入／移出圖表
            </span>
          </div>
          <CompareTable
            rows={displayRows}
            highlighted={selectedIds}
            onToggle={toggleCompany}
          />
        </section>
      </main>
    </div>
  );
}
