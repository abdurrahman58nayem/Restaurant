import { Suspense } from "react";
import type { Metadata } from "next";
import { MenuClient } from "@/components/feature/MenuClient";

export const metadata: Metadata = {
  title: "আমাদের মেনু",
  description: "NOORÉ-এর সম্পূর্ণ মেনু — বিরিয়ানি, বার্গার, পিজ্জা, পাস্তা, ডেজার্ট ও আরও অনেক কিছু।",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="shell py-20 text-center text-sm text-charcoal-50">লোড হচ্ছে…</div>}>
      <MenuClient />
    </Suspense>
  );
}
