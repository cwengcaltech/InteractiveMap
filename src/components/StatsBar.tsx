"use client";

import { useMemo } from "react";
import { companies } from "@/data/companies";
import { categories } from "@/data/categories";

export default function StatsBar() {
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const totalCategories = categories.length;

    // Calculate average growth rate from latest year
    let totalGrowth = 0;
    let growthCount = 0;
    let totalRevenueUSD = 0;

    for (const c of companies) {
      const annual = c.financials.annual;
      if (annual.length === 0) continue;
      const latest = annual[annual.length - 1];
      totalGrowth += latest.growth_rate;
      growthCount++;

      // Normalize to USD for total
      if (c.financials.currency === "TWD") {
        totalRevenueUSD += latest.revenue / 32;
      } else {
        totalRevenueUSD += latest.revenue;
      }
    }

    const avgGrowth = growthCount > 0 ? totalGrowth / growthCount : 0;

    // Count unique countries
    const countries = new Set(companies.map((c) => c.country));

    return {
      totalCompanies,
      totalCategories,
      avgGrowth,
      totalRevenueUSD,
      countryCount: countries.size,
    };
  }, []);

  return (
    <div className="flex items-center gap-4 text-xs">
      <StatItem
        label="公司數"
        value={`${stats.totalCompanies}`}
      />
      <Divider />
      <StatItem
        label="產業類別"
        value={`${stats.totalCategories}`}
      />
      <Divider />
      <StatItem
        label="涵蓋國家"
        value={`${stats.countryCount}`}
      />
      <Divider />
      <StatItem
        label="平均成長率"
        value={`${(stats.avgGrowth * 100).toFixed(1)}%`}
        color={stats.avgGrowth >= 0 ? "#4ecdc4" : "#e74c3c"}
      />
      <Divider />
      <StatItem
        label="總營收覆蓋"
        value={`$${(stats.totalRevenueUSD / 1000).toFixed(1)}T`}
      />
    </div>
  );
}

function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gray-500">{label}</span>
      <span
        className="font-semibold"
        style={{ color: color || "#e4e6ef" }}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <span className="text-[#2e3347]">|</span>;
}
