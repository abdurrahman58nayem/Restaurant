import { desserts } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FoodCard } from "@/components/food/FoodCard";
import { Reveal } from "@/components/ui/Reveal";

export function DessertSection() {
  return (
    <section className="bg-[#FBF3EA] py-14 sm:py-20" id="desserts">
      <div className="shell">
        <SectionHeading
          eyebrow="Desserts"
          title="শেষটা হোক মিষ্টি"
          subtitle="হাতের তৈরি ডেজার্ট — প্রতিটি কামড়ে একটু আদর।"
          align="left"
        />
        <Reveal>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:px-0">
            {desserts.slice(0, 6).map((f) => (
              <div key={f.id} className="w-60 shrink-0 sm:w-72 lg:w-auto">
                <FoodCard food={f} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
