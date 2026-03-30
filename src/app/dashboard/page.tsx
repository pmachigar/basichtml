"use client";

import React from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { PageHeader } from "@/components/layout/PageHeader";
import { SummaryCardGrid } from "@/components/dashboard/SummaryCardGrid";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { Spinner } from "@/components/ui/Spinner";
import { formatMonthLabel, currentMonth } from "@/lib/date";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-slate-200 mb-3" />
      <div className="h-7 bg-slate-200 rounded w-28 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-36" />
    </div>
  );
}

export default function DashboardPage() {
  const { expenses, isLoading } = useExpenses();
  const stats = useDashboardStats(expenses);

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          subtitle={`Overview for ${formatMonthLabel(currentMonth())}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="flex items-center justify-center h-40">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Overview for ${formatMonthLabel(currentMonth())}`}
      />

      <SummaryCardGrid stats={stats} />

      {/* Chart — full width */}
      <div className="mb-6">
        <SpendingChart monthlyTotals={stats.monthlyTotals} />
      </div>

      {/* Two-column below chart on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryBreakdown categoryTotals={stats.categoryTotals} />
        <RecentExpenses expenses={expenses} />
      </div>
    </div>
  );
}
