"use client";

import { useState } from "react";
import Image from "next/image";
import { restaurant } from "@/config/restaurant";
import { waLink } from "@/config/whatsapp";
import { Icon } from "@/components/ui/Icon";

interface ResForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  request: string;
}

export default function ReservationPage() {
  const [form, setForm] = useState<ResForm>({ name: "", phone: "", date: "", time: "", guests: "2", request: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ResForm, string>>>({});
  const [done, setDone] = useState(false);

  const set = <K extends keyof ResForm>(k: K, v: ResForm[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof ResForm, string>> = {};
    if (form.name.trim().length < 2) errs.name = "আপনার নাম লিখুন।";
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) errs.phone = "সঠিক মোবাইল নম্বর দিন।";
    if (!form.date) errs.date = "তারিখ নির্বাচন করুন।";
    if (!form.time) errs.time = "সময় নির্বাচন করুন।";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="shell py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Reservation</span>
          <h1 className="mt-2 font-bengali text-3xl font-bold text-charcoal-400 sm:text-4xl">টেবিল বুক করুন</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal-100">
            পরিবার, বন্ধু কিংবা বিশেষ মুহূর্ত — আপনার পছন্দের সময়টি বেছে নিন, বাকিটা আমরা সামলে নেব।
          </p>
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-xl shadow-card lg:block">
            <Image src="/images/ambience/interior-1.jpg" alt="NOORÉ ডাইনিং স্পেস" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/70 to-transparent" />
            <p className="absolute bottom-4 left-5 text-sm font-semibold text-ivory">{restaurant.address.short}</p>
          </div>
          <ul className="mt-6 space-y-2.5 text-sm text-charcoal-100">
            {restaurant.openingHours.map((o) => (
              <li key={o.en} className="flex items-center gap-2.5">
                <Icon name="clock" className="h-4 w-4 text-clay-500" /> {o.days}: <span className="font-semibold">{o.hours}</span>
              </li>
            ))}
            <li className="flex items-center gap-2.5">
              <Icon name="users" className="h-4 w-4 text-clay-500" /> ১২ জনের বেশি অতিথির জন্য সরাসরি কল করুন।
            </li>
          </ul>
        </div>

        <div>
          {done ? (
            <div className="card-surface flex flex-col items-center gap-4 p-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf/10">
                <Icon name="check" className="h-8 w-8 text-leaf" strokeWidth={2.4} />
              </span>
              <h2 className="font-bengali text-2xl font-bold text-charcoal-400">আপনার রিজার্ভেশন রিকোয়েস্ট গ্রহণ করা হয়েছে।</h2>
              <p className="max-w-sm text-sm leading-relaxed text-charcoal-100">
                ধন্যবাদ, {form.name}! {form.date} তারিখে {form.time} সময়ে {form.guests} জনের টেবিলের জন্য আমরা শীঘ্রই কল করে কনফার্ম করব।
              </p>
              <p className="rounded-lg bg-ivory-200 px-4 py-2 text-[11px] text-charcoal-50">এটি একটি demo functionality — প্রকৃত রিজার্ভেশন backend নেই।</p>
              <a href={waLink(`আসসালামু আলাইকুম। আমি ${form.date} ${form.time}-এ ${form.guests} জনের জন্য টেবিল রিজার্ভ করতে চাই।`)} target="_blank" rel="noopener noreferrer" className="btn-outline mt-1 px-5 py-2.5 text-xs">
                <Icon name="whatsapp" className="h-4 w-4 text-leaf" /> WhatsApp-এ কনফার্ম করুন
              </a>
              <button type="button" onClick={() => { setDone(false); setForm({ name: "", phone: "", date: "", time: "", guests: "2", request: "" }); }} className="text-xs font-semibold text-charcoal-100 hover:text-clay-600">
                নতুন রিজার্ভেশন করুন
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="card-surface space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="rname" className="label">নাম *</label>
                  <input id="rname" className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="আপনার নাম" />
                  {errors.name && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="rphone" className="label">মোবাইল নম্বর *</label>
                  <input id="rphone" className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="01XXXXXXXXX" inputMode="numeric" />
                  {errors.phone && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="rdate" className="label">তারিখ *</label>
                  <input id="rdate" type="date" min={today} className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
                  {errors.date && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.date}</p>}
                </div>
                <div>
                  <label htmlFor="rtime" className="label">সময় *</label>
                  <input id="rtime" type="time" className="input" value={form.time} onChange={(e) => set("time", e.target.value)} />
                  {errors.time && <p className="mt-1 text-xs text-clay-600" role="alert">{errors.time}</p>}
                </div>
                <div>
                  <label htmlFor="rguests" className="label">অতিথির সংখ্যা</label>
                  <select id="rguests" className="input" value={form.guests} onChange={(e) => set("guests", e.target.value)}>
                    {["1", "2", "3", "4", "5", "6", "8", "10", "12"].map((g) => <option key={g} value={g}>{g} জন</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rreq" className="label">Special Request (ঐচ্ছিক)</label>
                  <input id="rreq" className="input" value={form.request} onChange={(e) => set("request", e.target.value)} placeholder="যেমন: উইন্ডো সাইড টেবিল, জন্মদিনের সাজসজ্জা…" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 text-sm">
                রিজার্ভেশন রিকোয়েস্ট পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
