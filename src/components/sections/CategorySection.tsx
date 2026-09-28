import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryScroller } from "@/components/food/CategoryScroller";
import { Reveal } from "@/components/ui/Reveal";

export function CategorySection() {
  return (
    <section className="py-14 sm:py-20" id="categories">
      <div className="shell">
        <SectionHeading
          eyebrow="আমাদের মেনু"
          title="যা খুশি বেছে নিন"
          subtitle="স্টার্টার থেকে ডেজার্ট — প্রতিটি ক্যাটাগরিতে বাছাই করা খাবার।"
          align="left"
        />
        <Reveal>
          <CategoryScroller />
        </Reveal>
      </div>
    </section>
  );
}
