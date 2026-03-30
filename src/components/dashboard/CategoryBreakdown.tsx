import React from "react";
import type { CategoryTotal } from "@/types";
import { CATEGORY_COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/currency";

interface CategoryBreakdownProps {
  categoryTotals: CategoryTotal[];
}

export function CategoryBreakdown({ categoryTotals }: CategoryBreakdownProps) {
  if (categoryTotals.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Spending by Category</h3>
        <p className="text-sm text-slate-400 text-center py-8">No data yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-900 mb-4">Spending by Category</h3>
      <div className="space-y-3.5">
        {categoryTotals.map((ct) => {
          const colors = CATEGORY_COLORS[ct.category];
          return (
            <div key={ct.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                  <span className="text-sm font-medium text-slate-700">{ct.category}</span>
                  <span className="text-xs text-slate-400">({ct.count})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {formatCurrency(ct.total)}
                  </span>
                  <span className="text-xs text-slate-400 w-10 text-right">
                    {ct.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colors.dot}`}
                  style={{ width: `${Math.max(ct.percentage, 1)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
