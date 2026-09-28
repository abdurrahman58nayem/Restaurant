"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/types";
import { taka } from "@/lib/format";
import { restaurant } from "@/config/restaurant";
import { Icon } from "@/components/ui/Icon";

interface OrderSnapshot {
  id: string;
  placedAt: string;
  items: CartLine[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  customer: {
    name: string; phone: string; address: string; area: string; district: string;
    orderType: "delivery" | "takeaway"; payment: "cod" | "online"; instruction: string;
  };
  eta: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("noore-last-order");
      if (raw) setOrder(JSON.parse(raw) as OrderSnapshot);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  if (loaded && !order) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-24 text-center">
        <Icon name="info" className="h-10 w-10 text-charcoal-400/30" />
        <h1 className="font-bengali text-2xl font-bold text-charcoal-400">কোনো সাম্প্রতিক অর্ডার পাওয়া যায়নি</h1>
        <Link href="/menu" className="btn-primary mt-2 px-6 py-3 text-sm">মেনু দেখুন</Link>
      </div>
    );
  }

  if (!order) {
    return <div className="shell py-24 text-center text-sm text-charcoal-50">লোড হচ্ছে…</div>;
  }

  return (
    <div className="shell max-w-3xl py-12 sm:py-16">
      <div className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-leaf/10">
          <Icon name="check" className="h-10 w-10 text-leaf" strokeWidth={2.4} />
        </span>
        <h1 className="mt-5 font-bengali text-3xl font-bold text-charcoal-400">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h1>
        <p className="mt-2 text-sm text-charcoal-50">Order ID: <span className="font-bold text-charcoal-400">{order.id}</span></p>
        <p className="mt-1 text-sm text-charcoal-50">{order.eta}</p>
      </div>

      <div className="card-surface mt-8 overflow-hidden">
        <div className="border-b border-charcoal-400/10 bg-ivory-100 px-5 py-4">
          <h2 className="font-bengali text-base font-bold">অর্ডার করা খাবার</h2>
        </div>
        <ul className="divide-y divide-charcoal-400/8 px-5">
          {order.items.map((l) => (
            <li key={l.key} className="flex items-center gap-3.5 py-3.5">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image src={l.image} alt="" fill sizes="3.5rem" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-charcoal-200">{l.name}</span>
                <span className="text-xs text-charcoal-50">× {l.quantity}{l.optionsLabel ? ` • ${l.optionsLabel}` : ""}</span>
              </span>
              <span className="text-sm font-bold">{taka(l.unitPrice * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-charcoal-400/10 px-5 py-4 text-sm">
          <div className="flex justify-between"><dt className="text-charcoal-100">Subtotal</dt><dd>{taka(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-charcoal-100">Delivery Charge</dt><dd>{taka(order.deliveryCharge)}</dd></div>
          <div className="flex justify-between border-t border-charcoal-400/10 pt-2 text-base font-bold"><dt>Total</dt><dd className="text-clay-600">{taka(order.total)}</dd></div>
        </dl>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold"><Icon name="pin" className="h-4 w-4 text-clay-500" /> ডেলিভারি তথ্য</h2>
          <p className="text-sm font-semibold text-charcoal-200">{order.customer.name}</p>
          <p className="text-sm text-charcoal-100">{order.customer.phone}</p>
          {order.customer.orderType === "delivery" ? (
            <p className="mt-1 text-xs leading-relaxed text-charcoal-50">{order.customer.address}, {order.customer.district}</p>
          ) : (
            <p className="mt-1 text-xs text-charcoal-50">Takeaway — {restaurant.address.short} থেকে পিকআপ করুন।</p>
          )}
        </div>
        <div className="card-surface p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold"><Icon name="bag" className="h-4 w-4 text-clay-500" /> পেমেন্ট</h2>
          <p className="text-sm font-semibold text-charcoal-200">{order.customer.payment === "cod" ? "Cash on Delivery" : "Pay Online (Demo)"}</p>
          {order.customer.instruction && <p className="mt-1 text-xs text-charcoal-50">নোট: {order.customer.instruction}</p>}
        </div>
      </div>

      <p className="mt-8 rounded-xl bg-gold-100 px-5 py-4 text-center text-xs font-medium text-gold-500">
        আপনার অর্ডারের জন্য ধন্যবাদ। এটি শুধুমাত্র demo functionality — কোনো প্রকৃত অর্ডার তৈরি হয়নি।
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/menu" className="btn-primary px-6 py-3 text-sm">আরও অর্ডার করুন</Link>
        <Link href="/" className="btn-outline px-6 py-3 text-sm">হোমে ফিরুন</Link>
      </div>
    </div>
  );
}
