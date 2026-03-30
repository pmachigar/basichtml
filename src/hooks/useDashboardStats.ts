"use client";

import { useMemo } from "react";
import type { Expense, DashboardStats, CategoryTotal, MonthlyTotal } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { currentMonth, lastMonth, lastNMonths, isInMonth, formatMonthLabel } from "@/lib/date";

export function useDashboardStats(expenses: Expense[]): DashboardStats {
  return useMemo(() => {
    const thisMonth = currentMonth();
    const prevMonth = lastMonth();

    const totalAllTime = expenses.reduce((sum, e) => sum + e.amount, 0);

    const thisMonthExpenses = expenses.filter((e) => isInMonth(e.date, thisMonth));
    const lastMonthExpenses = expenses.filter((e) => isInMonth(e.date, prevMonth));

    const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalLastMonth = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const monthOverMonthChange =
      totalLastMonth === 0
        ? totalThisMonth > 0
          ? 100
          : 0
        : ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;

    const expenseCount = expenses.length;
    const avgPerExpense = expenseCount > 0 ? Math.round(totalAllTime / expenseCount) : 0;

    // Category totals
    const categoryMap = new Map<string, { total: number; count: number }>();
    for (const e of expenses) {
      const existing = categoryMap.get(e.category) ?? { total: 0, count: 0 };
      categoryMap.set(e.category, {
        total: existing.total + e.amount,
        count: existing.count + 1,
      });
    }

    const categoryTotals: CategoryTotal[] = CATEGORIES.map((cat) => {
      const data = categoryMap.get(cat) ?? { total: 0, count: 0 };
      return {
        category: cat,
        total: data.total,
        count: data.count,
        percentage: totalAllTime > 0 ? (data.total / totalAllTime) * 100 : 0,
      };
    })
      .filter((ct) => ct.total > 0)
      .sort((a, b) => b.total - a.total);

    // Monthly totals (last 6 months)
    const months = lastNMonths(6);
    const monthlyTotals: MonthlyTotal[] = months.map((month) => ({
      month,
      label: formatMonthLabel(month),
      total: expenses
        .filter((e) => isInMonth(e.date, month))
        .reduce((sum, e) => sum + e.amount, 0),
    }));

    return {
      totalAllTime,
      totalThisMonth,
      totalLastMonth,
      monthOverMonthChange,
      expenseCount,
      avgPerExpense,
      categoryTotals,
      monthlyTotals,
    };
  }, [expenses]);
}
