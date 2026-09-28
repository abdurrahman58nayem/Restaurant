"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FoodItem } from "@/lib/types";
import { categoryById } from "@/data/categories";
import { menu } from "@/data/menu";
import { taka, spiceLabels } from "@/lib/format";
import { buildLine, unitPriceFor, type SelectedOptions } from "@/lib/cartHelpers";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { QtyControl } from "@/components/ui/QtyControl";
import { FoodCard } from "@/components/food/FoodCard";

export function FoodDetailsClient({ food }: { food: FoodItem }) {
  const router = useRouter();
  const { addLine } = useCart();
  const { toast } = useToast();
  const cat = categoryById(food.category);

  const [opts, setOpts] = useState<SelectedOptions>({
    sizeId: food.customization?.sizes?.[0]?.id,
    addOnIds: [],
  });
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const unitPrice = useMemo(() => unitPriceFor(food, opts), [food, opts]);

  const addToCart = () => {
    if (!food.available) {
      toast("দুঃখিত, আইটেমটি এখন পাওয়া যাচ্ছে না।", "error");
      return;
    }
    const { line, key } = buildLine(food, opts, qty);
    addLine(line, key);
    toast("আপনার খাবারটি Cart-এ যোগ হয়েছে।");
  };

  const orderNow = () => {
    if (!food.available) {
      toast("দুঃখিত, আইটেমটি এখন পাওয়া যাচ্ছে না।", "error");
      return;
    }
    const { line, key } = buildLine(food, opts, qty);
    addLine(line, key);
    router.push("/checkout");
  };

  const related = menu.filter((f) => f.category === food.category && f.slug !== food.slug).slice(0, 4);

  return (
    <div className="shell py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-charcoal-50" aria-label="breadcrumb">
        <Link href="/" className="hover:text-clay-600">হোম</Link>
        <Icon name="chevron-right" className="h-3 w-3" />
        <Link href="/menu" className="hover:text-clay-600">মেনু</Link>
        <Icon name="chevron-right" className="h-3 w-3" />
        <Link href={`/menu?cat=${food.category}`} className="hover:text-clay-600">{cat.label}</Link>
        <Icon name="chevron-right" className="h-3 w-3" />
        <span className="truncate font-semibold text-charcoal-200">{food.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ivory-200 shadow-card">
            <Image src={food.images[imgIdx]} alt={food.name} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            {food.discount && (
              <span className="absolute left-3 top-3 rounded-full bg-clay-500 px-3 py-1 text-xs font-bold text-ivory">-{food.discount}%</span>
            )}
          </div>
          {food.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {food.images.map((img, i) => (
                <button key={img} type="button" onClick={() => setImgIdx(i)} className={`relative h-20 w-24 overflow-hidden rounded-lg border-2 ${i === imgIdx ? "border-clay-500" : "border-transparent opacity-70"}`} aria-label={`ছবি ${i + 1}`}>
                  <Image src={img} alt="" fill sizes="6rem" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + purchase */}
        <div>
          <p className="eyebrow">{cat.en}</p>
          <h1 className="mt-1 font-bengali text-3xl font-bold text-charcoal-400 sm:text-4xl">{food.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Rating value={food.rating} count={food.reviewCount} />
            {food.isVegetarian && <span className="flex items-center gap-1 rounded-full bg-leaf/10 px-2.5 py-1 text-[11px] font-semibold text-leaf"><Icon name="leaf" className="h-3 w-3" /> Vegetarian</span>}
            {food.isBestseller && <span className="rounded-full bg-gold-400/20 px-2.5 py-1 text-[11px] font-semibold text-gold-500">Bestseller</span>}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-100">{food.description}</p>

          <div className="mt-4 flex items-end gap-3">
            <p className="text-3xl font-bold text-clay-600">{taka(unitPrice)}</p>
            {food.originalPrice && <p className="pb-1 text-base text-charcoal-50 line-through">{taka(food.originalPrice)}</p>}
          </div>

          <p className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${food.available ? "text-leaf" : "text-clay-600"}`}>
            <span className={`h-2 w-2 rounded-full ${food.available ? "bg-leaf" : "bg-clay-600"}`} />
            {food.available ? "আজ পাওয়া যাচ্ছে" : "এখন পাওয়া যাচ্ছে না"}
          </p>

          {/* Customization */}
          {food.customization?.spice && (
            <fieldset className="mt-5">
              <legend className="label">Spice Level</legend>
              <div className="flex gap-2">
                {["Mild", "Medium", "Spicy"].map((s) => (
                  <button key={s} type="button" onClick={() => setOpts((o) => ({ ...o, spice: o.spice === s ? undefined : s }))} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${opts.spice === s ? "bg-clay-500 text-ivory" : "bg-ivory-200 text-charcoal-100 hover:bg-sand-200"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {food.customization?.sizes && (
            <fieldset className="mt-5">
              <legend className="label">Size</legend>
              <div className="flex gap-2">
                {food.customization.sizes.map((s) => (
                  <button key={s.id} type="button" onClick={() => setOpts((o) => ({ ...o, sizeId: s.id }))} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${opts.sizeId === s.id ? "bg-charcoal-400 text-ivory" : "bg-ivory-200 text-charcoal-100 hover:bg-sand-200"}`}>
                    {s.name}{s.priceDelta > 0 && <span className="ml-1 opacity-70">+{taka(s.priceDelta)}</span>}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {food.customization?.addOns && (
            <fieldset className="mt-5">
              <legend className="label">Add-ons</legend>
              <div className="grid grid-cols-2 gap-2">
                {food.customization.addOns.map((a) => {
                  const on = opts.addOnIds.includes(a.id);
                  return (
                    <button key={a.id} type="button" onClick={() => setOpts((o) => ({ ...o, addOnIds: on ? o.addOnIds.filter((x) => x !== a.id) : [...o.addOnIds, a.id] }))} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition ${on ? "border-clay-500 bg-clay-50 text-clay-600" : "border-charcoal-400/15 bg-white text-charcoal-100"}`}>
                      {a.name}
                      <Icon name={on ? "check" : "plus"} className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Qty + CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyControl qty={qty} onChange={(q) => setQty(Math.max(1, q))} />
            <button type="button" onClick={addToCart} className="btn-dark flex-1 px-6 py-3 text-sm sm:flex-none">
              <Icon name="cart" className="h-4 w-4" /> Add to Cart
            </button>
            <button type="button" onClick={orderNow} className="btn-primary flex-1 px-6 py-3 text-sm sm:flex-none">
              Order Now
            </button>
          </div>
          <p className="mt-2 text-xs text-charcoal-50">মোট: {taka(unitPrice * qty)} • প্রস্তুতি {food.preparationTime}</p>

          {/* Details */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-charcoal-400/10 pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Portion</dt>
              <dd className="mt-1 font-medium text-charcoal-200">{food.portion}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Preparation</dt>
              <dd className="mt-1 font-medium text-charcoal-200">{food.preparationTime}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Spice</dt>
              <dd className="mt-1 font-medium text-charcoal-200">{spiceLabels[food.spiceLevel]}</dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Ingredients</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {food.ingredients.map((ing) => (
                  <span key={ing} className="rounded-full bg-ivory-200 px-2.5 py-1 text-xs text-charcoal-100">{ing}</span>
                ))}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Allergen Information</dt>
              <dd className="mt-1 text-xs leading-relaxed text-charcoal-100">
                দুধ, গ্লুটেন, ডিম, সয়া কিংবা বাদাম জাতীয় উপকরণ থাকতে পারে। অ্যালার্জি থাকলে অর্ডারের আগে জানান।
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal-50">Serving Suggestion</dt>
              <dd className="mt-1 text-xs leading-relaxed text-charcoal-100">
                গরম গরম পরিবেশন করুন — সাথে আমাদের সিগনেচার সস কিংবা একটি ঠান্ডা ড্রিঙ্কস দারুণ মানায়।
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-bengali text-2xl font-bold text-charcoal-400">আরও দেখুন — {cat.label}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((f) => (
              <FoodCard key={f.id} food={f} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
