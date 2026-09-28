"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menu, searchTerms } from "@/data/menu";
import { categoryById } from "@/data/categories";
import { taka } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      window.setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return menu
      .filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.category.includes(term) ||
          categoryById(f.category).en.toLowerCase().includes(term) ||
          categoryById(f.category).label.includes(q.trim()) ||
          f.tags.some((t) => t.includes(term)) ||
          f.description.includes(q.trim())
      )
      .slice(0, 8);
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="খাবার খুঁজুন">
      <button type="button" aria-label="বন্ধ করুন" className="absolute inset-0 bg-charcoal-500/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-2xl animate-fade-up rounded-b-2xl bg-ivory p-4 shadow-lift sm:mt-10 sm:rounded-2xl sm:p-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-50" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input pl-11"
              placeholder="খাবার খুঁজুন — Burger, Biryani, Pizza…"
              aria-label="খাবার খুঁজুন"
            />
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-ivory-200" aria-label="সার্চ বন্ধ করুন">
            <Icon name="close" />
          </button>
        </div>

        {!q.trim() && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-charcoal-50">জনপ্রিয় সার্চ</p>
            <div className="flex flex-wrap gap-2">
              {searchTerms.map((t) => (
                <button key={t} type="button" onClick={() => setQ(t)} className="rounded-full border border-charcoal-400/15 px-3.5 py-1.5 text-xs font-medium text-charcoal-100 hover:border-clay-500 hover:text-clay-600">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {q.trim() && results.length === 0 && (
          <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
            <Icon name="search" className="h-8 w-8 text-charcoal-400/30" />
            <p className="text-sm font-medium text-charcoal-200">কোনো ফলাফল পাওয়া যায়নি</p>
            <p className="text-xs text-charcoal-50">“{q}” এর জন্য কিছু পাওয়া যায়নি — অন্য নামে চেষ্টা করুন।</p>
          </div>
        )}

        {results.length > 0 && (
          <ul className="mt-4 max-h-[55vh] divide-y divide-charcoal-400/8 overflow-y-auto">
            {results.map((f) => (
              <li key={f.id}>
                <Link href={`/food/${f.slug}`} onClick={onClose} className="flex items-center gap-3 py-3 hover:bg-ivory-100">
                  <Image src={f.images[0]} alt={f.name} width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-charcoal-400">{f.name}</p>
                    <p className="text-xs text-charcoal-50">{categoryById(f.category).label}</p>
                  </div>
                  <span className="text-sm font-bold text-clay-600">{taka(f.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
