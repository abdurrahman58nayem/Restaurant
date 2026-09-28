/**
 * Restaurant identity + operation details. Everything here is editable per client.
 */
export const restaurant = {
  name: "NOORÉ",
  tagline: "স্বাদের সাথে মুহূর্তের গল্প",
  phone: "+8801876892958",
  phoneDisplay: "01876-892958",
  email: "hello@noore.demo",
  address: {
    line1: "House 42, Road 27, Dhanmondi",
    line2: "Dhaka 1209, Bangladesh",
    short: "Dhanmondi, Dhaka, Bangladesh",
  },
  mapsLink: "https://maps.google.com/?q=Dhanmondi,+Dhaka,+Bangladesh",
  openingHours: [
    { days: "শনিবার – বৃহস্পতিবার", en: "Saturday – Thursday", hours: "11:00 AM – 11:00 PM" },
    { days: "শুক্রবার", en: "Friday", hours: "2:00 PM – 11:00 PM" },
  ],
  /** Configurable trust strip shown under the hero. */
  trustStrip: [
    { icon: "leaf", title: "Fresh Ingredients", subtitle: "বাছাই করা উপকরণ" },
    { icon: "flame", title: "Made Fresh", subtitle: "অর্ডার অনুযায়ী প্রস্তুত" },
    { icon: "bolt", title: "Fast Service", subtitle: "দ্রুত সার্ভিস" },
    { icon: "bag", title: "Easy Ordering", subtitle: "সহজে অর্ডার করুন" },
  ],
} as const;

export type TrustIcon = (typeof restaurant.trustStrip)[number]["icon"];
