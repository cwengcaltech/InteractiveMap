"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  RISK_META,
  chokepointCountries,
  chokepoints,
  riskLevel,
  type Chokepoint,
  type RiskLevel,
} from "@/lib/chokepoints";
import { countryFlag } from "@/lib/countryFlags";

const LEVEL_ORDER: RiskLevel[] = ["critical", "high", "moderate", "diversified"];

export default function ChokepointsPage() {
  const [country, setCountry] = useState<string | null>(null);
  const [level, setLevel] = useState<RiskLevel | null>(null);

  const counts = useMemo(() => {
    const map = new Map<RiskLevel, number>();
    for (const c of chokepoints) {
      const l = riskLevel(c);
      map.set(l, (map.get(l) ?? 0) + 1);
    }
    return map;
  }, []);

  const rows = useMemo(() => {
    return chokepoints
      .filter((c) => (level ? riskLevel(c) === level : true))
      .filter((c) => (country ? c.topCountry === country : true))
      .sort((a, b) => {
        const order =
          LEVEL_ORDER.indexOf(riskLevel(a)) - LEVEL_ORDER.indexOf(riskLevel(b));
        if (order !== 0) return order;
        if (b.topShare !== a.topShare) return b.topShare - a.topShare;
        return a.playerCount - b.playerCount;
      });
  }, [country, level]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← 回首頁
          </Link>
          <h1 className="text-base font-semibold text-gray-900">供應鏈瓶頸</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-5 space-y-4">
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            每個供應鏈環節的國別集中度。分級只看「單一國家佔比」與「供應商家數」——
            兩者都是從公司所在地直接算出來的事實，不摻入地緣政治評分之類無法驗證的主觀權重。
            同一家公司若在資料中有多個條目（例如併購來的產品線），以股票代號視為同一家。
          </p>
          <p className="text-xs text-gray-400 mt-2">
            共分析 {chokepoints.length} 個環節（至少 3 家可判定國別的供應商）
          </p>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1.5">風險等級</p>
            <div className="flex flex-wrap gap-1.5">
              {LEVEL_ORDER.map((l) => {
                const meta = RISK_META[l];
                const active = level === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLevel(active ? null : l)}
                    title={meta.description}
                    className="px-2.5 py-1 rounded-lg text-xs border transition-colors"
                    style={
                      active
                        ? {
                            backgroundColor: meta.color,
                            borderColor: meta.color,
                            color: "#fff",
                          }
                        : {
                            backgroundColor: meta.bg,
                            borderColor: "transparent",
                            color: meta.color,
                          }
                    }
                  >
                    {meta.label} ({counts.get(l) ?? 0})
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">主導國家（該國在環節中佔比最高）</p>
            <div className="flex flex-wrap gap-1.5">
              {chokepointCountries.map(({ country: code, sections }) => (
                <button
                  key={code}
                  onClick={() => setCountry(country === code ? null : code)}
                  className={`px-2 py-1 rounded-lg text-xs border transition-colors ${
                    country === code
                      ? "bg-[#4f6df5] border-transparent text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {countryFlag(code)} {code} ({sections})
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">{rows.length} 個環節</p>

        <div className="space-y-2">
          {rows.map((c) => (
            <ChokepointCard key={`${c.topicSlug}-${c.sectionId}`} data={c} />
          ))}
          {rows.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              沒有符合條件的環節
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

function ChokepointCard({ data }: { data: Chokepoint }) {
  const meta = RISK_META[riskLevel(data)];
  return (
    <div
      className="rounded-xl bg-white border border-gray-200 shadow-sm p-3.5 hover:shadow-md transition-all duration-200"
      style={{ borderLeftWidth: "3px", borderLeftColor: data.topicColor }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-900">
            {data.sectionName}
          </h2>
          <Link
            href={`/${data.topicCategory}/${data.topicSlug}`}
            className="text-xs text-gray-400 hover:text-[#4f6df5] transition-colors"
          >
            {data.topicName}
          </Link>
        </div>
        <span
          className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: meta.bg, color: meta.color }}
        >
          {meta.label}風險
        </span>
      </div>

      {/* 國別佔比長條：寬度即佔比，數字直接標在旁邊 */}
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-100 mb-2">
        {data.byCountry.map((b, i) => (
          <div
            key={b.country}
            style={{
              width: `${b.share * 100}%`,
              backgroundColor: i === 0 ? meta.color : "#cbd5e1",
              marginRight: i < data.byCountry.length - 1 ? 2 : 0,
            }}
            title={`${b.country} ${b.count}/${data.playerCount}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
        <span className="text-gray-700">
          {countryFlag(data.topCountry)} {data.topCountry}{" "}
          {(data.topShare * 100).toFixed(0)}%
        </span>
        <span>{data.playerCount} 家供應商</span>
        <span>集中度 {data.hhi.toFixed(2)}</span>
        <Link
          href={`/compare?group=${data.sectionId}`}
          className="text-gray-500 hover:text-[#4f6df5] transition-colors"
        >
          比較這個環節 →
        </Link>
      </div>

      <p className="mt-1.5 text-xs text-gray-400">
        {data.byCountry
          .map((b) => `${b.country}: ${b.companies.join("、")}`)
          .join(" ／ ")}
      </p>
    </div>
  );
}
