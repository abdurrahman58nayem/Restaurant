import type { JSX } from "react";

export type IconName =
  | "search" | "cart" | "menu" | "close" | "star" | "star-half" | "leaf" | "flame"
  | "bolt" | "bag" | "phone" | "pin" | "clock" | "whatsapp" | "arrow-right" | "plus"
  | "minus" | "trash" | "filter" | "chevron-down" | "chevron-left" | "chevron-right"
  | "instagram" | "facebook" | "youtube" | "check" | "users" | "calendar" | "home"
  | "info" | "sparkle" | "plate";

const paths: Record<IconName, JSX.Element> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  cart: <><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /><path d="M3 4h2l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" /></>,
  close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  star: <path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8L12 3z" />,
  "star-half": <><path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8L12 3z" /><path d="M12 3v14" /></>,
  leaf: <><path d="M4 20c8 0 16-4 16-16-10 0-16 6-16 12" /><path d="M4 20c0-4 2-8 6-10" /></>,
  flame: <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 1 1.5 1.8 1.5 1.8C10.5 7 11 5 12 3z" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  bag: <><path d="M6 7h12l1 14H5L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: <><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  whatsapp: <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.3 12.6c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.7-5c-.5-.9-.8-1.8-.6-2.4.2-.5.8-1.3 1.3-1.4.3-.1.6 0 .8.3l.9 1.7c.1.3.1.6-.1.8l-.6.8c-.2.2-.2.5 0 .8a8.7 8.7 0 0 0 3.4 3.2c.3.1.6.1.8-.1l.8-.8c.2-.2.5-.3.8-.2l1.8.9c.3.1.4.4.3.7z" />,
  "arrow-right": <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M6 7l1 14h10l1-14" /><path d="M10 11v6M14 11v6" /></>,
  filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></>,
  facebook: <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1z" />,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10.5 9.5 5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M3.5 20c.5-3.5 2.7-5.5 5.5-5.5s5 2 5.5 5.5" /><circle cx="17" cy="9.5" r="2.6" /><path d="M15.5 14.7c2.6.2 4.4 2 4.9 5.3" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17" /><path d="M8 3v4M16 3v4" /></>,
  home: <><path d="m4 11 8-7 8 7" /><path d="M6 9.5V20h12V9.5" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5" /><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />,
  plate: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /></>,
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = name === "whatsapp" || name === "facebook";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
