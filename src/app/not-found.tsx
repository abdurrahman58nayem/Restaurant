import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center gap-4 py-24 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
        <Icon name="plate" className="h-9 w-9 text-charcoal-400/40" />
      </span>
      <p className="font-display text-5xl font-semibold text-charcoal-400">404</p>
      <h1 className="font-bengali text-2xl font-bold text-charcoal-400">পেজটি পাওয়া যায়নি</h1>
      <p className="max-w-xs text-sm text-charcoal-50">আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে বা নেই। মেনু থেকে খাবার দেখতে পারেন।</p>
      <div className="mt-2 flex gap-3">
        <Link href="/" className="btn-primary px-6 py-3 text-sm">হোম</Link>
        <Link href="/menu" className="btn-outline px-6 py-3 text-sm">মেনু</Link>
      </div>
    </div>
  );
}
