/**
 * WhatsApp contact — used by the floating button and every WhatsApp CTA.
 * Edit the number here once; all components read from this config.
 */
export const whatsapp = {
  /** Local format, used for display. */
  displayNumber: "01876892958",
  /** International format without '+', used for wa.me links. */
  internationalNumber: "8801876892958",
  ctaText: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।",
  prefillMessage:
    "আসসালামু আলাইকুম। আমি Restaurant Website Demo দেখে যোগাযোগ করছি। আমার Restaurant-এর জন্য এমন একটি Website তৈরি করতে চাই।",
} as const;

export function waLink(message: string = whatsapp.prefillMessage): string {
  return `https://wa.me/${whatsapp.internationalNumber}?text=${encodeURIComponent(message)}`;
}
