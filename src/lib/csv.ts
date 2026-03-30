import type { Expense } from "@/types";
import { formatCurrency } from "./currency";
import { formatDisplayDate } from "./date";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateCSV(expenses: Expense[]): string {
  const headers = ["Date", "Amount", "Category", "Description", "Added On"];
  const rows = expenses.map((e) => [
    formatDisplayDate(e.date),
    formatCurrency(e.amount),
    e.category,
    e.description,
    formatDisplayDate(e.createdAt.split("T")[0]),
  ]);

  const lines = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(",")),
  ];

  return lines.join("\n");
}

export function downloadCSV(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
