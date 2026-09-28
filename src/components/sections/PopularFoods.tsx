import Link from "next/link";
import { popularFoods } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FoodGrid } from "@/components/food/FoodGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function PopularFoods() {
  return (
    <section className="bg-ivory-200/60 py-14 sm:py-20" id="popular">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Customer Favourites"
            title="আজকের জনপ্রিয় খাবার"
            subtitle="সবচেয়ে বেশি অর্ডার হওয়া বাছাই করা আইটেমগুলো।"
            align="left"
          />
          <Link href="/menu" className="btn-outline mb-8 px-5 py-2.5 text-xs sm:mb-10">
            সব মেনু দেখুন <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Reveal>
          <FoodGrid foods={popularFoods} />
        </Reveal>
      </div>
    </section>
  );
}
