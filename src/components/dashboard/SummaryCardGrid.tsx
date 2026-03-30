import React from "react";
import type { DashboardStats } from "@/types";
import { formatCurrency } from "@/lib/currency";
import { formatMonthLabel, currentMonth } from "@/lib/date";
import { SummaryCard } from "./SummaryCard";

interface SummaryCardGridProps {
  stats: DashboardStats;
}

export function SummaryCardGrid({ stats }: SummaryCardGridProps) {
  const momChange = stats.monthOverMonthChange;
  const momLabel = `${Math.abs(momChange).toFixed(1)}% vs last month`;
  const trend =
    momChange > 5 ? "up" : momChange < -5 ? "down" : "neutral";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        label={`Spending in ${formatMonthLabel(currentMonth())}`}
        value={formatCurrency(stats.totalThisMonth)}
        trend={stats.totalLastMonth > 0 ? trend : undefined}
        trendLabel={stats.totalLastMonth > 0 ? momLabel : undefined}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        accentColor="bg-primary-50"
        iconColor="text-primary-600"
      />
      <SummaryCard
        label="Total All Time"
        value={formatCurrency(stats.totalAllTime)}
        subtext={`Across ${stats.expenseCount} expenses`}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        accentColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <SummaryCard
        label="Total Expenses"
        value={stats.expenseCount.toString()}
        subtext="All recorded expenses"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
        accentColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <SummaryCard
        label="Average per Expense"
        value={stats.expenseCount > 0 ? formatCurrency(stats.avgPerExpense) : "—"}
        subtext="Overall average"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        accentColor="bg-orange-50"
        iconColor="text-orange-600"
      />
    </div>
  );
}
