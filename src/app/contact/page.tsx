import { restaurant } from "@/config/restaurant";
import { whatsapp, waLink } from "@/config/whatsapp";
import { social } from "@/config/social";
import { faqs } from "@/data/faqs";
import { InfoSection } from "@/components/sections/InfoSection";
import { Icon } from "@/components/ui/Icon";

export const metadata = {
  title: "যোগাযোগ",
  description: "NOORÉ-এর সাথে যোগাযোগ করুন — ঠিকানা, ফোন, WhatsApp এবং খোলা থাকার সময়।",
};

export default function ContactPage() {
  return (
    <>
      <section className="shell py-10 sm:py-14">
        <span className="eyebrow">Contact</span>
        <h1 className="mt-2 font-bengali text-3xl font-bold text-charcoal-400 sm:text-4xl">যোগাযোগ করুন</h1>
        <p className="mt-2 max-w-md text-sm text-charcoal-100">প্রশ্ন, পরামর্শ কিংবা বুকিং — যেভাবে খুশি যোগাযোগ করুন।</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href={`tel:${restaurant.phone}`} className="card-surface group p-5 transition hover:shadow-lift">
            <Icon name="phone" className="h-6 w-6 text-clay-500" />
            <p className="mt-3 text-sm font-bold text-charcoal-400">কল করুন</p>
            <p className="mt-1 text-xs text-charcoal-50">{restaurant.phoneDisplay}</p>
          </a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="card-surface group p-5 transition hover:shadow-lift">
            <Icon name="whatsapp" className="h-6 w-6 text-leaf" />
            <p className="mt-3 text-sm font-bold text-charcoal-400">WhatsApp</p>
            <p className="mt-1 text-xs text-charcoal-50">{whatsapp.displayNumber}</p>
          </a>
          <a href={`mailto:${restaurant.email}`} className="card-surface group p-5 transition hover:shadow-lift">
            <Icon name="info" className="h-6 w-6 text-gold-500" />
            <p className="mt-3 text-sm font-bold text-charcoal-400">ইমেইল</p>
            <p className="mt-1 text-xs text-charcoal-50">{restaurant.email}</p>
          </a>
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="card-surface group p-5 transition hover:shadow-lift">
            <Icon name="instagram" className="h-6 w-6 text-clay-500" />
            <p className="mt-3 text-sm font-bold text-charcoal-400">Instagram</p>
            <p className="mt-1 text-xs text-charcoal-50">@noore.dhaka</p>
          </a>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h2 className="font-bengali text-2xl font-bold text-charcoal-400">সাধারণ প্রশ্ন</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.id} className="card-surface group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-charcoal-200 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Icon name="chevron-down" className="h-4 w-4 shrink-0 text-charcoal-50 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-100">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <InfoSection />
    </>
  );
}
