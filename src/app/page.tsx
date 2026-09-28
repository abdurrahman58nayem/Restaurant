import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategorySection } from "@/components/sections/CategorySection";
import { PopularFoods } from "@/components/sections/PopularFoods";
import { ComboSection } from "@/components/sections/ComboSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { DessertSection } from "@/components/sections/DessertSection";
import { BeverageSection } from "@/components/sections/BeverageSection";
import { ChefSection } from "@/components/sections/ChefSection";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SocialSection } from "@/components/sections/SocialSection";
import { InfoSection } from "@/components/sections/InfoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategorySection />
      <PopularFoods />
      <ComboSection />
      <OfferSection />
      <ExperienceSection />
      <DessertSection />
      <BeverageSection />
      <ChefSection />
      <ReviewSection />
      <GallerySection limit={8} />
      <SocialSection />
      <InfoSection />
    </>
  );
}
