import { offers } from "@/data/offers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferCard } from "@/components/food/OfferCard";
import { Reveal } from "@/components/ui/Reveal";

export function OfferSection() {
  return (
    <section className="py-14 sm:py-20" id="offers">
      <div className="shell">
        <SectionHeading
          eyebrow="আজকের বিশেষ অফার"
          title="যাদের জন্য বিশেষ কিছু"
          subtitle="পরিবার, কাপল কিংবা দুপুরের কুইক লাঞ্চ — সবার জন্য আলাদা অফার।"
        />
        <Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
