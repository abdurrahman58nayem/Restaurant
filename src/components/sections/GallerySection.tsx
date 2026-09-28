"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { gallery } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function GallerySection({ limit }: { limit?: number }) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (dir: 1 | -1) => {
      setActive((a) => (a === null ? a : (a + dir + items.length) % items.length));
    },
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, move]);

  return (
    <section className="bg-ivory-200/60 py-14 sm:py-20" id="gallery">
      <div className="shell">
        <SectionHeading
          eyebrow="Gallery"
          title="আমাদের কিছু মুহূর্ত"
          subtitle="খাবার, পরিবেশ আর মানুষ — NOORÉ-এর গল্প ছবিতে।"
        />
        <Reveal>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  g.wide ? "col-span-2 aspect-[2/1]" : "aspect-square"
                }`}
                aria-label={`${g.alt} বড় করে দেখুন`}
              >
                <Image src={g.src} alt={g.alt} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-2 top-2 rounded-full bg-charcoal-500/60 px-2 py-0.5 text-[10px] font-semibold text-ivory backdrop-blur-sm">{g.tag}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-500/95 p-4" role="dialog" aria-modal="true" aria-label="গ্যালারি ছবি">
          <button type="button" onClick={close} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20" aria-label="বন্ধ করুন">
            <Icon name="close" />
          </button>
          <button type="button" onClick={() => move(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/10 p-2.5 text-ivory hover:bg-ivory/20 sm:left-6" aria-label="আগের ছবি">
            <Icon name="chevron-left" />
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image src={items[active].src} alt={items[active].alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => move(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ivory/10 p-2.5 text-ivory hover:bg-ivory/20 sm:right-6" aria-label="পরের ছবি">
            <Icon name="chevron-right" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-charcoal-400/70 px-4 py-1.5 text-xs text-ivory">
            {items[active].alt} • {active + 1}/{items.length}
          </p>
        </div>
      )}
    </section>
  );
}
