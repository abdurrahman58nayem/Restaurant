"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ComboItem } from "@/lib/types";
import { foodBySlug } from "@/data/menu";
import { taka } from "@/lib/format";
import { buildLine, defaultOptions } from "@/lib/cartHelpers";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Icon } from "@/components/ui/Icon";

export function ComboCard({ combo }: { combo: ComboItem }) {
  const { addLine } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const save = combo.originalPrice - combo.price;

  const order = (goCheckout: boolean) => {
    const food = foodBySlug(combo.slug);
    if (food) {
      const { line, key } = buildLine(food, defaultOptions);
      addLine(line, key);
      toast(`${combo.name} Cart-এ যোগ হয়েছে।`);
    }
    if (goCheckout) router.push("/checkout");
  };

  return (
    <article className="card-surface group flex w-64 shrink-0 flex-col overflow-hidden sm:w-72">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={combo.image} alt={combo.name} fill sizes="(max-width:640px) 18rem, 20rem" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold text-charcoal-500">Save {taka(save)}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-bengali text-base font-bold text-charcoal-400">{combo.name}</h3>
          {combo.persons && <span className="text-[11px] text-charcoal-50">{combo.persons}</span>}
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {combo.includes.map((inc) => (
            <li key={inc} className="rounded-full bg-ivory-200 px-2.5 py-1 text-[10px] font-medium text-charcoal-100">{inc}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-lg font-bold text-clay-600">{taka(combo.price)}</p>
            <p className="text-xs text-charcoal-50 line-through">{taka(combo.originalPrice)}</p>
          </div>
          <button type="button" onClick={() => order(true)} className="btn-dark px-4 py-2 text-xs">
            <Icon name="bag" className="h-3.5 w-3.5" /> অর্ডার
          </button>
        </div>
      </div>
    </article>
  );
}
