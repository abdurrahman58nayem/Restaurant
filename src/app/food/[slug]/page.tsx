import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menu, foodBySlug } from "@/data/menu";
import { FoodDetailsClient } from "@/components/feature/FoodDetailsClient";

export function generateStaticParams() {
  return menu.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const food = foodBySlug(slug);
    if (!food) return { title: "খাবার পাওয়া যায়নি" };
    return {
      title: food.name,
      description: food.description,
      openGraph: { title: `${food.name} | NOORÉ`, description: food.description, images: [{ url: food.images[0] }] },
    };
  });
}

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = foodBySlug(slug);
  if (!food) notFound();
  return <FoodDetailsClient food={food} />;
}
