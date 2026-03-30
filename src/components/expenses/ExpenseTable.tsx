"use client";

import React, { useState } from "react";
import type { Expense, SortField, SortState } from "@/types";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { ExpenseRow } from "./ExpenseRow";
import { Button } from "@/components/ui/Button";

interface ExpenseTableProps {
  expenses: Expense[];
  sort: SortState;
  onToggleSort: (field: SortField) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const columns: { label: string; field: SortField | null; align?: string }[] = [
  { label: "Date", field: "date" },
  { label: "Category", field: "category" },
  { label: "Description", field: "description" },
  { label: "Amount", field: "amount", align: "text-right" },
  { label: "", field: null, align: "text-right" },
];

function SortIcon({ field, sort }: { field: SortField; sort: SortState }) {
  if (sort.field !== field)
    return (
      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  return sort.direction === "asc" ? (
    <svg className="w-3.5 h-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ExpenseTable({
  expenses,
  sort,
  onToggleSort,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));
  const pageExpenses = expenses.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset to page 1 when expenses change significantly
  React.useEffect(() => {
    setPage(1);
  }, [expenses.length]);

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${col.align ?? ""}`}
                >
                  {col.field ? (
                    <button
                      onClick={() => onToggleSort(col.field!)}
                      className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                    >
                      {col.label}
                      <SortIcon field={col.field} sort={sort} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageExpenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {pageExpenses.map((expense) => (
          <ExpenseRow
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, expenses.length)} of {expenses.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </Button>
            <span className="text-sm text-slate-700 font-medium">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
