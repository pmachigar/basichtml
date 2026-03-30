import type { Category } from "@/types";

export const STORAGE_KEY = "expense-tracker-v1";
export const STORAGE_VERSION = 1;

export const CATEGORIES: Category[] = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

export const CATEGORY_COLORS: Record<
  Category,
  { bg: string; text: string; dot: string; chart: string }
> = {
  Food: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    dot: "bg-orange-400",
    chart: "#fb923c",
  },
  Transportation: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-400",
    chart: "#60a5fa",
  },
  Entertainment: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    dot: "bg-purple-400",
    chart: "#c084fc",
  },
  Shopping: {
    bg: "bg-pink-100",
    text: "text-pink-800",
    dot: "bg-pink-400",
    chart: "#f472b6",
  },
  Bills: {
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-400",
    chart: "#f87171",
  },
  Other: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-400",
    chart: "#94a3b8",
  },
};

export const ITEMS_PER_PAGE = 10;
