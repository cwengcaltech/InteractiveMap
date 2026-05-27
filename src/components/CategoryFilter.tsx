"use client";

import { useMemo } from "react";
import { categories } from "@/data/categories";
import { companies } from "@/data/companies";

interface CategoryFilterProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  const companyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of companies) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, []);

  const allSelected = selected.length === categories.length;

  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(categories.map((c) => c.id));
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {/* Select All button */}
      <button
        onClick={toggleAll}
        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
          allSelected
            ? "bg-[#6c8cff]/20 border-[#6c8cff]/50 text-[#6c8cff]"
            : "bg-[#232736] border-[#2e3347] text-gray-400 hover:border-gray-500 hover:text-gray-300"
        }`}
      >
        全部
      </button>

      {/* Category chips */}
      {categories.map((cat) => {
        const isActive = selected.includes(cat.id);
        const count = companyCounts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            onClick={() => toggleCategory(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              isActive
                ? "border-transparent text-white"
                : "bg-[#232736] border-[#2e3347] text-gray-500 hover:text-gray-300 hover:border-gray-500"
            }`}
            style={
              isActive
                ? {
                    backgroundColor: `${cat.color}25`,
                    borderColor: `${cat.color}60`,
                    color: cat.color,
                  }
                : undefined
            }
          >
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: isActive ? cat.color : "#555",
              }}
            />
            <span>{cat.name}</span>
            <span
              className={`text-[10px] ${
                isActive ? "opacity-70" : "text-gray-600"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
