/**
 * Global site configuration — single source of truth for brand + SEO.
 */
export const site = {
  name: "NOORÉ",
  tagline: "স্বাদের সাথে মুহূর্তের গল্প",
  legalName: "NOORÉ Restaurant & Café",
  agency: "CodePixel Web",
  agencyNote: "This is a demonstration website created by CodePixel Web.",
  locale: "bn-BD",
  metadata: {
    title: "NOORÉ — Premium Restaurant & Dining Experience",
    description:
      "NOORÉ is a premium restaurant website demo created by CodePixel Web for the Bangladesh market.",
    ogImage: "/images/brand/og.jpg",
  },
  /** Top announcement bar (configurable). */
  announcement: {
    enabled: true,
    text: "আজকের বিশেষ অফার — Selected Meals-এ বিশেষ মূল্য",
    secondary: "Dine-in • Takeaway • Home Delivery",
  },
} as const;
