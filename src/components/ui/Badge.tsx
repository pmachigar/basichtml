import React from "react";
import type { Category } from "@/types";
import { CATEGORY_COLORS } from "@/lib/constants";

interface BadgeProps {
  category: Category;
  className?: string;
}

export function Badge({ category, className = "" }: BadgeProps) {
  const colors = CATEGORY_COLORS[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {category}
    </span>
  );
}
