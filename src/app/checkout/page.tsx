"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { delivery, deliveryChargeFor, type DeliveryArea } from "@/config/delivery";
import { restaurant } from "@/config/restaurant";
import { taka } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

const districts = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ", "কুমিল্লা", "নারায়ণগঞ্জ"];

interface FormState {
  name: string;
  phone: string;
  address: string;
  area: DeliveryArea;
  district: string;
  orderType: "delivery" | "takeaway";
  payment: "cod" | "online";
  instruction: string;
}

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "", phone: "", address: "", area: "inside", district: "ঢাকা",
    orderType: "delivery", payment: "cod", instruction: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const deliveryCharge = form.orderType === "takeaway" ? 0 : deliveryChargeFor(form.area);
  const discount = 0; // item-level discounts already reflected in prices
  const total = subtotal + deliveryCharge - discount;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "আপনার নাম লিখুন।";
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) e.phone = "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)।";
    if (form.orderType === "delivery" && form.address.trim().length < 8) e.address = "সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (lines.length === 0) {
      toast("কার্ট খালি — আগে খাবার যোগ করুন।", "error");
      return;
    }
    if (!validate()) {
      toast("ফর্মের ভুলগুলো ঠিক করুন।", "error");
      return;
    }
    setSubmitting(true);
    const orderId = `#NRE-${10000 + Math.floor(Math.random() * 89999)}`;
    const order = {
      id: orderId,
      placedAt: new Date().toISOString(),
      items: lines,
      subtotal,
      deliveryCharge,
      discount,
      total,
      customer: { ...form },
      eta: form.orderType === "takeaway" ? "৩০–৪৫ মিনিটের মধ্যে পিকআপ" : `ডেলিভারি: ${form.area === "inside" ? delivery.estimatedDelivery.inside : delivery.estimatedDelivery.outside}`,
    };
    try {
      window.sessionStorage.setItem("noore-last-order", JSON.stringify(order));
    } catch { /* ignore */ }
    window.setTimeout(() => {
      clear();
      router.push("/order-success");
    }, 500);
  };

  const summaryLines = useMemo(() => lines, [lines]);

  if (lines.length === 0) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
          <Icon name="bag" className="h-9 w-9 text-charcoal-400/40" />
        </span>
        <h1 className="font-bengali text-2xl font-bold text-charcoal-400">Checkout-এর জন্য কার্ট খালি</h1>
        <p className="max-w-xs text-sm text-charcoal-50">আগে মেনু থেকে পছন্দের খাবার যোগ করুন।</p>
        <Link href="/menu" className="btn-primary mt-2 px-6 py-3 text-sm">মেনু দেখুন</Link>
      </div>
    );
  }

  return (
    <div className="shell py-10 sm:py-14">
      <h1 className="font-bengali text-3xl font-bold text-charcoal-400">Checkout</h1>
      <p className="mt-1 text-sm text-charcoal-50">মাত্র কয়েকটি তথ্য — বাকিটা আমাদের উপর ছেড়ে দিন।</p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          {/* Customer info */}
          <section className="card-surface p-5 sm:p-6">
            <h2 className="mb-4 font-bengali text-lg font-bold">Customer Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">নাম *</label>
                <input id="name" className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="আপনার নাম" autoComplete="name" />
                {errors.name && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="label">মোবাইল নম্বর *</label>
                <input id="phone" className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="01XXXXXXXXX" inputMode="numeric" autoComplete="tel" />
                {errors.phone && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="label">Delivery Address {form.orderType === "delivery" && "*"}</label>
                <textarea id="address" className="input min-h-20" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="বাসা/হোল্ডিং, রোড, এলাকা…" autoComplete="street-address" disabled={form.orderType === "takeaway"} />
                {errors.address && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="area" className="label">এলাকা</label>
                <select id="area" className="input" value={form.area} onChange={(e) => set("area", e.target.value as DeliveryArea)} disabled={form.orderType === "takeaway"}>
                  <option value="inside">ঢাকার ভিতরে (৳{delivery.charges.insideDhaka})</option>
                  <option value="outside">ঢাকার বাইরে (৳{delivery.charges.outsideDhaka})</option>
                </select>
              </div>
              <div>
                <label htmlFor="district" className="label">জেলা</label>
                <select id="district" className="input" value={form.district} onChange={(e) => set("district", e.target.value)}>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="instruction" className="label">Special Instruction (ঐচ্ছিক)</label>
                <input id="instruction" className="input" value={form.instruction} onChange={(e) => set("instruction", e.target.value)} placeholder="যেমন: ঝাল কম চাই।" />
              </div>
            </div>
          </section>

          {/* Order type */}
          <section className="card-surface p-5 sm:p-6">
            <h2 className="mb-4 font-bengali text-lg font-bold">Order Type</h2>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id: "delivery", title: "Home Delivery", sub: `${delivery.estimatedDelivery.inside}`, icon: "bag" as const },
                { id: "takeaway", title: "Takeaway", sub: `${restaurant.address.short} থেকে পিকআপ`, icon: "home" as const },
              ]).map((o) => (
                <button key={o.id} type="button" onClick={() => set("orderType", o.id as FormState["orderType"])} className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition ${form.orderType === o.id ? "border-clay-500 bg-clay-50" : "border-charcoal-400/10 bg-white hover:border-charcoal-400/30"}`}>
                  <Icon name={o.icon} className={`h-5 w-5 ${form.orderType === o.id ? "text-clay-600" : "text-charcoal-50"}`} />
                  <span className="text-sm font-bold text-charcoal-400">{o.title}</span>
                  <span className="text-[11px] text-charcoal-50">{o.sub}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="card-surface p-5 sm:p-6">
            <h2 className="mb-4 font-bengali text-lg font-bold">Payment</h2>
            <div className="space-y-3">
              <button type="button" onClick={() => set("payment", "cod")} className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${form.payment === "cod" ? "border-clay-500 bg-clay-50" : "border-charcoal-400/10 bg-white hover:border-charcoal-400/30"}`}>
                <span>
                  <span className="block text-sm font-bold text-charcoal-400">Cash on Delivery</span>
                  <span className="text-[11px] text-charcoal-50">খাবার বুঝে নিয়ে তারপর পরিশোধ করুন</span>
                </span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${form.payment === "cod" ? "border-clay-500 bg-clay-500" : "border-charcoal-400/30"}`}>{form.payment === "cod" && <Icon name="check" className="h-3 w-3 text-ivory" />}</span>
              </button>
              <button type="button" onClick={() => set("payment", "online")} className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${form.payment === "online" ? "border-clay-500 bg-clay-50" : "border-charcoal-400/10 bg-white hover:border-charcoal-400/30"}`}>
                <span>
                  <span className="block text-sm font-bold text-charcoal-400">Pay Online</span>
                  <span className="text-[11px] text-charcoal-50">Demo — এই ডেমোতে প্রকৃত পেমেন্ট হয় না</span>
                </span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${form.payment === "online" ? "border-clay-500 bg-clay-500" : "border-charcoal-400/30"}`}>{form.payment === "online" && <Icon name="check" className="h-3 w-3 text-ivory" />}</span>
              </button>
            </div>
            {form.payment === "online" && (
              <p className="mt-3 rounded-lg bg-gold-100 px-4 py-2.5 text-xs font-medium text-gold-500">
                এটি একটি demo website — অনলাইন পেমেন্ট আসলে integrate করা নেই। ডেমোতে অর্ডার COD হিসেবেই গণ্য হবে।
              </p>
            )}
          </section>
        </div>

        {/* Summary */}
        <aside className="card-surface h-fit p-5 lg:sticky lg:top-24">
          <h2 className="font-bengali text-lg font-bold">অর্ডার সামারি</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {summaryLines.map((l) => (
              <li key={l.key} className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image src={l.image} alt="" fill sizes="3rem" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-charcoal-200">{l.name}</span>
                  <span className="text-[11px] text-charcoal-50">× {l.quantity}</span>
                </span>
                <span className="text-xs font-bold">{taka(l.unitPrice * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-charcoal-400/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-charcoal-100">Subtotal</dt><dd className="font-semibold">{taka(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-100">Delivery Charge</dt><dd className="font-semibold">{form.orderType === "takeaway" ? "০" : taka(deliveryCharge)}</dd></div>
            <div className="flex justify-between border-t border-charcoal-400/10 pt-2.5 text-base"><dt className="font-bold">Total</dt><dd className="font-bold text-clay-600">{taka(total)}</dd></div>
          </dl>
          <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full py-3.5 text-sm">
            {submitting ? "অর্ডার হচ্ছে…" : `অর্ডার কনফার্ম করুন — ${taka(total)}`}
          </button>
          <p className="mt-2.5 text-center text-[11px] text-charcoal-50">অর্ডার দিলে আপনি আমাদের ডেমো শর্তাবলিতে সম্মত হচ্ছেন।</p>
        </aside>
      </form>
    </div>
  );
}
