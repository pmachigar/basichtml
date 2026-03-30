import type { ExpenseFormData, ExpenseFormErrors } from "@/types";
import { parseCurrency } from "./currency";
import { todayString } from "./date";
import { CATEGORIES } from "./constants";

export function validateExpenseForm(data: ExpenseFormData): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};

  // Date
  if (!data.date) {
    errors.date = "Date is required.";
  } else if (data.date > todayString()) {
    errors.date = "Date cannot be in the future.";
  }

  // Amount
  if (!data.amount || data.amount.trim() === "") {
    errors.amount = "Amount is required.";
  } else {
    const cents = parseCurrency(data.amount);
    if (cents === null) {
      errors.amount = "Please enter a valid amount (e.g. 12.50).";
    } else if (cents <= 0) {
      errors.amount = "Amount must be greater than zero.";
    } else if (cents > 100_000_00) {
      errors.amount = "Amount cannot exceed $100,000.";
    }
  }

  // Category
  if (!data.category) {
    errors.category = "Please select a category.";
  } else if (!CATEGORIES.includes(data.category as never)) {
    errors.category = "Invalid category.";
  }

  // Description
  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required.";
  } else if (data.description.trim().length < 2) {
    errors.description = "Description must be at least 2 characters.";
  } else if (data.description.length > 200) {
    errors.description = "Description cannot exceed 200 characters.";
  }

  return errors;
}

export function hasErrors(errors: ExpenseFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
