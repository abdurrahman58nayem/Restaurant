import { site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function AnnouncementBar() {
  if (!site.announcement.enabled) return null;
  return (
    <div className="bg-charcoal-500 text-ivory">
      <div className="shell flex items-center justify-center gap-2 px-4 py-1.5 text-[11px] sm:text-xs">
        <Icon name="sparkle" className="h-3.5 w-3.5 text-gold-300" />
        <span className="font-medium tracking-wide">{site.announcement.text}</span>
        <span className="hidden text-ivory/50 sm:inline">•</span>
        <span className="hidden text-ivory/70 sm:inline">{site.announcement.secondary}</span>
      </div>
    </div>
  );
}
