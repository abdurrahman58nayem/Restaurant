import Image from "next/image";
import type { OfferItem } from "@/lib/types";
import { taka } from "@/lib/format";
import { waLink } from "@/config/whatsapp";
import { Icon } from "@/components/ui/Icon";

export function OfferCard({ offer }: { offer: OfferItem }) {
  const save = offer.originalPrice - offer.price;
  const orderHref = waLink(`আসসালামু আলাইকুম। আমি "${offer.name}" (${offer.persons}) অফারটি অর্ডার করতে চাই।`);
  return (
    <article className="card-surface group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={offer.image} alt={offer.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/70 to-transparent" />
        {offer.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold text-charcoal-500">{offer.badge}</span>
        )}
        <div className="absolute bottom-3 left-3">
          <h3 className="font-bengali text-lg font-bold text-ivory">{offer.name}</h3>
          <p className="text-xs text-ivory/80">{offer.persons}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <ul className="space-y-1.5">
          {offer.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-2 text-xs text-charcoal-100">
              <Icon name="check" className="h-3.5 w-3.5 text-leaf" /> {inc}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-charcoal-400/10 pt-3">
          <div>
            <p className="text-xl font-bold text-clay-600">{taka(offer.price)}</p>
            <p className="text-xs text-charcoal-50">
              <span className="line-through">{taka(offer.originalPrice)}</span>{" "}
              <span className="ml-1 font-semibold text-leaf">Save {taka(save)}</span>
            </p>
          </div>
          <a href={orderHref} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-xs">
            অর্ডার করুন
          </a>
        </div>
      </div>
    </article>
  );
}
