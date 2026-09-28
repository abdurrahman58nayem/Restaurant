export type CategoryId =
  | "starters"
  | "main-course"
  | "rice-biryani"
  | "burgers"
  | "pizza"
  | "pasta"
  | "chicken"
  | "seafood"
  | "desserts"
  | "beverages"
  | "coffee"
  | "combos";

export interface SizeOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Customization {
  /** Allow spice level selection (Mild / Medium / Spicy). */
  spice?: boolean;
  sizes?: SizeOption[];
  addOns?: AddOn[];
}

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percent
  images: string[];
  description: string;
  ingredients: string[];
  portion: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0 none, 1 mild, 2 medium, 3 spicy
  isVegetarian: boolean;
  isPopular: boolean;
  isBestseller: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  available: boolean;
  preparationTime: string;
  tags: string[];
  customization?: Customization;
}

export interface ComboItem {
  id: string;
  name: string;
  slug: string;
  includes: string[];
  price: number;
  originalPrice: number;
  image: string;
  persons?: string;
}

export interface OfferItem {
  id: string;
  name: string;
  persons: string;
  price: number;
  originalPrice: number;
  includes: string[];
  image: string;
  badge?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  area: string;
  rating: number;
  text: string;
  occasion: string;
}

export interface ChefItem {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  tag: "Food" | "Interior" | "Dining" | "Chef" | "Kitchen" | "Drinks" | "Events";
  wide?: boolean;
}

export interface CartLine {
  /** Unique line key — same food with a different customisation is a separate line. */
  key: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number; // base price with size + addons applied
  quantity: number;
  optionsLabel?: string;
}
