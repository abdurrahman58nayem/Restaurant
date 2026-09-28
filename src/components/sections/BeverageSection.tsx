import { beverages } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FoodCard } from "@/components/food/FoodCard";
import { Reveal } from "@/components/ui/Reveal";

export function BeverageSection() {
  return (
    <section className="bg-cocoa-500 py-14 sm:py-20" id="cafe">
      <div className="shell">
        <SectionHeading
          light
          eyebrow="Café & Beverages"
          title="এক কাপ ভালো সময়"
          subtitle="কফি, মোহিতো আর শেক — café-style মুহূর্তের জন্য।"
        />
        <Reveal>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:px-0">
            {beverages.slice(0, 8).map((f) => (
              <div key={f.id} className="w-56 shrink-0 sm:w-64 lg:w-auto">
                <FoodCard food={f} compact />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
