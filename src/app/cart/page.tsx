"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { foodBySlug } from "@/data/menu";
import { delivery } from "@/config/delivery";
import { taka } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { QtyControl } from "@/components/ui/QtyControl";

export default function CartPage() {
  const { lines, setQuantity, removeLine, subtotal } = useCart();

  const discount = lines.reduce((sum, l) => {
    const food = foodBySlug(l.slug);
    if (food?.originalPrice) return sum + (food.originalPrice - food.price) * l.quantity;
    return sum;
  }, 0);

  const remaining = Math.max(0, delivery.freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / delivery.freeDeliveryThreshold) * 100));

  if (lines.length === 0) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
          <Icon name="cart" className="h-9 w-9 text-charcoal-400/40" />
        </span>
        <h1 className="font-bengali text-2xl font-bold text-charcoal-400">আপনার কার্ট খালি</h1>
        <p className="max-w-xs text-sm text-charcoal-50">মন ভরানো খাবার বেছে নিন — মেনু থেকে শুরু করুন।</p>
        <Link href="/menu" className="btn-primary mt-2 px-6 py-3 text-sm">মেনু দেখুন</Link>
      </div>
    );
  }

  return (
    <div className="shell py-10 sm:py-14">
      <h1 className="font-bengali text-3xl font-bold text-charcoal-400">আপনার কার্ট</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Lines */}
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l.key} className="card-surface flex gap-3.5 p-3.5 sm:gap-5 sm:p-4">
              <Link href={`/food/${l.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
                <Image src={l.image} alt={l.name} fill sizes="7rem" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/food/${l.slug}`} className="block truncate font-bengali text-base font-bold text-charcoal-400 hover:text-clay-600">{l.name}</Link>
                    {l.optionsLabel && <p className="mt-0.5 text-xs text-charcoal-50">{l.optionsLabel}</p>}
                    <p className="mt-1 text-xs text-charcoal-50">৳{l.unitPrice.toLocaleString("en-IN")} /টি</p>
                  </div>
                  <button type="button" onClick={() => removeLine(l.key)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-50 hover:bg-clay-50 hover:text-clay-600" aria-label={`${l.name} মুছুন`}>
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <QtyControl small qty={l.quantity} onChange={(q) => setQuantity(l.key, q)} />
                  <p className="text-base font-bold text-charcoal-400">{taka(l.unitPrice * l.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="card-surface h-fit p-5 lg:sticky lg:top-24">
          <h2 className="font-bengali text-lg font-bold text-charcoal-400">অর্ডার সামারি</h2>

          {/* Free delivery progress */}
          <div className="mt-4 rounded-lg bg-ivory-200 p-3.5">
            {remaining > 0 ? (
              <p className="text-xs font-medium text-charcoal-100">
                আর {taka(remaining)} অর্ডার করলে আপনি একটি বিশেষ delivery offer পেতে পারেন।
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-xs font-bold text-leaf">
                <Icon name="check" className="h-4 w-4" /> আপনি বিশেষ delivery offer-এর জন্য যোগ্য!
              </p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand-200">
              <div className="h-full rounded-full bg-clay-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-charcoal-100">Subtotal</dt><dd className="font-semibold">{taka(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-100">Discount</dt><dd className="font-semibold text-leaf">− {taka(discount)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-100">Delivery Charge</dt><dd className="text-xs text-charcoal-50">checkout-এ হিসাব হবে</dd></div>
            <div className="flex justify-between border-t border-charcoal-400/10 pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-bold text-clay-600">{taka(subtotal)}</dd></div>
          </dl>

          <Link href="/checkout" className="btn-primary mt-5 w-full py-3.5 text-sm">
            Checkout করুন <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <Link href="/menu" className="mt-3 block text-center text-xs font-semibold text-charcoal-100 hover:text-clay-600">
            আরও খাবার যোগ করুন
          </Link>
        </aside>
      </div>
    </div>
  );
}
