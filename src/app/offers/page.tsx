import { OfferSection } from "@/components/sections/OfferSection";
import { ComboSection } from "@/components/sections/ComboSection";

export const metadata = {
  title: "অফার",
  description: "NOORÉ-এর চলমান অফার ও কম্বো ডিল — Family Feast, Couple Dinner, Lunch Combo।",
};

export default function OffersPage() {
  return (
    <>
      <OfferSection />
      <ComboSection />
    </>
  );
}
