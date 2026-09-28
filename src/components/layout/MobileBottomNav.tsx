"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Icon, type IconName } from "@/components/ui/Icon";

const items: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/menu", label: "Menu", icon: "plate" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/cart", label: "Cart", icon: "cart" },
  { href: "/contact", label: "Contact", icon: "phone" },
];

export function MobileBottomNav() {
  const { count } = useCart();
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-400/10 bg-ivory/95 backdrop-blur lg:hidden"
      aria-label="মোবাইল বটম নেভিগেশন"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${
                active ? "text-clay-600" : "text-charcoal-50"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative">
                <Icon name={it.icon} className="h-5 w-5" />
                {it.icon === "cart" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[9px] font-bold text-ivory">
                    {count}
                  </span>
                )}
              </span>
              {it.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
