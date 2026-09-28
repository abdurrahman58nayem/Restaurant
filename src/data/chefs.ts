import type { ChefItem } from "@/lib/types";

/** Fictional chef profiles — no real persons. */
export const chefs: ChefItem[] = [
  {
    id: "ch-01", name: "Chef Arif Rahman", role: "Head Chef",
    specialty: "Contemporary Bangladeshi & Grill",
    bio: "১৫ বছরের অভিজ্ঞতায় দেশি-বিদেশি ফ্লেভারের নিখুঁত মিশেল।",
    image: "/images/chefs/chef-arif.jpg",
  },
  {
    id: "ch-02", name: "Chef Nabila Khan", role: "Pastry Chef",
    specialty: "Desserts & Artisan Bakes",
    bio: "প্রতিটি ডেজার্টে গল্প বোনার কারিগর, প্যারিস-ট্রেনড পেস্ট্রি শেফ।",
    image: "/images/chefs/chef-nabila.jpg",
  },
  {
    id: "ch-03", name: "Chef Imran Chowdhury", role: "Sous Chef",
    specialty: "Wood-fired Pizza & Pasta",
    bio: "ইতালিয়ান টেকনিকে দেশি উপকরণের প্রাণবন্ত রান্না।",
    image: "/images/chefs/chef-imran.jpg",
  },
];
