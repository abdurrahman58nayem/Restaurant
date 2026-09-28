import { waLink, whatsapp } from "@/config/whatsapp";
import { Icon } from "@/components/ui/Icon";

/**
 * Floating WhatsApp CTA — number & text come from /config/whatsapp.
 */
export function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-20 right-4 z-40 flex items-center gap-2.5 rounded-full bg-[#1FAF57] py-2.5 pl-3 pr-4 text-ivory shadow-lift transition-transform hover:-translate-y-0.5 lg:bottom-6 lg:right-6"
      aria-label={`WhatsApp-এ মেসেজ দিন: ${whatsapp.ctaText}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/15">
        <Icon name="whatsapp" className="h-5 w-5" />
      </span>
      <span className="max-w-[9.5rem] text-[11px] font-semibold leading-snug sm:max-w-none">
        {whatsapp.ctaText}
      </span>
    </a>
  );
}
