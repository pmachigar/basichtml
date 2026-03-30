const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format integer cents to "$10.50" */
export function formatCurrency(cents: number): string {
  return formatter.format(cents / 100);
}

/** Parse a user-entered dollar string to integer cents.
 *  Returns null if invalid. */
export function parseCurrency(value: string): number | null {
  const cleaned = value.replace(/[$,\s]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num) || num < 0) return null;
  return Math.round(num * 100);
}

/** Format cents as compact string, e.g. "$1.2k" for large values */
export function formatCurrencyCompact(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) {
    return `$${(dollars / 1_000_000).toFixed(1)}M`;
  }
  if (dollars >= 1_000) {
    return `$${(dollars / 1_000).toFixed(1)}k`;
  }
  return formatter.format(dollars);
}
