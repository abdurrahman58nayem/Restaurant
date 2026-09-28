import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export function CategoryScroller() {
  return (
    <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/menu?cat=${c.id}`}
          className="group relative w-32 shrink-0 overflow-hidden rounded-xl sm:w-40"
          aria-label={c.label}
        >
          <div className="relative aspect-square overflow-hidden bg-ivory-200">
            <Image
              src={c.image}
              alt={c.label}
              fill
              sizes="(max-width: 640px) 8rem, 10rem"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/80 via-charcoal-500/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-bengali text-sm font-bold text-ivory">{c.label}</p>
              <p className="text-[10px] uppercase tracking-wider text-ivory/70">{c.en}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
