# NOORÉ — Premium Restaurant Website Demo

**স্বাদের সাথে মুহূর্তের গল্প**

A premium, mobile-first, conversion-focused restaurant website demo for the Bangladesh market —
built from scratch by **CodePixel Web** as a client-facing demonstration for restaurants, cafés,
bakeries, fast food, fine dining, cloud kitchens and food brands.

> This is a **frontend demo**. There is no real payment gateway, POS, kitchen management,
> courier API, database, authentication or reservation backend — but the architecture is
> designed so each of those can be integrated later with minimal changes.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** with a custom brand token system
- Self-hosted fonts via **Fontsource** (Cormorant Garamond, Noto Serif Bengali, Hind Siliguri)
- Zero unnecessary runtime dependencies
- Vercel-ready (static/SSG output, `next/image` optimisation)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run typecheck
```

## Project structure

```
src/
├── app/            # routes: /, /menu, /food/[slug], /cart, /checkout,
│                   # /order-success, /reservation, /about, /offers,
│                   # /gallery, /contact, /search
├── components/
│   ├── layout/     # AnnouncementBar, Header, MobileMenu, MobileBottomNav, Footer, WhatsAppButton
│   ├── sections/   # Hero, TrustStrip, Categories, Popular, Combos, Offers, Desserts,
│   │               # Beverages, Experience, Chefs, Reviews, Gallery, Social, Info
│   ├── food/       # FoodCard, FoodGrid, CategoryScroller, ComboCard, OfferCard
│   ├── feature/    # SearchOverlay, MenuClient (filters/sort/drawer), FoodDetailsClient
│   └── ui/         # Icon, Rating, QtyControl, SectionHeading, Reveal
├── config/         # site, restaurant, whatsapp, delivery, social, nav  ← edit per client
├── context/        # CartContext (localStorage), ToastContext
├── data/           # menu (54 items), categories, combos, offers, reviews, chefs, gallery, faqs
└── lib/            # types, format helpers, cart helpers
```

## Customising for a real client

Everything business-specific lives in `src/config/*`:

| File | Controls |
| --- | --- |
| `config/site.ts` | brand name, tagline, announcement bar, SEO/OG |
| `config/restaurant.ts` | phone, email, address, opening hours, trust strip |
| `config/whatsapp.ts` | WhatsApp number + CTA text + prefilled message |
| `config/delivery.ts` | delivery charges (inside/outside Dhaka), offer threshold |
| `config/social.ts` | social links |
| `config/nav.ts` | primary navigation |

Menu data is centralised in `src/data/menu.ts` (single source of truth — no duplicated
hardcoding). Replace images under `public/images/` to rebrand.

## Demo flows

- **Order:** Homepage → Menu → Category → Food details (customisation) → Add to cart /
  Order now → Cart → Checkout (COD / demo online) → Order confirmation (`#NRE-xxxxx`)
- **Reservation:** Homepage → Reservation → confirmation message
- **Contact:** Location → Google Maps / Call / floating WhatsApp CTA

## Deploying to Vercel

Push this repo to GitHub and import it in Vercel — the default Next.js preset works
(`npm run build` / `next start` are already configured). No environment variables required.

---

*Demo Website by **CodePixel Web** — This is a demonstration website created by CodePixel Web.*
