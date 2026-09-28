"use client";

import { Icon } from "@/components/ui/Icon";

export function QtyControl({
  qty,
  onChange,
  small = false,
  light = false,
}: {
  qty: number;
  onChange: (q: number) => void;
  small?: boolean;
  light?: boolean;
}) {
  const btn = `flex items-center justify-center transition-colors ${small ? "h-7 w-7" : "h-9 w-9"} ${
    light ? "text-ivory hover:bg-ivory/10" : "text-charcoal-400 hover:bg-ivory-200"
  } rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-40`;
  return (
    <div
      className={`inline-flex items-center ${small ? "gap-0.5" : "gap-1"} rounded-full border ${
        light ? "border-ivory/30" : "border-charcoal-400/15 bg-white"
      } ${small ? "px-1 py-0.5" : "px-1.5 py-1"}`}
    >
      <button type="button" aria-label="কমান" className={btn} onClick={() => onChange(qty - 1)}>
        <Icon name="minus" className="h-3.5 w-3.5" />
      </button>
      <span
        className={`text-center font-semibold tabular-nums ${small ? "w-6 text-sm" : "w-8"}`}
        aria-live="polite"
      >
        {qty}
      </span>
      <button type="button" aria-label="বাড়ান" className={btn} onClick={() => onChange(qty + 1)}>
        <Icon name="plus" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
