"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { companies } from "@/data/companies";
import { categories } from "@/data/categories";

interface SearchBarProps {
  onSelect: (companyId: string) => void;
}

const categoryColorMap = Object.fromEntries(
  categories.map((c) => [c.id, c.color])
);

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return companies
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.name_en.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (companyId: string) => {
    onSelect(companyId);
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightIndex].id);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        {/* Search icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          placeholder="搜尋公司名稱、代號..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#232736] border border-[#2e3347] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6c8cff]/50 focus:ring-1 focus:ring-[#6c8cff]/30 transition-colors"
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-[#1a1d27] border border-[#2e3347] shadow-xl overflow-hidden z-50"
        >
          {results.map((company, index) => (
            <button
              key={company.id}
              onClick={() => handleSelect(company.id)}
              onMouseEnter={() => setHighlightIndex(index)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                index === highlightIndex
                  ? "bg-[#232736]"
                  : "hover:bg-[#232736]/60"
              }`}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    categoryColorMap[company.category] || "#6c8cff",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium truncate">
                    {company.name_en}
                  </span>
                  <span className="text-xs text-gray-500 shrink-0">
                    {company.ticker}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {company.name}
                </p>
              </div>
              <span className="text-[10px] text-gray-600 shrink-0">
                {company.country}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-[#1a1d27] border border-[#2e3347] shadow-xl p-4 text-center z-50"
        >
          <p className="text-sm text-gray-500">找不到符合的公司</p>
        </div>
      )}
    </div>
  );
}
