import type { Expense, StorageSchema } from "@/types";
import { STORAGE_KEY, STORAGE_VERSION } from "./constants";

const DEFAULT_SCHEMA: StorageSchema = {
  version: STORAGE_VERSION,
  expenses: [],
};

function migrate(schema: StorageSchema): StorageSchema {
  // Future migrations: check schema.version and upgrade accordingly
  return { ...schema, version: STORAGE_VERSION };
}

export function readStorage(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StorageSchema;
    const migrated = migrate(parsed);
    return migrated.expenses ?? [];
  } catch {
    return [];
  }
}

export function writeStorage(expenses: Expense[]): void {
  if (typeof window === "undefined") return;
  try {
    const schema: StorageSchema = {
      version: STORAGE_VERSION,
      expenses,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch {
    // localStorage quota exceeded or unavailable — silently fail
    console.warn("Failed to save to localStorage.");
  }
}

export function clearStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export { DEFAULT_SCHEMA };
