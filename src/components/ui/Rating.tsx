import { Icon } from "@/components/ui/Icon";

export function Rating({
  value,
  count,
  light = false,
  className = "",
}: {
  value: number;
  count?: number;
  light?: boolean;
  className?: string;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.4;
  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`রেটিং ${value} / 5`}
      role="img"
    >
      <span className="inline-flex items-center gap-0.5 text-gold-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name={i < full ? "star" : i === full && hasHalf ? "star-half" : "star"}
            className={`h-3.5 w-3.5 ${i < full || (i === full && hasHalf) ? "" : "opacity-25"}`}
            strokeWidth={1.4}
          />
        ))}
      </span>
      <span className={`text-xs font-semibold ${light ? "text-ivory/80" : "text-charcoal-100"}`}>
        {value.toFixed(1)}
      </span>
      {typeof count === "number" && (
        <span className={`text-xs ${light ? "text-ivory/60" : "text-charcoal-50"}`}>({count})</span>
      )}
    </span>
  );
}
