/** Format a number as Bangladeshi Taka, e.g. 1490 -> "৳1,490". */
export function taka(n: number): string {
  return `৳${n.toLocaleString("en-IN")}`;
}

/** Percent discount label, e.g. 16 -> "16%". */
export function discountLabel(original: number, price: number): number {
  return Math.round(((original - price) / original) * 100);
}

export function savingsAmount(original: number, price: number): number {
  return Math.max(0, original - price);
}

export const spiceLabels: Record<number, string> = {
  0: "ঝাল নেই",
  1: "Mild",
  2: "Medium",
  3: "Spicy",
};
