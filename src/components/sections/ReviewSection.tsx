import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function ReviewSection() {
  return (
    <section className="py-14 sm:py-20" id="reviews">
      <div className="shell">
        <SectionHeading
          eyebrow="Guest Stories"
          title="আমাদের অতিথিরা কী বলছেন"
          subtitle="ডেমো কনটেন্ট — বাস্তব প্রজেক্টে আপনার সত্যিকারের রিভিউ এখানে থাকবে।"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 5).map((r, i) => (
            <Reveal key={r.id} delay={i * 80} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <blockquote className="card-surface flex h-full flex-col gap-3 p-5">
                <Icon name="sparkle" className="h-5 w-5 text-gold-400" />
                <p className="font-bengali text-sm font-medium leading-relaxed text-charcoal-200">“{r.text}”</p>
                <footer className="mt-auto flex items-center justify-between gap-2 border-t border-charcoal-400/10 pt-3">
                  <div>
                    <p className="text-sm font-bold text-charcoal-400">{r.name}</p>
                    <p className="text-[11px] text-charcoal-50">{r.area} • {r.occasion}</p>
                  </div>
                  <Rating value={r.rating} />
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
