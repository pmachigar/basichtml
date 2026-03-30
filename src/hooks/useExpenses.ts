"use client";

import { useCallback } from "react";
import type { Expense, ExpenseFormData, Category } from "@/types";
import { parseCurrency } from "@/lib/currency";
import { STORAGE_KEY } from "@/lib/constants";
import { useLocalStorage } from "./useLocalStorage";
import { useToast } from "@/components/ui/ToastProvider";

interface StoredData {
  version: number;
  expenses: Expense[];
}

const INITIAL_DATA: StoredData = { version: 1, expenses: [] };

export function useExpenses() {
  const [data, setData, isLoaded] = useLocalStorage<StoredData>(
    STORAGE_KEY,
    INITIAL_DATA
  );
  const { showToast } = useToast();

  const expenses = data.expenses ?? [];

  const addExpense = useCallback(
    (formData: ExpenseFormData) => {
      const cents = parseCurrency(formData.amount);
      if (cents === null) return;

      const now = new Date().toISOString();
      const newExpense: Expense = {
        id: crypto.randomUUID(),
        date: formData.date,
        amount: cents,
        category: formData.category as Category,
        description: formData.description.trim(),
        createdAt: now,
        updatedAt: now,
      };

      setData((prev) => ({
        ...prev,
        expenses: [newExpense, ...(prev.expenses ?? [])],
      }));
      showToast("Expense added successfully.", "success");
    },
    [setData, showToast]
  );

  const updateExpense = useCallback(
    (id: string, formData: ExpenseFormData) => {
      const cents = parseCurrency(formData.amount);
      if (cents === null) return;

      setData((prev) => ({
        ...prev,
        expenses: (prev.expenses ?? []).map((e) =>
          e.id === id
            ? {
                ...e,
                date: formData.date,
                amount: cents,
                category: formData.category as Category,
                description: formData.description.trim(),
                updatedAt: new Date().toISOString(),
              }
            : e
        ),
      }));
      showToast("Expense updated.", "success");
    },
    [setData, showToast]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        expenses: (prev.expenses ?? []).filter((e) => e.id !== id),
      }));
      showToast("Expense deleted.", "info");
    },
    [setData, showToast]
  );

  return { expenses, addExpense, updateExpense, deleteExpense, isLoading: !isLoaded };
}
