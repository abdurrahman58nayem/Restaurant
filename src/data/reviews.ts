import type { ReviewItem } from "@/lib/types";

/**
 * Fictional demo reviews — clearly sample content, never presented as verified.
 */
export const reviews: ReviewItem[] = [
  {
    id: "r-01", name: "তানভীর আহমেদ", area: "ধানমন্ডি, ঢাকা", rating: 5,
    text: "খাবারের presentation এবং taste দুটোই দারুণ লেগেছে।", occasion: "Family Dinner",
  },
  {
    id: "r-02", name: "সাবরিনা হক", area: "গুলশান, ঢাকা", rating: 5,
    text: "Family dinner-এর জন্য পরিবেশটা খুব সুন্দর। স্টাফরাও যত্নশীল।", occasion: "Family Dinner",
  },
  {
    id: "r-03", name: "রাফি চৌধুরী", area: "বনানী, ঢাকা", rating: 4,
    text: "বিরিয়ানি আর ডেজার্ট অসাধারণ। ডেলিভারিও সময়মতো পেয়েছি।", occasion: "Home Delivery",
  },
  {
    id: "r-04", name: "মেহজাবিন ইসলাম", area: "উত্তরা, ঢাকা", rating: 5,
    text: "কফি আর লাভা কেকের কম্বোটা আমার প্রতি সপ্তাহের routine হয়ে গেছে।", occasion: "Café Visit",
  },
  {
    id: "r-05", name: "নাজমুল হাসান", area: "মিরপুর, ঢাকা", rating: 4,
    text: "অফিসের টিম নিয়ে এসেছিলাম, সবাই খাবারের প্রশংসা করেছে।", occasion: "Team Lunch",
  },
];
