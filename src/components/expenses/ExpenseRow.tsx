"use client";

import React from "react";
import type { Expense } from "@/types";
import { formatCurrency } from "@/lib/currency";
import { formatDisplayDate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  return (
    <>
      {/* Desktop row */}
      <tr className="hidden md:table-row group hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
        <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
          {formatDisplayDate(expense.date)}
        </td>
        <td className="px-4 py-3">
          <Badge category={expense.category} />
        </td>
        <td className="px-4 py-3 text-sm text-slate-900 max-w-xs truncate">
          {expense.description}
        </td>
        <td className="px-4 py-3 text-sm font-semibold text-slate-900 text-right whitespace-nowrap">
          {formatCurrency(expense.amount)}
        </td>
        <td className="px-4 py-3 text-right whitespace-nowrap">
          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(expense)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label={`Edit ${expense.description}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(expense)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label={`Delete ${expense.description}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile card */}
      <div className="md:hidden bg-white rounded-xl border border-slate-200 p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{expense.description}</p>
            <p className="text-xs text-slate-500 mt-0.5">{formatDisplayDate(expense.date)}</p>
          </div>
          <span className="text-base font-bold text-slate-900 shrink-0">
            {formatCurrency(expense.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Badge category={expense.category} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(expense)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(expense)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Delete"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
