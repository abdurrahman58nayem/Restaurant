import type { FoodItem } from "@/lib/types";
import { FoodCard } from "@/components/food/FoodCard";

/** Responsive product grid — 2 columns on mobile, up to 4 on desktop. */
export function FoodGrid({ foods, compact = false }: { foods: FoodItem[]; compact?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {foods.map((f) => (
        <FoodCard key={f.id} food={f} compact={compact} />
      ))}
    </div>
  );
}
