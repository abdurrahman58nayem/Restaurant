import type { CartLine, FoodItem } from "@/lib/types";

export interface SelectedOptions {
  sizeId?: string;
  addOnIds: string[];
  spice?: string;
}

export const defaultOptions: SelectedOptions = { addOnIds: [] };

/** Compute unit price for a food with selected size + add-ons. */
export function unitPriceFor(food: FoodItem, opts: SelectedOptions): number {
  let price = food.price;
  const size = food.customization?.sizes?.find((s) => s.id === opts.sizeId);
  if (size) price += size.priceDelta;
  for (const id of opts.addOnIds) {
    const addOn = food.customization?.addOns?.find((a) => a.id === id);
    if (addOn) price += addOn.price;
  }
  return price;
}

/** Human-readable options label for cart display. */
export function optionsLabelFor(food: FoodItem, opts: SelectedOptions): string | undefined {
  const parts: string[] = [];
  const size = food.customization?.sizes?.find((s) => s.id === opts.sizeId);
  if (size) parts.push(size.name);
  if (opts.spice) parts.push(`ঝাল: ${opts.spice}`);
  for (const id of opts.addOnIds) {
    const a = food.customization?.addOns?.find((x) => x.id === id);
    if (a) parts.push(a.name.split(" +")[0]);
  }
  return parts.length ? parts.join(" • ") : undefined;
}

export function optionKey(food: FoodItem, opts: SelectedOptions): string {
  return [food.slug, opts.sizeId ?? "std", opts.spice ?? "", [...opts.addOnIds].sort().join("+")].join("|");
}

export function buildLine(food: FoodItem, opts: SelectedOptions, quantity = 1): { line: Omit<CartLine, "key">; key: string } {
  return {
    line: {
      slug: food.slug,
      name: food.name,
      image: food.images[0],
      unitPrice: unitPriceFor(food, opts),
      quantity,
      optionsLabel: optionsLabelFor(food, opts),
    },
    key: optionKey(food, opts),
  };
}
