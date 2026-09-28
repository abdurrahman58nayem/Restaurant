import { restaurant } from "@/config/restaurant";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/** Opening hours + location + map placeholder (no API key needed). */
export function InfoSection() {
  return (
    <section className="bg-charcoal-500 py-14 sm:py-20" id="visit">
      <div className="shell grid gap-10 lg:grid-cols-2">
        {/* Hours */}
        <Reveal>
          <div>
            <SectionHeading light eyebrow="Opening Hours" title="কখন আসবেন?" align="left" />
            <ul className="space-y-4">
              {restaurant.openingHours.map((o) => (
                <li key={o.en} className="flex items-center justify-between rounded-xl border border-ivory/10 bg-ivory/5 px-5 py-4">
                  <div>
                    <p className="font-bengali text-sm font-bold text-ivory">{o.days}</p>
                    <p className="text-xs text-ivory/60">{o.en}</p>
                  </div>
                  <p className="text-sm font-semibold text-gold-300">{o.hours}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-ivory/60">
              <Icon name="info" className="h-4 w-4 text-gold-300" />
              শুক্রবার জুমার সময় ১:৩০–২:০০ টা পর্যন্ত কিচেন বন্ধ থাকে।
            </p>
          </div>
        </Reveal>

        {/* Location */}
        <Reveal delay={120}>
          <div>
            <SectionHeading light eyebrow="Location" title="আমাদের ঠিকানা" align="left" />
            <div className="overflow-hidden rounded-xl border border-ivory/10">
              {/* Stylised map placeholder */}
              <div className="relative aspect-[16/9] bg-[#23201b]">
                <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
                  <g stroke="#5a5147" strokeWidth="1.5" fill="none">
                    <path d="M0 60 H400 M0 120 H400 M0 180 H400 M60 0 V220 M140 0 V220 M230 0 V220 M320 0 V220" />
                    <path d="M0 30 C 120 40 260 20 400 44 M20 220 C 120 160 300 200 400 150" strokeWidth="3" stroke="#8a6e5b" />
                  </g>
                  <circle cx="200" cy="110" r="26" fill="#B4552F" opacity="0.25" />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay-500 text-ivory shadow-lift">
                    <Icon name="pin" className="h-6 w-6" />
                  </span>
                  <p className="mt-2 rounded-full bg-charcoal-400/80 px-3 py-1 text-xs font-semibold text-ivory">NOORÉ — Dhanmondi</p>
                </div>
              </div>
              <div className="space-y-2.5 bg-ivory p-5">
                <p className="flex items-start gap-2 text-sm text-charcoal-200">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                  {restaurant.address.line1}, {restaurant.address.line2}
                </p>
                <p className="flex items-center gap-2 text-sm text-charcoal-200">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-clay-500" />
                  {restaurant.phoneDisplay}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a href={restaurant.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-dark px-4 py-2 text-xs">
                    Google Maps-এ দেখুন <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </a>
                  <a href={`tel:${restaurant.phone}`} className="btn-outline px-4 py-2 text-xs">
                    কল করুন
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
