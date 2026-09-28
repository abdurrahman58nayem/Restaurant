export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`mb-8 flex flex-col gap-2 sm:mb-10 ${alignCls}`}>
      {eyebrow && <span className={`eyebrow ${light ? "text-gold-300" : ""}`}>{eyebrow}</span>}
      <h2 className={`section-title ${light ? "text-ivory" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${light ? "text-ivory/70" : "text-charcoal-100"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
