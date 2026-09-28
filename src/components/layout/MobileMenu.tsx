"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/config/nav";
import { Icon } from "@/components/ui/Icon";
import { restaurant } from "@/config/restaurant";
import { waLink, whatsapp } from "@/config/whatsapp";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="মেনু">
      <button
        type="button"
        aria-label="বন্ধ করুন"
        className="absolute inset-0 bg-charcoal-500/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[84%] max-w-sm animate-slide-in-left flex-col bg-ivory shadow-lift">
        <div className="flex items-center justify-between border-b border-charcoal-400/10 px-5 py-4">
          <span className="font-display text-xl font-semibold tracking-[0.18em]">
            NOOR<span className="text-clay-500">É</span>
          </span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ivory-200"
            aria-label="মেনু বন্ধ করুন"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="মোবাইল নেভিগেশন">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium ${
                pathname === l.href ? "bg-clay-50 text-clay-600" : "text-charcoal-200 hover:bg-ivory-200"
              }`}
            >
              {l.label}
              <Icon name="chevron-right" className="h-4 w-4 opacity-40" />
            </Link>
          ))}
        </nav>
        <div className="space-y-2.5 border-t border-charcoal-400/10 p-4">
          <Link href="/checkout" onClick={onClose} className="btn-primary w-full py-3">
            এখনই অর্ডার করুন
          </Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full py-3">
            <Icon name="whatsapp" className="h-4 w-4 text-leaf" />
            {whatsapp.displayNumber}
          </a>
          <p className="text-center text-xs text-charcoal-50">{restaurant.address.short}</p>
        </div>
      </div>
    </div>
  );
}
