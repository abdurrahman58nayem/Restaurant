import Link from "next/link";
import { site } from "@/config/site";
import { restaurant } from "@/config/restaurant";
import { social } from "@/config/social";
import { whatsapp } from "@/config/whatsapp";
import { NAV_LINKS } from "@/config/nav";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="bg-charcoal-500 text-ivory">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.18em]">
            NOOR<span className="text-gold-300">É</span>
          </p>
          <p className="mt-1 font-bengali text-sm text-gold-300">{restaurant.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            Quality food, thoughtful presentation এবং comfortable dining — প্রতিটি customer-এর জন্য একটি সুন্দর মুহূর্ত।
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition hover:border-gold-300 hover:text-gold-300">
              <Icon name="instagram" className="h-4 w-4" />
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition hover:border-gold-300 hover:text-gold-300">
              <Icon name="facebook" className="h-4 w-4" />
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition hover:border-gold-300 hover:text-gold-300">
              <Icon name="youtube" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="ফুটার নেভিগেশন">
          <p className="mb-4 text-xs font-semibold uppercase tracking-brand text-gold-300">Explore</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ivory/70 transition hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
            <li><Link href="/offers" className="text-sm text-ivory/70 transition hover:text-ivory">অফারসমূহ</Link></li>
            <li><Link href="/gallery" className="text-sm text-ivory/70 transition hover:text-ivory">মুহূর্তসমূহ</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-brand text-gold-300">যোগাযোগ</p>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li className="flex gap-2.5"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />{restaurant.address.line1}, {restaurant.address.line2}</li>
            <li className="flex gap-2.5"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />{restaurant.phoneDisplay} • WhatsApp {whatsapp.displayNumber}</li>
            <li className="flex gap-2.5"><Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />{restaurant.openingHours[0].days}: {restaurant.openingHours[0].hours}</li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-brand text-gold-300">খোলা থাকার সময়</p>
          <ul className="space-y-3 text-sm">
            {restaurant.openingHours.map((o) => (
              <li key={o.en} className="flex items-start justify-between gap-3 border-b border-ivory/10 pb-2.5">
                <span className="text-ivory/70">{o.days}</span>
                <span className="font-medium text-ivory">{o.hours}</span>
              </li>
            ))}
          </ul>
          <Link href="/reservation" className="btn-gold mt-5 px-5 py-2.5 text-xs">
            টেবিল বুক করুন
          </Link>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col items-center justify-between gap-2 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} {site.legalName} — Demo Website by{" "}
            <span className="font-semibold text-gold-300">CodePixel Web</span>
          </p>
          <p className="text-[11px] text-ivory/35">{site.agencyNote}</p>
        </div>
      </div>
    </footer>
  );
}
