"use client";

import { Suspense, useMemo, useState } from "react";
import { menu, searchTerms } from "@/data/menu";
import { categoryById } from "@/data/categories";
import { FoodGrid } from "@/components/food/FoodGrid";
import { Icon } from "@/components/ui/Icon";

function SearchBody() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return menu.filter(
      (f) =>
        f.name.toLowerCase().includes(term) ||
        f.description.includes(q.trim()) ||
        categoryById(f.category).en.toLowerCase().includes(term) ||
        categoryById(f.category).label.includes(q.trim()) ||
        f.tags.some((t) => t.includes(term))
    );
  }, [q]);

  return (
    <div className="shell py-10 sm:py-14">
      <h1 className="font-bengali text-3xl font-bold text-charcoal-400">খাবার খুঁজুন</h1>
      <div className="relative mt-6 max-w-xl">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-50" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} className="input py-3.5 pl-12 text-base" placeholder="যেমন: Biryani, Burger, Pizza…" aria-label="খাবার খুঁজুন" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {searchTerms.map((t) => (
          <button key={t} type="button" onClick={() => setQ(t)} className="rounded-full border border-charcoal-400/15 px-4 py-2 text-xs font-semibold text-charcoal-100 hover:border-clay-500 hover:text-clay-600">
            {t}
          </button>
        ))}
      </div>

      {q.trim() && results.length === 0 && (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border border-dashed border-charcoal-400/20 bg-ivory-100 py-16 text-center">
          <Icon name="search" className="h-10 w-10 text-charcoal-400/25" />
          <p className="font-bengali text-lg font-bold text-charcoal-200">কোনো ফলাফল পাওয়া যায়নি</p>
          <p className="max-w-xs text-sm text-charcoal-50">“{q}” এর জন্য কিছু নেই — অন্য নামে চেষ্টা করুন।</p>
        </div>
      )}

      {q.trim() && results.length > 0 && (
        <>
          <p className="mt-8 text-xs text-charcoal-50">{results.length}টি ফলাফল</p>
          <div className="mt-4">
            <FoodGrid foods={results} />
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchBody />
    </Suspense>
  );
}
