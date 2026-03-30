import React from "react";

type TrendDirection = "up" | "down" | "neutral";

interface SummaryCardProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: TrendDirection;
  trendLabel?: string;
  icon: React.ReactNode;
  accentColor: string; // Tailwind bg class for icon bg
  iconColor: string;   // Tailwind text class for icon
}

export function SummaryCard({
  label,
  value,
  subtext,
  trend,
  trendLabel,
  icon,
  accentColor,
  iconColor,
}: SummaryCardProps) {
  const trendColors: Record<TrendDirection, string> = {
    up: "text-red-600",
    down: "text-emerald-600",
    neutral: "text-slate-500",
  };
  const trendIcons: Record<TrendDirection, React.ReactNode> = {
    up: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    ),
    down: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    ),
    neutral: null,
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${accentColor} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        {trend && trendLabel && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendColors[trend]}`}>
            {trendIcons[trend]}
            {trendLabel}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
