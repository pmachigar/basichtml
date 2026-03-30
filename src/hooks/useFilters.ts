"use client";

import { useMemo, useState } from "react";
import type { Expense, ExpenseFilters, SortField, SortState } from "@/types";
import { isInDateRange } from "@/lib/date";

const DEFAULT_FILTERS: ExpenseFilters = {
  search: "",
  category: "All",
  dateFrom: "",
  dateTo: "",
};

const DEFAULT_SORT: SortState = {
  field: "date",
  direction: "desc",
};

export function useFilters(expenses: Expense[]) {
  const [filters, setFilters] = useState<ExpenseFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);

  const updateFilter = <K extends keyof ExpenseFilters>(
    key: K,
    value: ExpenseFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "All" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  const filtered = useMemo(() => {
    let result = [...expenses];

    // Text search (description, case-insensitive)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category !== "All") {
      result = result.filter((e) => e.category === filters.category);
    }

    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      result = result.filter((e) =>
        isInDateRange(e.date, filters.dateFrom, filters.dateTo)
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sort.field === "date") cmp = a.date.localeCompare(b.date);
      else if (sort.field === "amount") cmp = a.amount - b.amount;
      else if (sort.field === "category") cmp = a.category.localeCompare(b.category);
      else if (sort.field === "description") cmp = a.description.localeCompare(b.description);
      return sort.direction === "asc" ? cmp : -cmp;
    });

    return result;
  }, [expenses, filters, sort]);

  return {
    filters,
    sort,
    filtered,
    updateFilter,
    clearFilters,
    toggleSort,
    hasActiveFilters,
  };
}
