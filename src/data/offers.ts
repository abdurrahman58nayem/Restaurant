import type { OfferItem } from "@/lib/types";

/** Promotional offers shown on the homepage and offers page. */
export const offers: OfferItem[] = [
  {
    id: "o-01", name: "Family Feast", persons: "4 Persons",
    price: 1490, originalPrice: 1890,
    includes: ["২টি মেইন কোর্স", "১টি বিরিয়ানি", "৪টি ড্রিঙ্কস", "১টি ডেজার্ট"],
    image: "/images/food/family-feast.jpg", badge: "Family Favourite",
  },
  {
    id: "o-02", name: "Couple Dinner", persons: "2 Persons",
    price: 899, originalPrice: 1150,
    includes: ["২টি মেইন কোর্স", "২টি ড্রিঙ্কস", "১টি ডেজার্ট"],
    image: "/images/food/couple-dinner.jpg", badge: "Date Night",
  },
  {
    id: "o-03", name: "Lunch Combo", persons: "1 Person",
    price: 399, originalPrice: 480,
    includes: ["১টি মেইন কোর্স", "রাইস/বিরিয়ানি", "১টি ড্রিঙ্ক"],
    image: "/images/food/lunch-combo.jpg", badge: "Weekday Lunch",
  },
];
