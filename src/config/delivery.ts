/**
 * Delivery + ordering configuration. Change values here for a real client project.
 */
export const delivery = {
  charges: {
    insideDhaka: 70,
    outsideDhaka: 130,
  },
  areas: ["inside", "outside"] as const,
  freeDeliveryThreshold: 1500, // demo offer progress bar target
  offerProgressHint: "আর {amount} অর্ডার করলে আপনি একটি বিশেষ delivery offer পেতে পারেন।",
  estimatedPreparation: "৩–৪৫ মিনিট",
  estimatedDelivery: { inside: "৪–৬০ মিনিট", outside: "২–৩ ঘণ্টা" },
  minimumOrder: 0,
} as const;

export type DeliveryArea = (typeof delivery.areas)[number];

export function deliveryChargeFor(area: DeliveryArea): number {
  return area === "inside" ? delivery.charges.insideDhaka : delivery.charges.outsideDhaka;
}
