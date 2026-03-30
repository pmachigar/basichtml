"use client";

import React, { useEffect, useState } from "react";
import type { ExpenseFilters } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFilterChange: <K extends keyof ExpenseFilters>(key: K, value: ExpenseFilters[K]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

const categoryOptions = [
  { value: "All", label: "All Categories" },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
];

export function ExpenseFiltersBar({
  filters,
  onFilterChange,
  onClear,
  hasActiveFilters,
  resultCount,
}: ExpenseFiltersProps) {
  // Debounced search
  const [searchInput, setSearchInput] = useState(filters.search);
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange("search", searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync if externally cleared
  useEffect(() => {
    if (filters.search === "") setSearchInput("");
  }, [filters.search]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-400"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="w-full sm:w-40">
            <Select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value as ExpenseFilters["category"])}
              options={categoryOptions}
            />
          </div>
          <div className="w-full sm:w-36">
            <DatePicker
              placeholder="From"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange("dateFrom", e.target.value)}
              maxDate={filters.dateTo || undefined}
            />
          </div>
          <div className="w-full sm:w-36">
            <DatePicker
              placeholder="To"
              value={filters.dateTo}
              onChange={(e) => onFilterChange("dateTo", e.target.value)}
            />
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
          <span className="ml-auto text-xs text-slate-500 self-center">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}
