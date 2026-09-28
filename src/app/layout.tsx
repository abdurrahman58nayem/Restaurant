import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/noto-serif-bengali/400.css";
import "@fontsource/noto-serif-bengali/600.css";
import "@fontsource/noto-serif-bengali/700.css";
import "@fontsource/noto-serif-bengali/800.css";
import "@fontsource/hind-siliguri/300.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noore-demo.vercel.app"),
  title: {
    default: site.metadata.title,
    template: `%s | ${site.name}`,
  },
  description: site.metadata.description,
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    images: [{ url: site.metadata.ogImage, width: 1600, height: 900 }],
    type: "website",
    locale: "bn_BD",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1C1A17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className="bg-ivory text-charcoal-400 font-body">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal-400 focus:px-4 focus:py-2 focus:text-ivory"
          >
            মূল কনটেন্টে যান
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {/* spacer so the fixed mobile bottom nav never covers footer content */}
          <div className="h-14 bg-charcoal-500 lg:hidden" aria-hidden="true" />
          <MobileBottomNav />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
