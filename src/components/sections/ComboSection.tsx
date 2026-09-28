import { combos } from "@/data/combos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComboCard } from "@/components/food/ComboCard";
import { Reveal } from "@/components/ui/Reveal";

export function ComboSection() {
  return (
    <section className="bg-cocoa-400 py-14 sm:py-20" id="combos">
      <div className="shell">
        <SectionHeading
          light
          eyebrow="Combo & Meal Deals"
          title="একসাথে নিলে আরও ভালো"
          subtitle="প্রিয় কম্বোগুলো একসাথে — দামেও সাশ্রয়, স্বাদেও ভরপুর।"
        />
        <Reveal>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {combos.map((c) => (
              <ComboCard key={c.id} combo={c} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
