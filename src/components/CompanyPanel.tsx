"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { companies, type Company } from "@/data/companies";
import { relations } from "@/data/relations";
import { categories } from "@/data/categories";
import { priceData } from "@/data/priceData";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface CompanyPanelProps {
  companyId: string | null;
  onClose: () => void;
  onSelectCompany?: (id: string) => void;
}

const categoryColorMap = Object.fromEntries(
  categories.map((c) => [c.id, c.color])
);
const categoryNameMap = Object.fromEntries(
  categories.map((c) => [c.id, c.name])
);

type TabKey = "overview" | "financials" | "supply" | "predictions";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "概況" },
  { key: "financials", label: "財務" },
  { key: "supply", label: "供應鏈" },
  { key: "predictions", label: "預測" },
];

export default function CompanyPanel({
  companyId,
  onClose,
  onSelectCompany,
}: CompanyPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const company = useMemo(
    () => companies.find((c) => c.id === companyId) ?? null,
    [companyId]
  );

  const supplyChain = useMemo(() => {
    if (!companyId) return { suppliers: [], customers: [] };
    const suppliers = relations
      .filter((r) => r.to === companyId)
      .map((r) => ({
        ...r,
        company: companies.find((c) => c.id === r.from),
      }))
      .filter((r) => r.company);
    const customers = relations
      .filter((r) => r.from === companyId)
      .map((r) => ({
        ...r,
        company: companies.find((c) => c.id === r.to),
      }))
      .filter((r) => r.company);
    return { suppliers, customers };
  }, [companyId]);

  const isOpen = companyId !== null && company !== null;

  return (
    <div
      className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "400px" }}
    >
      <div className="h-full bg-white border-l border-gray-200 flex flex-col shadow-xl">
        {/* Header */}
        {company && (
          <>
            <div className="flex items-start justify-between p-4 border-b border-gray-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        categoryColorMap[company.category] || "#4f6df5",
                    }}
                  />
                  <span className="text-xs text-gray-500">
                    {categoryNameMap[company.category]}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  {company.name}
                </h2>
                <p className="text-sm text-gray-500">{company.name_en}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="關閉面板"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors relative ${
                    activeTab === tab.key
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#4f6df5] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "overview" && (
                <OverviewTab company={company} />
              )}
              {activeTab === "financials" && (
                <FinancialsTab company={company} />
              )}
              {activeTab === "supply" && (
                <SupplyTab
                  suppliers={supplyChain.suppliers}
                  customers={supplyChain.customers}
                  onSelect={onSelectCompany}
                />
              )}
              {activeTab === "predictions" && (
                <PredictionsTab company={company} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* -- Overview Tab --------------------------------------------------- */
function OverviewTab({ company }: { company: Company }) {
  const quarterly = company.financials.quarterly;
  const latestQuarter =
    quarterly && quarterly.length > 0 ? quarterly[quarterly.length - 1] : null;
  const latestAnnual =
    company.financials.annual.length > 0
      ? company.financials.annual[company.financials.annual.length - 1]
      : null;
  const price = priceData[company.id];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 leading-relaxed">
        {company.description}
      </p>

      {/* Price & Technical Signals */}
      {price && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">股價</span>
              <span className="text-sm font-bold text-gray-900">
                ${price.price.toLocaleString()}
              </span>
              {price.rapid_rise && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-0.5">
                  🚀 快速上漲
                </span>
              )}
              {!price.rapid_rise && price.early_signal && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-0.5">
                  👀 即將上漲
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400">更新: {price.updated}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            <ReturnCell label="1週" value={price.return_1w} />
            <ReturnCell label="1月" value={price.return_1m} />
            <ReturnCell label="3月" value={price.return_3m} />
            <ReturnCell label="1年" value={price.return_1y} />
          </div>
          {price.signals.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-200">
              {price.signals.map((s, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    s.includes("超買") || s.includes("注意")
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          {price.early_signals && price.early_signals.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-[10px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                👀 即將上漲訊號 ({price.early_score}/8)
              </p>
              <div className="flex flex-wrap gap-1">
                {price.early_signals.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2">
            <span>RSI: <span className="font-semibold text-gray-700">{price.rsi}</span></span>
            <span>動能分數: <span className="font-semibold text-gray-700">{price.bullish_score}/8</span></span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <InfoCard label="股票代號" value={company.ticker} />
        <InfoCard label="國家" value={company.country} />
        <InfoCard label="次產業" value={company.subcategory} />
        <InfoCard
          label="幣別"
          value={`${company.financials.currency} (${company.financials.unit})`}
        />
      </div>

      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#4f6df5] hover:text-[#3b5de7] transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
          公司官網
        </a>
      )}

      {/* Latest quarterly data as most recent */}
      {latestQuarter && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            最新季度數據 ({latestQuarter.quarter})
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="營收"
              value={`${latestQuarter.revenue.toLocaleString()}`}
              unit={company.financials.currency === "TWD" ? "億TWD" : "B USD"}
            />
            <MetricCard
              label="淨利"
              value={`${latestQuarter.net_income.toLocaleString()}`}
              unit={company.financials.currency === "TWD" ? "億TWD" : "B USD"}
              color={latestQuarter.net_income >= 0 ? "#16a34a" : "#dc2626"}
            />
            <MetricCard
              label="毛利率"
              value={`${(latestQuarter.gross_margin * 100).toFixed(1)}%`}
            />
            <MetricCard
              label="YoY 成長"
              value={`${(latestQuarter.growth_rate * 100).toFixed(1)}%`}
              color={latestQuarter.growth_rate >= 0 ? "#16a34a" : "#dc2626"}
            />
          </div>
        </div>
      )}

      {/* Annual summary (secondary) */}
      {latestAnnual && (
        <div className="mt-2">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            最新年度數據 ({latestAnnual.year})
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="年營收"
              value={`${latestAnnual.revenue.toLocaleString()}`}
              unit={company.financials.currency === "TWD" ? "億TWD" : "B USD"}
            />
            <MetricCard
              label="年成長"
              value={`${(latestAnnual.growth_rate * 100).toFixed(1)}%`}
              color={latestAnnual.growth_rate >= 0 ? "#16a34a" : "#dc2626"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* -- Financials Tab ------------------------------------------------- */
type FinancialView = "annual" | "quarterly";

function FinancialsTab({ company }: { company: Company }) {
  const [view, setView] = useState<FinancialView>("annual");

  return (
    <div className="space-y-4">
      {/* Toggle between Annual / Quarterly */}
      <div className="flex bg-gray-100 rounded-lg p-0.5">
        <button
          onClick={() => setView("annual")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            view === "annual"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          年度
        </button>
        <button
          onClick={() => setView("quarterly")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            view === "quarterly"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          季度
        </button>
      </div>

      {view === "annual" ? (
        <AnnualChart company={company} />
      ) : (
        <QuarterlyChart company={company} />
      )}
    </div>
  );
}

/* -- Annual Chart --------------------------------------------------- */
function AnnualChart({ company }: { company: Company }) {
  const annual = company.financials.annual;
  const predictions = company.financials.predictions;

  // Deduplicate: annual years take priority over prediction years
  const seen = new Set<number>();
  const dedupYears: number[] = [];
  const dedupRevenue: (number | null)[] = [];
  const dedupIncome: (number | null)[] = [];
  const dedupMargin: (number | null)[] = [];
  const dedupPredRevenue: (number | null)[] = [];

  for (const a of annual) {
    seen.add(a.year);
    dedupYears.push(a.year);
    dedupRevenue.push(a.revenue);
    dedupIncome.push(a.net_income);
    dedupMargin.push(a.gross_margin * 100);
    dedupPredRevenue.push(null);
  }
  for (const p of predictions) {
    if (seen.has(p.year)) continue;
    seen.add(p.year);
    dedupYears.push(p.year);
    dedupRevenue.push(null);
    dedupIncome.push(null);
    dedupMargin.push(null);
    dedupPredRevenue.push(p.revenue_est);
  }

  const chartOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis" as const,
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      textStyle: { color: "#111827", fontSize: 12 },
    },
    legend: {
      data: ["營收", "淨利", "營收預估", "毛利率"],
      textStyle: { color: "#6b7280", fontSize: 11 },
      top: 0,
    },
    grid: {
      top: 35,
      left: 10,
      right: 10,
      bottom: 5,
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      data: dedupYears.map(String),
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280", fontSize: 11 },
    },
    yAxis: [
      {
        type: "value" as const,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280", fontSize: 10 },
      },
      {
        type: "value" as const,
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: "#6b7280",
          fontSize: 10,
          formatter: "{value}%",
        },
        max: 100,
        min: 0,
      },
    ],
    series: [
      {
        name: "營收",
        type: "bar",
        data: dedupRevenue,
        itemStyle: { color: "#4f6df5", borderRadius: [3, 3, 0, 0] },
        barMaxWidth: 30,
      },
      {
        name: "淨利",
        type: "bar",
        data: dedupIncome,
        itemStyle: {
          color: (params: { value: number | null }) =>
            params.value !== null && params.value >= 0
              ? "#16a34a"
              : "#dc2626",
          borderRadius: [3, 3, 0, 0],
        },
        barMaxWidth: 30,
      },
      {
        name: "營收預估",
        type: "bar",
        data: dedupPredRevenue,
        itemStyle: {
          color: "rgba(79, 109, 245, 0.25)",
          borderRadius: [3, 3, 0, 0],
          borderWidth: 1,
          borderColor: "#4f6df5",
          borderType: "dashed" as const,
        },
        barMaxWidth: 30,
      },
      {
        name: "毛利率",
        type: "line",
        yAxisIndex: 1,
        data: dedupMargin,
        lineStyle: { color: "#f59e0b", width: 2 },
        itemStyle: { color: "#f59e0b" },
        symbol: "circle",
        symbolSize: 6,
        connectNulls: false,
      },
    ],
  };

  return (
    <>
      <div style={{ height: 260 }}>
        <ReactECharts
          option={chartOption}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
      </div>

      {/* Annual metrics table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-500 font-medium">年度</th>
              <th className="text-right py-2 text-gray-500 font-medium">營收</th>
              <th className="text-right py-2 text-gray-500 font-medium">淨利</th>
              <th className="text-right py-2 text-gray-500 font-medium">毛利率</th>
              <th className="text-right py-2 text-gray-500 font-medium">營業利益率</th>
              <th className="text-right py-2 text-gray-500 font-medium">成長率</th>
            </tr>
          </thead>
          <tbody>
            {annual.map((a) => (
              <tr key={a.year} className="border-b border-gray-100">
                <td className="py-1.5 text-gray-700">{a.year}</td>
                <td className="py-1.5 text-right text-gray-900">
                  {a.revenue.toLocaleString()}
                </td>
                <td
                  className="py-1.5 text-right"
                  style={{
                    color: a.net_income >= 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {a.net_income.toLocaleString()}
                </td>
                <td className="py-1.5 text-right text-gray-700">
                  {(a.gross_margin * 100).toFixed(1)}%
                </td>
                <td className="py-1.5 text-right text-gray-700">
                  {(a.operating_margin * 100).toFixed(1)}%
                </td>
                <td
                  className="py-1.5 text-right"
                  style={{
                    color: a.growth_rate >= 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {(a.growth_rate * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-gray-400 mt-2">
        單位:{" "}
        {company.financials.unit === "billion_usd"
          ? "十億美元"
          : "十億新台幣"}{" "}
        ({company.financials.currency})
      </p>
    </>
  );
}

/* -- Quarterly Chart (new) ------------------------------------------ */
function QuarterlyChart({ company }: { company: Company }) {
  const quarterly = company.financials.quarterly;

  if (!quarterly || quarterly.length === 0) {
    return <p className="text-sm text-gray-500">暫無季度資料</p>;
  }

  const quarters = quarterly.map((q) => q.quarter);
  const revenues = quarterly.map((q) => q.revenue);
  const margins = quarterly.map((q) => q.gross_margin * 100);

  const chartOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis" as const,
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      textStyle: { color: "#111827", fontSize: 12 },
    },
    legend: {
      data: ["季營收", "毛利率"],
      textStyle: { color: "#6b7280", fontSize: 11 },
      top: 0,
    },
    grid: {
      top: 35,
      left: 10,
      right: 10,
      bottom: 5,
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      data: quarters,
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280", fontSize: 10, rotate: 30 },
    },
    yAxis: [
      {
        type: "value" as const,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280", fontSize: 10 },
      },
      {
        type: "value" as const,
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: "#6b7280",
          fontSize: 10,
          formatter: "{value}%",
        },
        max: 100,
        min: 0,
      },
    ],
    series: [
      {
        name: "季營收",
        type: "bar",
        data: revenues.map((v, i) => ({
          value: v,
          itemStyle: {
            color: quarterly[i].quarter.startsWith("2026")
              ? "rgba(79, 109, 245, 0.35)"
              : "#4f6df5",
            borderRadius: [3, 3, 0, 0],
            ...(quarterly[i].quarter.startsWith("2026")
              ? {
                  borderWidth: 1,
                  borderColor: "#4f6df5",
                  borderType: "dashed" as const,
                }
              : {}),
          },
        })),
        barMaxWidth: 32,
      },
      {
        name: "毛利率",
        type: "line",
        yAxisIndex: 1,
        data: margins,
        lineStyle: { color: "#f59e0b", width: 2 },
        itemStyle: { color: "#f59e0b" },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  };

  return (
    <>
      <div style={{ height: 260 }}>
        <ReactECharts
          option={chartOption}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
      </div>

      {/* Legend note for 2026 bars */}
      <p className="text-[10px] text-gray-400 mb-2 flex items-center gap-2">
        <span className="inline-block w-3 h-2 rounded-sm bg-[#4f6df5]" />{" "}
        2025 實際
        <span className="inline-block w-3 h-2 rounded-sm border border-[#4f6df5] border-dashed bg-[rgba(79,109,245,0.2)]" />{" "}
        2026 近期
      </p>

      {/* Quarterly data table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-500 font-medium">
                季度
              </th>
              <th className="text-right py-2 text-gray-500 font-medium">
                營收
              </th>
              <th className="text-right py-2 text-gray-500 font-medium">
                淨利
              </th>
              <th className="text-right py-2 text-gray-500 font-medium">
                毛利率
              </th>
              <th className="text-right py-2 text-gray-500 font-medium">
                YoY
              </th>
            </tr>
          </thead>
          <tbody>
            {quarterly.map((q) => (
              <tr
                key={q.quarter}
                className={`border-b border-gray-100 ${
                  q.quarter.startsWith("2026") ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-1.5 text-gray-700">
                  {q.quarter}
                  {q.quarter.startsWith("2026") && (
                    <span className="ml-1 text-[9px] text-gray-400">*</span>
                  )}
                </td>
                <td className="py-1.5 text-right text-gray-900">
                  {q.revenue.toLocaleString()}
                </td>
                <td
                  className="py-1.5 text-right"
                  style={{
                    color: q.net_income >= 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {q.net_income.toLocaleString()}
                </td>
                <td className="py-1.5 text-right text-gray-700">
                  {(q.gross_margin * 100).toFixed(1)}%
                </td>
                <td
                  className="py-1.5 text-right"
                  style={{
                    color: q.growth_rate >= 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {q.growth_rate >= 0 ? "+" : ""}
                  {(q.growth_rate * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-gray-400 mt-2">
        單位:{" "}
        {company.financials.unit === "billion_usd"
          ? "十億美元"
          : "十億新台幣"}{" "}
        ({company.financials.currency}) | * 近期數據
      </p>
    </>
  );
}

/* -- Supply Chain Tab ----------------------------------------------- */
function SupplyTab({
  suppliers,
  customers,
  onSelect,
}: {
  suppliers: Array<{
    from: string;
    to: string;
    type: string;
    strength: string;
    label: string;
    company?: Company;
  }>;
  customers: Array<{
    from: string;
    to: string;
    type: string;
    strength: string;
    label: string;
    company?: Company;
  }>;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Suppliers */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          上游供應商 ({suppliers.length})
        </h3>
        {suppliers.length === 0 ? (
          <p className="text-xs text-gray-400">無上游供應商資料</p>
        ) : (
          <div className="space-y-1.5">
            {suppliers.map((s, i) => (
              <button
                key={`sup-${i}`}
                onClick={() => s.company && onSelect?.(s.company.id)}
                className="w-full text-left p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        categoryColorMap[s.company?.category ?? ""] ||
                        "#4f6df5",
                    }}
                  />
                  <span className="text-sm text-gray-900 font-medium group-hover:text-[#4f6df5] transition-colors">
                    {s.company?.name_en}
                  </span>
                  <span
                    className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                      s.strength === "critical"
                        ? "bg-red-100 text-red-600"
                        : s.strength === "major"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {s.strength}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 ml-4.5 line-clamp-1">
                  {s.label}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Customers */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          下游客戶 ({customers.length})
        </h3>
        {customers.length === 0 ? (
          <p className="text-xs text-gray-400">無下游客戶資料</p>
        ) : (
          <div className="space-y-1.5">
            {customers.map((c, i) => (
              <button
                key={`cus-${i}`}
                onClick={() => c.company && onSelect?.(c.company.id)}
                className="w-full text-left p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        categoryColorMap[c.company?.category ?? ""] ||
                        "#4f6df5",
                    }}
                  />
                  <span className="text-sm text-gray-900 font-medium group-hover:text-[#4f6df5] transition-colors">
                    {c.company?.name_en}
                  </span>
                  <span
                    className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                      c.strength === "critical"
                        ? "bg-red-100 text-red-600"
                        : c.strength === "major"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.strength}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 ml-4.5 line-clamp-1">
                  {c.label}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -- Predictions Tab ------------------------------------------------ */
function PredictionsTab({ company }: { company: Company }) {
  const predictions = company.financials.predictions;
  const latest =
    company.financials.annual.length > 0
      ? company.financials.annual[company.financials.annual.length - 1]
      : null;

  if (predictions.length === 0) {
    return <p className="text-sm text-gray-500">暫無預測資料</p>;
  }

  return (
    <div className="space-y-3">
      {latest && (
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">基準年 ({latest.year})</p>
          <p className="text-lg font-bold text-gray-900">
            營收 {latest.revenue.toLocaleString()}{" "}
            <span className="text-xs font-normal text-gray-500">
              {company.financials.currency === "TWD" ? "億TWD" : "B USD"}
            </span>
          </p>
        </div>
      )}

      {predictions.map((p) => (
        <div
          key={p.year}
          className="p-3 rounded-lg bg-gray-50 border border-dashed border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {p.year} 預估
            </span>
            <span className="text-xs text-gray-500">{p.source}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-gray-500">營收預估</p>
              <p className="text-base font-bold text-gray-900">
                {p.revenue_est.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">成長預估</p>
              <p
                className="text-base font-bold"
                style={{
                  color: p.growth_est >= 0 ? "#16a34a" : "#dc2626",
                }}
              >
                {p.growth_est >= 0 ? "+" : ""}
                {(p.growth_est * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -- Shared UI Components ------------------------------------------- */
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-gray-50">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm text-gray-900 font-medium truncate">{value}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit?: string;
  color?: string;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-gray-50">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-base font-bold" style={{ color: color || "#111827" }}>
        {value}
        {unit && (
          <span className="text-[10px] font-normal text-gray-500 ml-1">
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}

function ReturnCell({ label, value }: { label: string; value: number | null }) {
  const isUp = value !== null && value >= 0;
  return (
    <div className="text-center p-1.5 rounded bg-white border border-gray-100">
      <div className="text-[9px] text-gray-500">{label}</div>
      <div
        className="text-xs font-semibold"
        style={{ color: value === null ? "#9ca3af" : isUp ? "#16a34a" : "#dc2626" }}
      >
        {value === null ? "—" : `${isUp ? "+" : ""}${value.toFixed(1)}%`}
      </div>
    </div>
  );
}
