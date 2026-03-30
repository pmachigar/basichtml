import React from "react";
import type { MonthlyTotal } from "@/types";
import { formatCurrencyCompact } from "@/lib/currency";

interface SpendingChartProps {
  monthlyTotals: MonthlyTotal[];
}

const CHART_W = 500;
const CHART_H = 160;
const PAD_TOP = 16;
const PAD_BOTTOM = 32;
const PAD_LEFT = 52;
const PAD_RIGHT = 16;

export function SpendingChart({ monthlyTotals }: SpendingChartProps) {
  const hasData = monthlyTotals.some((m) => m.total > 0);

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-1">6-Month Spending</h3>
        <p className="text-xs text-slate-400 mb-4">Monthly expense totals</p>
        <div className="flex items-center justify-center h-40 text-sm text-slate-400">
          Add expenses to see your spending trend.
        </div>
      </div>
    );
  }

  const maxVal = Math.max(...monthlyTotals.map((m) => m.total), 1);
  const plotW = CHART_W - PAD_LEFT - PAD_RIGHT;
  const plotH = CHART_H - PAD_TOP - PAD_BOTTOM;

  const points = monthlyTotals.map((m, i) => {
    const x = PAD_LEFT + (i / (monthlyTotals.length - 1)) * plotW;
    const y = PAD_TOP + plotH - (m.total / maxVal) * plotH;
    return { x, y, ...m };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area =
    `M ${points[0].x},${PAD_TOP + plotH} ` +
    points.map((p) => `L ${p.x},${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x},${PAD_TOP + plotH} Z`;

  // Y-axis grid lines (3 lines)
  const gridLines = [0.25, 0.5, 0.75, 1].map((frac) => ({
    y: PAD_TOP + plotH * (1 - frac),
    label: formatCurrencyCompact(maxVal * frac),
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-900 mb-0.5">6-Month Spending</h3>
      <p className="text-xs text-slate-400 mb-3">Monthly expense totals</p>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          style={{ minWidth: 280 }}
          aria-label="6-month spending chart"
        >
          {/* Grid lines */}
          {gridLines.map((gl) => (
            <g key={gl.y}>
              <line
                x1={PAD_LEFT}
                y1={gl.y}
                x2={CHART_W - PAD_RIGHT}
                y2={gl.y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={PAD_LEFT - 6}
                y={gl.y + 4}
                textAnchor="end"
                fontSize="9"
                fill="#94a3b8"
              >
                {gl.label}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#areaGradient)" />

          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points + tooltips */}
          {points.map((p) => (
            <g key={p.month}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="white"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
              {/* X-axis label */}
              <text
                x={p.x}
                y={CHART_H - 6}
                textAnchor="middle"
                fontSize="9.5"
                fill="#94a3b8"
              >
                {p.label.split(" ")[0]}
              </text>
              {/* Value on hover via title */}
              <title>{`${p.label}: ${formatCurrencyCompact(p.total)}`}</title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
