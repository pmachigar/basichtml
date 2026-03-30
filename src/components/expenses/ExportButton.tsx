"use client";

import React, { useState } from "react";
import type { Expense } from "@/types";
import { generateCSV, downloadCSV } from "@/lib/csv";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";

interface ExportButtonProps {
  expenses: Expense[];
}

export function ExportButton({ expenses }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (expenses.length === 0) return;
    setLoading(true);
    try {
      const csv = generateCSV(expenses);
      const filename = `expenses-${format(new Date(), "yyyy-MM-dd")}.csv`;
      downloadCSV(filename, csv);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={handleExport}
      loading={loading}
      disabled={expenses.length === 0}
      title={expenses.length === 0 ? "No expenses to export" : `Export ${expenses.length} expenses to CSV`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export CSV
    </Button>
  );
}
