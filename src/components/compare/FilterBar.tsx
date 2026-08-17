"use client";

import { categories } from "@/data/categories";

export interface Filters {
  countries: string[];
  categories: string[];
  /** 年增率下限（百分比），null 表示不限 */
  minGrowth: number | null;
  /** 市值下限（十億美元），null 表示不限 */
  minMarketCap: number | null;
}

export const EMPTY_FILTERS: Filters = {
  countries: [],
  categories: [],
  minGrowth: null,
  minMarketCap: null,
};

const GROWTH_STEPS = [
  { label: "不限", value: null },
  { label: "> 0%", value: 0 },
  { label: "> 20%", value: 20 },
  { label: "> 50%", value: 50 },
];

const CAP_STEPS = [
  { label: "不限", value: null },
  { label: "> 100 億", value: 10 },
  { label: "> 1000 億", value: 100 },
  { label: "> 1 兆", value: 1000 },
];

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  /** 資料中實際存在的國家，避免列出空選項 */
  availableCountries: string[];
  countryFlag: (code: string) => string;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function FilterBar({
  filters,
  onChange,
  availableCountries,
  countryFlag,
}: Props) {
  const active =
    filters.countries.length > 0 ||
    filters.categories.length > 0 ||
    filters.minGrowth !== null ||
    filters.minMarketCap !== null;

  return (
    <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">篩選</h3>
        {active && (
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            清除全部
          </button>
        )}
      </div>

      <Row label="地區">
        {availableCountries.map((code) => (
          <Chip
            key={code}
            active={filters.countries.includes(code)}
            onClick={() =>
              onChange({ ...filters, countries: toggle(filters.countries, code) })
            }
          >
            {countryFlag(code)} {code}
          </Chip>
        ))}
      </Row>

      <Row label="產業">
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            active={filters.categories.includes(cat.id)}
            color={cat.color}
            onClick={() =>
              onChange({
                ...filters,
                categories: toggle(filters.categories, cat.id),
              })
            }
          >
            {cat.icon} {cat.name}
          </Chip>
        ))}
      </Row>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Row label="年增率">
          {GROWTH_STEPS.map((step) => (
            <Chip
              key={step.label}
              active={filters.minGrowth === step.value}
              onClick={() => onChange({ ...filters, minGrowth: step.value })}
            >
              {step.label}
            </Chip>
          ))}
        </Row>
        <Row label="市值">
          {CAP_STEPS.map((step) => (
            <Chip
              key={step.label}
              active={filters.minMarketCap === step.value}
              onClick={() => onChange({ ...filters, minMarketCap: step.value })}
            >
              {step.label}
            </Chip>
          ))}
        </Row>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-lg text-xs border transition-colors ${
        active
          ? "border-transparent text-white"
          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
      }`}
      style={active ? { backgroundColor: color ?? "#4f6df5" } : undefined}
    >
      {children}
    </button>
  );
}
