"use client";

import { useMemo, useState } from "react";
import type { CompareRow } from "@/lib/compare";
import { SERIES_COLORS, formatPercent, formatUsdBillions } from "@/lib/chartTheme";

type SortKey =
  | "name"
  | "marketCap"
  | "revenue"
  | "growth"
  | "grossMargin"
  | "operatingMargin"
  | "return3m"
  | "return1y"
  | "rsi"
  | "bullishScore";

interface Column {
  key: SortKey;
  label: string;
  align: "left" | "right";
  render: (row: CompareRow) => React.ReactNode;
  /** 數值型欄位以絕對值大小排序，文字型用字典序 */
  numeric: boolean;
}

const COLUMNS: Column[] = [
  {
    key: "name",
    label: "公司",
    align: "left",
    numeric: false,
    render: (r) => r.name,
  },
  {
    key: "marketCap",
    label: "市值",
    align: "right",
    numeric: true,
    render: (r) => formatUsdBillions(r.marketCap),
  },
  {
    key: "revenue",
    label: "年營收",
    align: "right",
    numeric: true,
    render: (r) => formatUsdBillions(r.revenue),
  },
  {
    key: "growth",
    label: "年增率",
    align: "right",
    numeric: true,
    render: (r) => <Signed value={r.growth} format={(v) => formatPercent(v)} />,
  },
  {
    key: "grossMargin",
    label: "毛利率",
    align: "right",
    numeric: true,
    render: (r) => formatPercent(r.grossMargin),
  },
  {
    key: "operatingMargin",
    label: "營益率",
    align: "right",
    numeric: true,
    render: (r) => formatPercent(r.operatingMargin),
  },
  {
    key: "return3m",
    label: "3月報酬",
    align: "right",
    numeric: true,
    render: (r) => (
      <Signed value={r.return3m} format={(v) => `${v.toFixed(1)}%`} />
    ),
  },
  {
    key: "return1y",
    label: "1年報酬",
    align: "right",
    numeric: true,
    render: (r) => (
      <Signed value={r.return1y} format={(v) => `${v.toFixed(1)}%`} />
    ),
  },
  {
    key: "rsi",
    label: "RSI",
    align: "right",
    numeric: true,
    render: (r) => (r.rsi === null ? "—" : r.rsi.toFixed(0)),
  },
  {
    key: "bullishScore",
    label: "多頭分數",
    align: "right",
    numeric: true,
    render: (r) => (r.bullishScore === null ? "—" : r.bullishScore),
  },
];

function Signed({
  value,
  format,
}: {
  value: number | null;
  format: (v: number) => string;
}) {
  if (value === null || Number.isNaN(value)) return <>—</>;
  const color = value > 0 ? "#16a34a" : value < 0 ? "#dc2626" : "#6b7280";
  return (
    <span style={{ color }}>
      {value > 0 ? "+" : ""}
      {format(value)}
    </span>
  );
}

interface Props {
  rows: CompareRow[];
  /** 在圖表中被上色的公司，這裡以同色圓點標示，讓表與圖能對得起來 */
  highlighted: string[];
  onToggle: (id: string) => void;
}

export default function CompareTable({ rows, highlighted, onToggle }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const column = COLUMNS.find((c) => c.key === sortKey)!;
    return [...rows].sort((a, b) => {
      if (!column.numeric) {
        return asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      const av = a[sortKey] as number | null;
      const bv = b[sortKey] as number | null;
      // 缺值一律沉底，不論升冪或降冪
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return asc ? av - bv : bv - av;
    });
  }, [rows, sortKey, asc]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(key === "name");
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-3 py-2.5 font-medium text-gray-600 whitespace-nowrap ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                <button
                  onClick={() => handleSort(col.key)}
                  className="inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  {col.label}
                  <span className="text-[10px] text-gray-400">
                    {sortKey === col.key ? (asc ? "▲" : "▼") : "⇅"}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const rank = highlighted.indexOf(row.id);
            return (
              <tr
                key={row.id}
                onClick={() => onToggle(row.id)}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-2.5 whitespace-nowrap ${
                      col.align === "right"
                        ? "text-right tabular-nums text-gray-700"
                        : "text-left"
                    }`}
                  >
                    {col.key === "name" ? (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              rank >= 0 ? SERIES_COLORS[rank] : "#e5e7eb",
                          }}
                        />
                        <span className="font-medium text-gray-900">
                          {row.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {row.ticker}
                        </span>
                      </span>
                    ) : (
                      col.render(row)
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <p className="px-3 py-8 text-center text-sm text-gray-500">
          沒有符合條件的公司
        </p>
      )}
    </div>
  );
}
