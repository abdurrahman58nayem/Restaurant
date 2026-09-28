import Image from "next/image";
import Link from "next/link";
import { restaurant } from "@/config/restaurant";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-charcoal-500 sm:min-h-[86vh] sm:items-center">
      <Image
        src="/images/brand/hero.jpg"
        alt="NOORÉ রেস্তোরাঁর সিগনেচার খাবারের টেবিল"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/90 via-charcoal-500/35 to-charcoal-500/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-500/60 to-transparent" />

      <div className="shell relative z-10 py-16 sm:py-20">
        <p className="eyebrow mb-3 text-gold-300">Premium Bangladeshi Dining</p>
        <h1 className="max-w-2xl font-bengali text-4xl font-bold leading-tight text-ivory sm:text-5xl lg:text-6xl">
          স্বাদের সাথে মুহূর্তের গল্প
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/85 sm:text-base">
          প্রিয় মানুষদের সাথে উপভোগ করুন আমাদের বাছাই করা খাবার, আরামদায়ক পরিবেশ এবং স্মরণীয় dining experience।
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/checkout" className="btn-primary px-7 py-3.5 text-base">
            এখনই অর্ডার করুন
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <Link href="/menu" className="btn-ghost-light px-7 py-3.5 text-base">
            মেনু দেখুন
          </Link>
          <Link href="/reservation" className="btn-ghost-light px-6 py-3.5 text-sm">
            টেবিল বুক করুন
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory/70">
          <span className="flex items-center gap-1.5"><Icon name="pin" className="h-3.5 w-3.5 text-gold-300" />{restaurant.address.short}</span>
          <span className="flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5 text-gold-300" />আজ খোলা {restaurant.openingHours[0].hours}</span>
        </div>
      </div>
    </section>
  );
}
