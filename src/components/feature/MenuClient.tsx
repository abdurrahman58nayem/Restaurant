"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { menu } from "@/data/menu";
import { categories } from "@/data/categories";
import type { CategoryId, FoodItem } from "@/lib/types";
import { FoodGrid } from "@/components/food/FoodGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

type SortKey = "popular" | "price-asc" | "price-desc" | "new" | "rating";

interface Filters {
  veg: boolean;
  popular: boolean;
  bestseller: boolean;
  available: boolean;
  spice: number | null; // 0..3
  priceMax: number | null;
}

const defaultFilters: Filters = { veg: false, popular: false, bestseller: false, available: false, spice: null, priceMax: null };

const sortLabels: Record<SortKey, string> = {
  popular: "Popular",
  "price-asc": "Price Low to High",
  "price-desc": "Price High to Low",
  new: "New",
  rating: "Best Rated",
};

export function MenuClient() {
  const params = useSearchParams();
  const initialCat = (params.get("cat") as CategoryId) || "all";
  const [cat, setCat] = useState<CategoryId | "all">(
    categories.some((c) => c.id === initialCat) ? initialCat : "all"
  );
  const [sort, setSort] = useState<SortKey>("popular");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    let list: FoodItem[] = [...menu];
    if (cat !== "all") list = list.filter((f) => f.category === cat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q) || f.description.includes(q));
    }
    if (filters.veg) list = list.filter((f) => f.isVegetarian);
    if (filters.popular) list = list.filter((f) => f.isPopular);
    if (filters.bestseller) list = list.filter((f) => f.isBestseller);
    if (filters.available) list = list.filter((f) => f.available);
    if (filters.spice !== null) list = list.filter((f) => f.spiceLevel === filters.spice);
    if (filters.priceMax !== null) list = list.filter((f) => f.price <= filters.priceMax!);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "new": list.sort((a, b) => Number(b.isNew) - Number(a.isNew)); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (Number(b.isBestseller) + Number(b.isPopular)) - (Number(a.isBestseller) + Number(a.isPopular)) || b.reviewCount - a.reviewCount);
    }
    return list;
  }, [cat, sort, filters, query]);

  const activeFilterCount =
    Number(filters.veg) + Number(filters.popular) + Number(filters.bestseller) +
    Number(filters.available) + (filters.spice !== null ? 1 : 0) + (filters.priceMax !== null ? 1 : 0);

  return (
    <div className="shell py-10 sm:py-14">
      <SectionHeading
        eyebrow="আমাদের মেনু"
        title="সম্পূর্ণ মেনু"
        subtitle="ক্যাটাগরি বাছুন, ফিল্টার করুন — যা খুঁজছেন তা খুঁজে নিন।"
        align="left"
      />

      {/* Category tabs */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
        <button type="button" onClick={() => setCat("all")} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${cat === "all" ? "bg-charcoal-400 text-ivory" : "bg-ivory-200 text-charcoal-100 hover:bg-sand-200"}`}>
          সব
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" onClick={() => setCat(c.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c.id ? "bg-charcoal-400 text-ivory" : "bg-ivory-200 text-charcoal-100 hover:bg-sand-200"}`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="input pl-10" placeholder="মেনুতে খুঁজুন…" aria-label="মেনুতে খুঁজুন" />
        </div>
        <button type="button" onClick={() => setDrawer(true)} className="btn-outline relative px-4 py-2.5 text-xs">
          <Icon name="filter" className="h-4 w-4" /> Filter
          {activeFilterCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-ivory">{activeFilterCount}</span>}
        </button>
        <label className="sr-only" htmlFor="sort">সর্ট করুন</label>
        <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input w-auto py-2.5 text-xs">
          {(Object.keys(sortLabels) as SortKey[]).map((k) => (
            <option key={k} value={k}>{sortLabels[k]}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-charcoal-50" aria-live="polite">{items.length}টি আইটেম পাওয়া গেছে</p>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-charcoal-400/20 bg-ivory-100 py-16 text-center">
          <Icon name="plate" className="h-10 w-10 text-charcoal-400/25" />
          <p className="font-bengali text-lg font-bold text-charcoal-200">কিছু পাওয়া যায়নি</p>
          <p className="max-w-xs text-sm text-charcoal-50">ফিল্টার বা সার্চ পরিবর্তন করে আবার চেষ্টা করুন।</p>
          <button type="button" onClick={() => { setFilters(defaultFilters); setQuery(""); setCat("all"); }} className="btn-primary mt-1 px-5 py-2.5 text-xs">
            সব ফিল্টার মুছুন
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <FoodGrid foods={items} />
        </div>
      )}

      {/* Filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="ফিল্টার">
          <button type="button" aria-label="বন্ধ করুন" className="absolute inset-0 bg-charcoal-500/50 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm animate-slide-in flex-col bg-ivory shadow-lift">
            <div className="flex items-center justify-between border-b border-charcoal-400/10 px-5 py-4">
              <p className="font-bengali text-lg font-bold">ফিল্টার</p>
              <button type="button" onClick={() => setDrawer(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ivory-200" aria-label="ফিল্টার বন্ধ করুন">
                <Icon name="close" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
              <FilterToggle label="Vegetarian" checked={filters.veg} onChange={(v) => setFilters((f) => ({ ...f, veg: v }))} />
              <FilterToggle label="Popular" checked={filters.popular} onChange={(v) => setFilters((f) => ({ ...f, popular: v }))} />
              <FilterToggle label="Bestseller" checked={filters.bestseller} onChange={(v) => setFilters((f) => ({ ...f, bestseller: v }))} />
              <FilterToggle label="Available" checked={filters.available} onChange={(v) => setFilters((f) => ({ ...f, available: v }))} />

              <div>
                <p className="label">Spice Level</p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((s) => (
                    <button key={s} type="button" onClick={() => setFilters((f) => ({ ...f, spice: f.spice === s ? null : s }))} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${filters.spice === s ? "bg-clay-500 text-ivory" : "bg-ivory-200 text-charcoal-100"}`}>
                      {s === 1 ? "Mild" : s === 2 ? "Medium" : "Spicy"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="label">সর্বোচ্চ দাম</p>
                <div className="flex flex-wrap gap-2">
                  {[300, 450, 600].map((p) => (
                    <button key={p} type="button" onClick={() => setFilters((f) => ({ ...f, priceMax: f.priceMax === p ? null : p }))} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${filters.priceMax === p ? "bg-clay-500 text-ivory" : "bg-ivory-200 text-charcoal-100"}`}>
                      ≤ ৳{p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 border-t border-charcoal-400/10 p-4">
              <button type="button" onClick={() => setFilters(defaultFilters)} className="btn-outline flex-1 py-3 text-sm">Reset</button>
              <button type="button" onClick={() => setDrawer(false)} className="btn-primary flex-1 py-3 text-sm">দেখুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm font-semibold text-charcoal-200">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-clay-500" : "bg-sand-200"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
      </button>
    </label>
  );
}
