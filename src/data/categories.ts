import type { CategoryId } from "@/lib/types";

export interface Category {
  id: CategoryId;
  label: string; // Bengali
  en: string; // English label
  image: string; // representative food image
  /** Section background tone so each food family sits on a compatible colour grade. */
  tone: "earthy" | "dark" | "soft" | "brown" | "fresh" | "cool";
  blurb: string;
}

export const categories: Category[] = [
  { id: "starters", label: "স্টার্টার্স", en: "Starters", image: "/images/food/honey-chili-wings.jpg", tone: "dark", blurb: "শুরুটা হোক দারুণ" },
  { id: "main-course", label: "মেইন কোর্স", en: "Main Course", image: "/images/food/chicken-steak.jpg", tone: "dark", blurb: "মন ভরানো প্রধান খাবার" },
  { id: "rice-biryani", label: "রাইস ও বিরিয়ানি", en: "Rice & Biryani", image: "/images/food/chicken-biryani.jpg", tone: "earthy", blurb: "সুবাসে ভরা প্রতিটি দানা" },
  { id: "burgers", label: "বার্গার", en: "Burgers", image: "/images/food/smoky-beef-burger.jpg", tone: "dark", blurb: "জুসি প্যাটি, নরম বান" },
  { id: "pizza", label: "পিজ্জা", en: "Pizza", image: "/images/food/bbq-chicken-pizza.jpg", tone: "earthy", blurb: "কাঠের চুলার ঘ্রাণ" },
  { id: "pasta", label: "পাস্তা", en: "Pasta", image: "/images/food/creamy-alfredo-pasta.jpg", tone: "soft", blurb: "ক্রিমি ও কমফোর্টিং" },
  { id: "chicken", label: "চিকেন", en: "Chicken", image: "/images/food/crispy-fried-chicken.jpg", tone: "dark", blurb: "ক্রিসপি থেকে গ্রিল" },
  { id: "seafood", label: "সিফুড", en: "Seafood", image: "/images/food/garlic-butter-prawn.jpg", tone: "cool", blurb: "তাজা ও নিখুঁত রান্না" },
  { id: "desserts", label: "ডেজার্ট", en: "Desserts", image: "/images/food/chocolate-lava-cake.jpg", tone: "soft", blurb: "শেষটা হোক মিষ্টি" },
  { id: "beverages", label: "বেভারেজ", en: "Beverages", image: "/images/food/blue-mojito.jpg", tone: "fresh", blurb: "এক চুমুক সতেজতা" },
  { id: "coffee", label: "কফি", en: "Coffee", image: "/images/food/cappuccino.jpg", tone: "brown", blurb: "এক কাপ ভালো সময়" },
  { id: "combos", label: "স্পেশাল কম্বো", en: "Special Combos", image: "/images/food/burger-combo.jpg", tone: "earthy", blurb: "একসাথে নিলে আরও ভালো" },
];

export function categoryById(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}
