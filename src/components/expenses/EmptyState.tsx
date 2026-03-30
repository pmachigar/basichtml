import React from "react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  hasFilters?: boolean;
  onClearFilters?: () => void;
  onAddExpense?: () => void;
}

export function EmptyState({ hasFilters, onClearFilters, onAddExpense }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        {hasFilters ? (
          <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">
        {hasFilters ? "No matching expenses" : "No expenses yet"}
      </h3>
      <p className="text-sm text-slate-500 max-w-xs mb-5">
        {hasFilters
          ? "Try adjusting your filters to find what you're looking for."
          : "Start tracking your spending by adding your first expense."}
      </p>
      {hasFilters ? (
        <Button variant="secondary" onClick={onClearFilters}>
          Clear Filters
        </Button>
      ) : (
        <Button onClick={onAddExpense}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Expense
        </Button>
      )}
    </div>
  );
}
