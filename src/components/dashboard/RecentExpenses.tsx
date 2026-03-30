import React from "react";
import Link from "next/link";
import type { Expense } from "@/types";
import { formatCurrency } from "@/lib/currency";
import { formatDisplayDate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const recent = expenses
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900">Recent Expenses</h3>
        <Link
          href="/expenses"
          className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          View all →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-8">No expenses yet.</p>
      ) : (
        <div className="space-y-3">
          {recent.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-3 py-1.5"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {expense.description}
                </p>
                <p className="text-xs text-slate-400">{formatDisplayDate(expense.date)}</p>
              </div>
              <Badge category={expense.category} />
              <span className="text-sm font-semibold text-slate-900 shrink-0">
                {formatCurrency(expense.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
