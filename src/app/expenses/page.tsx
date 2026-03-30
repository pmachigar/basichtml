"use client";

import React, { useState } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { useFilters } from "@/hooks/useFilters";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExpenseFiltersBar } from "@/components/expenses/ExpenseFilters";
import { ExpenseTable } from "@/components/expenses/ExpenseTable";
import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import { DeleteConfirmDialog } from "@/components/expenses/DeleteConfirmDialog";
import { EmptyState } from "@/components/expenses/EmptyState";
import { ExportButton } from "@/components/expenses/ExportButton";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import type { Expense } from "@/types";

export default function ExpensesPage() {
  const { expenses, deleteExpense, isLoading } = useExpenses();
  const {
    filters,
    sort,
    filtered,
    updateFilter,
    clearFilters,
    toggleSort,
    hasActiveFilters,
  } = useFilters(expenses);

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => setEditingExpense(expense);
  const handleDelete = (expense: Expense) => setDeletingExpense(expense);
  const handleConfirmDelete = () => {
    if (deletingExpense) deleteExpense(deletingExpense.id);
    setDeletingExpense(null);
  };

  return (
    <div>
      <PageHeader
        title="Expenses"
        subtitle={`${expenses.length} total expense${expenses.length !== 1 ? "s" : ""}`}
        actions={
          <>
            <ExportButton expenses={filtered} />
            <Button onClick={() => setIsAddModalOpen(true)}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Expense
            </Button>
          </>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <ExpenseFiltersBar
            filters={filters}
            onFilterChange={updateFilter}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <EmptyState
              hasFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              onAddExpense={() => setIsAddModalOpen(true)}
            />
          ) : (
            <ExpenseTable
              expenses={filtered}
              sort={sort}
              onToggleSort={toggleSort}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}

      {/* Add modal */}
      <ExpenseFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        expense={null}
      />

      {/* Edit modal */}
      <ExpenseFormModal
        isOpen={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        expense={editingExpense}
      />

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        isOpen={!!deletingExpense}
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleConfirmDelete}
        description={deletingExpense?.description ?? ""}
      />
    </div>
  );
}
