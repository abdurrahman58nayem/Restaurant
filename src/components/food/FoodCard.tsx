"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FoodItem } from "@/lib/types";
import { categoryById } from "@/data/categories";
import { taka, discountLabel } from "@/lib/format";
import { buildLine, defaultOptions } from "@/lib/cartHelpers";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";

export function FoodCard({ food, compact = false }: { food: FoodItem; compact?: boolean }) {
  const { addLine } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const cat = categoryById(food.category);

  const addToCart = () => {
    if (!food.available) {
      toast("দুঃখিত, আইটেমটি এখন পাওয়া যাচ্ছে না।", "error");
      return;
    }
    const { line, key } = buildLine(food, defaultOptions);
    addLine(line, key);
    toast("আপনার খাবারটি Cart-এ যোগ হয়েছে।");
  };

  const orderNow = () => {
    if (!food.available) {
      toast("দুঃখিত, আইটেমটি এখন পাওয়া যাচ্ছে না।", "error");
      return;
    }
    const { line, key } = buildLine(food, defaultOptions);
    addLine(line, key);
    router.push("/checkout");
  };

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <Link href={`/food/${food.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ivory-200" aria-label={food.name}>
        <Image
          src={food.images[0]}
          alt={food.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {food.discount && food.originalPrice && (
            <span className="rounded-full bg-clay-500 px-2 py-0.5 text-[10px] font-bold text-ivory">
              -{discountLabel(food.originalPrice, food.price)}%
            </span>
          )}
          {food.isBestseller && (
            <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-charcoal-500">Bestseller</span>
          )}
          {food.isNew && (
            <span className="rounded-full bg-charcoal-400 px-2 py-0.5 text-[10px] font-bold text-ivory">New</span>
          )}
        </div>
        {!food.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal-500/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-ivory px-3 py-1 text-xs font-bold text-charcoal-400">এখন পাওয়া যাচ্ছে না</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-clay-500">{cat.en}</span>
          {food.isVegetarian && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-leaf" title="ভেজিটেরিয়ান">
              <Icon name="leaf" className="h-3 w-3" /> Veg
            </span>
          )}
        </div>
        <h3 className={`font-bengali font-bold leading-snug text-charcoal-400 ${compact ? "text-sm" : "text-base"}`}>
          <Link href={`/food/${food.slug}`} className="transition hover:text-clay-600">{food.name}</Link>
        </h3>
        {!compact && <p className="line-clamp-2 text-xs leading-relaxed text-charcoal-50">{food.description}</p>}
        <Rating value={food.rating} count={food.reviewCount} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="leading-tight">
            <p className="text-base font-bold text-charcoal-400">{taka(food.price)}</p>
            {food.originalPrice && (
              <p className="text-xs text-charcoal-50 line-through">{taka(food.originalPrice)}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={orderNow}
              className="hidden rounded-full border border-clay-500/40 px-3 py-1.5 text-[11px] font-semibold text-clay-600 transition hover:bg-clay-500 hover:text-ivory sm:block"
            >
              Order Now
            </button>
            <button
              type="button"
              onClick={addToCart}
              aria-label={`${food.name} কার্টে যোগ করুন`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-400 text-ivory transition hover:bg-clay-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Icon name="plus" className="h-4 w-4" />
            </button>
          </div>
        </div>
        <button type="button" onClick={orderNow} className="btn-primary mt-1 w-full py-2 text-xs sm:hidden">
          Order Now
        </button>
      </div>
    </article>
  );
}
