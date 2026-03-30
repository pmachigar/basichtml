export type Category =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Expense {
  id: string;
  date: string; // "YYYY-MM-DD"
  amount: number; // integer cents, e.g. 1050 = $10.50
  category: Category;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  date: string;
  amount: string; // raw string input, validated before conversion
  category: Category | "";
  description: string;
}

export interface ExpenseFormErrors {
  date?: string;
  amount?: string;
  category?: string;
  description?: string;
}

export interface ExpenseFilters {
  search: string;
  category: Category | "All";
  dateFrom: string; // "YYYY-MM-DD" or ""
  dateTo: string; // "YYYY-MM-DD" or ""
}

export type SortField = "date" | "amount" | "category" | "description";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface CategoryTotal {
  category: Category;
  total: number; // cents
  percentage: number; // 0-100
  count: number;
}

export interface MonthlyTotal {
  month: string; // "YYYY-MM"
  label: string; // "Mar 2026"
  total: number; // cents
}

export interface DashboardStats {
  totalAllTime: number; // cents
  totalThisMonth: number; // cents
  totalLastMonth: number; // cents
  monthOverMonthChange: number; // percentage, can be negative
  expenseCount: number;
  avgPerExpense: number; // cents
  categoryTotals: CategoryTotal[];
  monthlyTotals: MonthlyTotal[]; // last 6 months
}

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

export interface StorageSchema {
  version: number;
  expenses: Expense[];
}
