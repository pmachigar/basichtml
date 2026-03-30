"use client";

import React, { useState } from "react";
import type { Expense, ExpenseFormData } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { ExpenseForm } from "./ExpenseForm";
import { useExpenses } from "@/hooks/useExpenses";

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export function ExpenseFormModal({
  isOpen,
  onClose,
  expense,
}: ExpenseFormModalProps) {
  const { addExpense, updateExpense } = useExpenses();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      if (expense) {
        updateExpense(expense.id, data);
      } else {
        addExpense(data);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expense ? "Edit Expense" : "Add Expense"}
    >
      <ExpenseForm
        expense={expense}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
