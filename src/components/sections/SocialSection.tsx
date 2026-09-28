import Image from "next/image";
import { social } from "@/config/social";
import { gallery } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";

export function SocialSection() {
  const tiles = gallery.filter((g) => g.tag === "Food" || g.tag === "Drinks").slice(0, 6);
  return (
    <section className="py-14 sm:py-20" id="social">
      <div className="shell">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">@noore.dhaka</span>
          <h2 className="section-title">Follow Our Food Journey</h2>
          <p className="max-w-md text-sm text-charcoal-100">প্রতিদিনের তাজা খাবার আর পেছনের গল্প — Instagram-এ।</p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
          {tiles.map((t) => (
            <a key={t.id} href={social.instagram} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-lg" aria-label="Instagram-এ দেখুন">
              <Image src={t.src} alt={t.alt} fill sizes="(max-width:640px) 33vw, 16vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <span className="absolute inset-0 flex items-center justify-center bg-charcoal-500/0 text-ivory opacity-0 transition group-hover:bg-charcoal-500/40 group-hover:opacity-100">
                <Icon name="instagram" className="h-6 w-6" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-7 text-center">
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 text-sm">
            <Icon name="instagram" className="h-4 w-4" /> Instagram দেখুন
          </a>
        </div>
      </div>
    </section>
  );
}
