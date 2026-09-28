"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/feature/SearchOverlay";
import { NAV_LINKS } from "@/config/nav";

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-charcoal-400/10 bg-ivory/95 shadow-card backdrop-blur"
            : "border-transparent bg-ivory"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          {/* Mobile menu trigger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-400 hover:bg-ivory-200 lg:hidden"
            aria-label="মেনু খুলুন"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>

          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-2" aria-label="NOORÉ হোম">
            <span className="font-display text-2xl font-semibold tracking-[0.18em] text-charcoal-400 sm:text-[1.7rem]">
              NOOR<span className="text-clay-500">É</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-gold-400 sm:block" aria-hidden="true" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="প্রধান নেভিগেশন">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? "bg-charcoal-400 text-ivory"
                    : "text-charcoal-100 hover:bg-ivory-200 hover:text-charcoal-400"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="খাবার খুঁজুন"
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-400 hover:bg-ivory-200"
              onClick={() => setSearchOpen(true)}
            >
              <Icon name="search" />
            </button>
            <Link
              href="/cart"
              aria-label={`কার্ট, ${count}টি আইটেম`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal-400 hover:bg-ivory-200"
            >
              <Icon name="cart" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-ivory">
                  {count}
                </span>
              )}
            </Link>
            <Link href="/checkout" className="btn-primary hidden px-5 py-2.5 md:inline-flex">
              Order Now
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
