"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { CompareRow } from "@/lib/compare";
import {
  SERIES_COLORS,
  chartInk,
  formatPercent,
  formatUsdBillions,
  legendStyle,
  tooltipStyle,
} from "@/lib/chartTheme";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface Axis {
  label: string;
  /** 取值；null 代表該公司此指標從缺 */
  get: (row: CompareRow) => number | null;
  format: (value: number) => string;
}

const AXES: Axis[] = [
  {
    label: "營收規模",
    get: (r) => r.revenue,
    format: (v) => formatUsdBillions(v),
  },
  { label: "成長率", get: (r) => r.growth, format: (v) => formatPercent(v) },
  { label: "毛利率", get: (r) => r.grossMargin, format: (v) => formatPercent(v) },
  {
    label: "營益率",
    get: (r) => r.operatingMargin,
    format: (v) => formatPercent(v),
  },
  {
    label: "3月動能",
    get: (r) => r.return3m,
    format: (v) => `${v.toFixed(1)}%`,
  },
];

/**
 * 百分位排名：0 表示同業中最低、100 表示最高。
 *
 * 五個指標的量綱天差地別（營收是十億美元、毛利率是比例、報酬率可為負），
 * 直接畫在同一張雷達圖上沒有意義，因此一律換算成「在該同業群組中的百分位」。
 * 原始數值仍會出現在 tooltip。
 */
function percentile(value: number | null, population: number[]): number | null {
  if (value === null || population.length === 0) return null;
  const below = population.filter((v) => v < value).length;
  const equal = population.filter((v) => v === value).length;
  return Math.round(((below + equal / 2) / population.length) * 100);
}

interface Props {
  /** 用來計算百分位的母體：整個同業群組 */
  population: CompareRow[];
  /** 實際畫出來的公司，上限由色票驗證決定 */
  selected: CompareRow[];
}

export default function PeerRadar({ population, selected }: Props) {
  const option = useMemo(() => {
    const populations = AXES.map((axis) =>
      population
        .map((row) => axis.get(row))
        .filter((v): v is number => v !== null),
    );

    const series = selected.map((row, i) => ({
      name: row.name,
      value: AXES.map((axis, ai) => percentile(axis.get(row), populations[ai])),
      raw: AXES.map((axis) => {
        const v = axis.get(row);
        return v === null ? "—" : axis.format(v);
      }),
      itemStyle: { color: SERIES_COLORS[i] },
      lineStyle: { width: 2, color: SERIES_COLORS[i] },
      areaStyle: { opacity: 0.12, color: SERIES_COLORS[i] },
    }));

    return {
      backgroundColor: "transparent",
      tooltip: {
        ...tooltipStyle,
        formatter: (params: {
          name: string;
          data: { raw: string[]; value: (number | null)[] };
        }) => {
          const lines = AXES.map(
            (axis, i) =>
              `${axis.label}：${params.data.raw[i]}` +
              `<span style="color:${chartInk.secondary}"> (第 ${
                params.data.value[i] ?? "—"
              } 百分位)</span>`,
          );
          return `<b>${params.name}</b><br/>${lines.join("<br/>")}`;
        },
      },
      legend: { ...legendStyle, data: selected.map((r) => r.name) },
      radar: {
        indicator: AXES.map((axis) => ({ name: axis.label, max: 100 })),
        radius: "62%",
        center: ["50%", "56%"],
        axisName: { color: chartInk.secondary, fontSize: 11 },
        splitLine: { lineStyle: { color: chartInk.line } },
        splitArea: { areaStyle: { color: ["#fff", "#fafafa"] } },
        axisLine: { lineStyle: { color: chartInk.line } },
      },
      series: [
        {
          type: "radar" as const,
          symbolSize: 8,
          data: series,
        },
      ],
    };
  }, [population, selected]);

  if (selected.length === 0) {
    return (
      <div className="h-[320px] flex items-center justify-center text-sm text-gray-500">
        點選表格中的公司即可加入比較
      </div>
    );
  }

  return (
    <div style={{ height: 320 }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }}
        notMerge
      />
    </div>
  );
}
