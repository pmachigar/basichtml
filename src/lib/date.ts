import { format, parseISO, startOfMonth, endOfMonth, subMonths, isWithinInterval } from "date-fns";

/** Today as "YYYY-MM-DD" */
export function todayString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

/** "YYYY-MM-DD" → "Mar 26, 2026" */
export function formatDisplayDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy");
  } catch {
    return dateStr;
  }
}

/** "YYYY-MM" → "Mar 2026" */
export function formatMonthLabel(yearMonth: string): string {
  try {
    return format(parseISO(`${yearMonth}-01`), "MMM yyyy");
  } catch {
    return yearMonth;
  }
}

/** Get "YYYY-MM" string for current month */
export function currentMonth(): string {
  return format(new Date(), "yyyy-MM");
}

/** Get "YYYY-MM" string for last month */
export function lastMonth(): string {
  return format(subMonths(new Date(), 1), "yyyy-MM");
}

/** Get the last N months as "YYYY-MM" strings, oldest first */
export function lastNMonths(n: number): string[] {
  const months: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    months.push(format(subMonths(new Date(), i), "yyyy-MM"));
  }
  return months;
}

/** Check if a "YYYY-MM-DD" date string falls in a given "YYYY-MM" month */
export function isInMonth(dateStr: string, yearMonth: string): boolean {
  try {
    const date = parseISO(dateStr);
    const monthStart = startOfMonth(parseISO(`${yearMonth}-01`));
    const monthEnd = endOfMonth(parseISO(`${yearMonth}-01`));
    return isWithinInterval(date, { start: monthStart, end: monthEnd });
  } catch {
    return false;
  }
}

/** Check if a "YYYY-MM-DD" date is within a range (inclusive, empty string = no bound) */
export function isInDateRange(dateStr: string, from: string, to: string): boolean {
  try {
    const date = parseISO(dateStr);
    if (from && date < parseISO(from)) return false;
    if (to && date > parseISO(to)) return false;
    return true;
  } catch {
    return false;
  }
}
