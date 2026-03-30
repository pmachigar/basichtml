"use client";

import React, { useState, useEffect } from "react";
import type { Expense, ExpenseFormData, ExpenseFormErrors } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { todayString } from "@/lib/date";
import { validateExpenseForm, hasErrors } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";

const EMPTY_FORM: ExpenseFormData = {
  date: todayString(),
  amount: "",
  category: "",
  description: "",
};

function expenseToForm(expense: Expense): ExpenseFormData {
  return {
    date: expense.date,
    amount: (expense.amount / 100).toFixed(2),
    category: expense.category,
    description: expense.description,
  };
}

interface ExpenseFormProps {
  expense: Expense | null; // null = add mode, non-null = edit mode
  onSubmit: (data: ExpenseFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ExpenseForm({
  expense,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(
    expense ? expenseToForm(expense) : { ...EMPTY_FORM, date: todayString() }
  );
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ExpenseFormData, boolean>>>({});

  // Reset when expense prop changes (switching between add/edit)
  useEffect(() => {
    if (expense) {
      setFormData(expenseToForm(expense));
    } else {
      setFormData({ ...EMPTY_FORM, date: todayString() });
    }
    setErrors({});
    setTouched({});
  }, [expense]);

  const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c }));

  const update = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change if field was touched
    if (touched[field]) {
      const newData = { ...formData, [field]: value };
      const newErrors = validateExpenseForm(newData);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const blur = (field: keyof ExpenseFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateExpenseForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateExpenseForm(formData);
    setErrors(allErrors);
    setTouched({ date: true, amount: true, category: true, description: true });
    if (!hasErrors(allErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          label="Date"
          required
          value={formData.date}
          onChange={(e) => update("date", e.target.value)}
          onBlur={() => blur("date")}
          error={touched.date ? errors.date : undefined}
        />
        <Input
          label="Amount"
          required
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => update("amount", e.target.value)}
          onBlur={() => blur("amount")}
          error={touched.amount ? errors.amount : undefined}
          hint="Enter amount in dollars (e.g. 12.50)"
        />
      </div>

      <Select
        label="Category"
        required
        value={formData.category}
        onChange={(e) => update("category", e.target.value)}
        onBlur={() => blur("category")}
        options={categoryOptions}
        placeholder="Select a category"
        error={touched.category ? errors.category : undefined}
      />

      <Input
        label="Description"
        required
        type="text"
        placeholder="What was this expense for?"
        value={formData.description}
        onChange={(e) => update("description", e.target.value)}
        onBlur={() => blur("description")}
        error={touched.description ? errors.description : undefined}
        maxLength={200}
      />

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {expense ? "Save Changes" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
}
