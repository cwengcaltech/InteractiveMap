"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { CompareRow } from "@/lib/compare";
import {
  NEUTRAL_MARK,
  SERIES_COLORS,
  axisStyle,
  chartInk,
  formatUsdBillions,
  legendStyle,
  tooltipStyle,
} from "@/lib/chartTheme";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

/** 泡泡半徑：對營收開平方根，讓「面積」而非半徑正比於營收。 */
function bubbleSize(revenue: number | null): number {
  if (!revenue || revenue <= 0) return 8;
  return Math.min(48, Math.max(8, Math.sqrt(revenue) * 2.2));
}

interface Point {
  value: [number, number, number];
  name: string;
  ticker: string;
  revenue: number | null;
}

/** year 為 null 時用最新一年的數字；指定年份則取該年度，供時間軸回放使用。 */
function toPoint(row: CompareRow, year: number | null): Point | null {
  const m = year === null ? row : row.byYear[year];
  if (!m || m.growth === null || m.grossMargin === null) return null;
  return {
    value: [m.growth * 100, m.grossMargin * 100, bubbleSize(m.revenue)],
    name: row.name,
    ticker: row.ticker,
    revenue: m.revenue,
  };
}

/**
 * 顯示範圍。
 *
 * 少數公司的毛利率可到 -250%、營收成長率可到 +700%（多為轉虧或基期極低的生技股），
 * 若讓座標軸自動縮放，其餘幾百家會被壓成角落一團。因此固定範圍，
 * 並把落在範圍外的家數標示出來，不做無聲截斷。
 */
const X_RANGE: [number, number] = [-100, 300];
const Y_RANGE: [number, number] = [-50, 100];

function inRange(p: Point): boolean {
  return (
    p.value[0] >= X_RANGE[0] &&
    p.value[0] <= X_RANGE[1] &&
    p.value[1] >= Y_RANGE[0] &&
    p.value[1] <= Y_RANGE[1]
  );
}

interface Props {
  /** 襯底的全市場（已套用篩選） */
  universe: CompareRow[];
  /** 上色並標名的公司 */
  selected: CompareRow[];
  /** 要呈現的年度；null 表示最新一年 */
  year?: number | null;
}

export default function PeerBubble({ universe, selected, year = null }: Props) {
  const { option, hidden } = useMemo(() => {
    const selectedIds = new Set(selected.map((r) => r.id));
    const allBackground = universe
      .filter((r) => !selectedIds.has(r.id))
      .map((r) => toPoint(r, year))
      .filter((p): p is Point => p !== null);
    const background = allBackground.filter(inRange);
    const hiddenCount = allBackground.length - background.length;

    const tooltipFor = (p: Point) =>
      `<b>${p.name}</b> <span style="color:${chartInk.secondary}">${p.ticker}</span><br/>` +
      `成長率：${p.value[0].toFixed(1)}%<br/>` +
      `毛利率：${p.value[1].toFixed(1)}%<br/>` +
      `年營收：${formatUsdBillions(p.revenue)}`;

    // 大泡泡先畫、小泡泡後畫，否則小的會被大的整個蓋住看不見
    const ordered = selected
      .map((row, i) => ({
        row,
        color: SERIES_COLORS[i],
        point: toPoint(row, year),
      }))
      .sort((a, b) => (b.point?.value[2] ?? 0) - (a.point?.value[2] ?? 0));

    const option = {
      backgroundColor: "transparent",
      // 換年時讓泡泡平移過去，看得出移動方向
      animationDuration: 700,
      animationDurationUpdate: 700,
      animationEasingUpdate: "cubicInOut" as const,
      tooltip: {
        ...tooltipStyle,
        formatter: (params: { data: Point }) => tooltipFor(params.data),
      },
      // 圖例放底部：泡泡的直接標籤畫在符號上方，圖例若置頂會與之打架
      legend: {
        ...legendStyle,
        top: undefined,
        bottom: 0,
        data: ["其他同業", ...selected.map((r) => r.name)],
      },
      grid: { top: 34, left: 10, right: 24, bottom: 58, containLabel: true },
      xAxis: {
        ...axisStyle,
        name: "年營收成長率",
        nameLocation: "middle" as const,
        nameGap: 26,
        min: X_RANGE[0],
        max: X_RANGE[1],
        nameTextStyle: { color: chartInk.secondary, fontSize: 11 },
        axisLabel: { ...axisStyle.axisLabel, formatter: "{value}%" },
      },
      yAxis: {
        ...axisStyle,
        name: "毛利率",
        // 置於軸頂左上：垂直置中會被 containLabel 推出容器外而被裁掉
        nameLocation: "end" as const,
        nameGap: 12,
        min: Y_RANGE[0],
        max: Y_RANGE[1],
        nameTextStyle: {
          color: chartInk.secondary,
          fontSize: 11,
          align: "left" as const,
        },
        axisLabel: { ...axisStyle.axisLabel, formatter: "{value}%" },
      },
      series: [
        {
          name: "其他同業",
          type: "scatter" as const,
          data: background,
          symbolSize: (value: number[]) => value[2],
          itemStyle: {
            color: NEUTRAL_MARK,
            opacity: 0.55,
            borderColor: "#fff",
            borderWidth: 2,
          },
        },
        ...ordered.map(({ row, color, point }) => ({
          name: row.name,
          type: "scatter" as const,
          data: point && inRange(point) ? [point] : [],
          symbolSize: (value: number[]) => value[2],
          itemStyle: {
            color,
            opacity: 0.85,
            borderColor: "#fff",
            borderWidth: 2,
          },
          // aqua 對白底對比僅 2.82:1，直接標名是必要的輔助編碼
          label: {
            show: true,
            position: "top" as const,
            formatter: row.name,
            color: chartInk.primary,
            fontSize: 11,
            fontWeight: 500,
          },
        })),
      ],
    };

    return { option, hidden: hiddenCount };
  }, [universe, selected, year]);

  return (
    <div>
      <div style={{ height: 340 }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
      </div>
      {hidden > 0 && (
        <p className="text-[11px] text-gray-400 text-right pr-1">
          {hidden} 家因成長率或毛利率超出顯示範圍而未繪出
        </p>
      )}
    </div>
  );
}
