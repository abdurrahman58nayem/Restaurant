import type { ComboItem } from "@/lib/types";

/** Combo / meal deals — central data, rendered as horizontal scroll cards. */
export const combos: ComboItem[] = [
  {
    id: "c-01", name: "Burger Combo", slug: "burger-combo",
    includes: ["বার্গার", "ফ্রেঞ্চ ফ্রাইস", "ড্রিঙ্ক"],
    price: 549, originalPrice: 650, image: "/images/food/burger-combo.jpg", persons: "১ জন",
  },
  {
    id: "c-02", name: "Biryani Combo", slug: "biryani-combo",
    includes: ["বিরিয়ানি", "চিকেন", "ড্রিঙ্ক"],
    price: 499, originalPrice: 590, image: "/images/food/biryani-combo.jpg", persons: "১ জন",
  },
  {
    id: "c-03", name: "Pizza Combo", slug: "pizza-combo",
    includes: ["পিজ্জা", "চিকেন উইংস", "২ ড্রিঙ্কস"],
    price: 799, originalPrice: 950, image: "/images/food/pizza-combo.jpg", persons: "২ জন",
  },
  {
    id: "c-04", name: "Pasta Combo", slug: "pasta-combo",
    includes: ["পাস্তা", "গারলিক ব্রেড", "ড্রিঙ্ক"],
    price: 549, originalPrice: 640, image: "/images/food/pasta-combo.jpg", persons: "১–২ জন",
  },
];
