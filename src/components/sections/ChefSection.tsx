import Image from "next/image";
import { chefs } from "@/data/chefs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ChefSection() {
  return (
    <section className="bg-ivory-100 py-14 sm:py-20" id="chefs">
      <div className="shell">
        <SectionHeading
          eyebrow="আমাদের রান্নাঘর"
          title="যারা রান্নার পেছনে"
          subtitle="অভিজ্ঞ শেফদের নিখুঁত হাত — প্রতিটি প্লেটে যত্ন।"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {chefs.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <article className="card-surface group overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/70 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="font-display text-lg font-semibold text-ivory">{c.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">{c.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-clay-600">{c.specialty}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-charcoal-100">{c.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
