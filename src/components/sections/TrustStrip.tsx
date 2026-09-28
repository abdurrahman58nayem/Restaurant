import { restaurant } from "@/config/restaurant";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section className="border-b border-charcoal-400/8 bg-ivory-100">
      <div className="shell grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {restaurant.trustStrip.map((t, i) => (
          <Reveal key={t.title} delay={i * 90}>
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600 ring-1 ring-clay-500/15">
                <Icon name={t.icon as IconName} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-charcoal-400">{t.title}</p>
                <p className="text-xs text-charcoal-50">{t.subtitle}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
