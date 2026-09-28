import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChefSection } from "@/components/sections/ChefSection";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const pillars = [
  { icon: "sparkle" as const, title: "Story", bn: "আমাদের গল্প", text: "NOORÉ-এর লক্ষ্য হলো quality food, thoughtful presentation এবং comfortable dining experience-এর মাধ্যমে প্রতিটি customer-এর জন্য একটি সুন্দর মুহূর্ত তৈরি করা।" },
  { icon: "leaf" as const, title: "Ingredients", bn: "উপকরণ", text: "প্রতিদিন বাছাই করা তাজা উপকরণ — স্বাদ আর সতেজতা দুটোই নিশ্চিত করতে।" },
  { icon: "flame" as const, title: "Chef", bn: "রান্নাঘর", text: "অভিজ্ঞ শেফদের হাতে দেশি-বিদেশি ফ্লেভারের নিখুঁত মিশেল।" },
  { icon: "users" as const, title: "Hospitality", bn: "আতিথেয়তা", text: "প্রতিটি অতিথি আমাদের পরিবার — যত্ন আর হাসিমুখই আমাদের পরিচয়।" },
];

export const metadata = {
  title: "আমাদের সম্পর্কে",
  description: "NOORÉ-এর গল্প, দর্শন এবং রান্নাঘরের মানুষগুলোর সাথে পরিচিত হোন।",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-charcoal-500 py-20 sm:py-28">
        <Image src="/images/ambience/interior-1.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500 via-charcoal-500/60 to-charcoal-500/30" />
        <div className="shell relative text-center">
          <span className="eyebrow text-gold-300">About NOORÉ</span>
          <h1 className="mx-auto mt-3 max-w-2xl font-bengali text-4xl font-bold text-ivory sm:text-5xl">খাবারের চেয়ে বেশি কিছু</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base">
            স্বাদের সাথে মুহূর্তের গল্প — আমরা বিশ্বাস করি একটি ভালো খাবার শুধু পেট ভরায় না, মনও ভরায়।
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Our Philosophy" title="যে চার স্তম্ভে NOORÉ" align="left" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-gold-500">{p.title}</p>
                  <h3 className="font-bengali text-lg font-bold text-charcoal-400">{p.bn}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal-100">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-200/60 py-14 sm:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lift">
              <Image src="/images/ambience/kitchen-1.jpg" alt="NOORÉ ওপেন কিচেন" fill sizes="50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">From Our Kitchen</span>
            <h2 className="mt-2 font-bengali text-3xl font-bold text-charcoal-400">প্রতিটি প্লেটে একটি গল্প</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-100">
              ভোরের বাজার থেকে বাছাই করা উপকরণ, দুপুরের ধোঁয়া ওঠা চুলা, আর সন্ধ্যায় আলোয় সাজানো টেবিল —
              NOORÉ-এর প্রতিটি দিন শুরু হয় একটি সহজ বিশ্বাস নিয়ে: অতিথি যেন বাড়ির মানুষের মতোই অনুভব করেন।
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
              আমাদের ওপেন কিচেনে আপনি নিজের চোখে দেখতে পারবেন খাবার তৈরির প্রতিটি ধাপ — কারণ স্বচ্ছতাই আমাদের ভরসা।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary px-6 py-3 text-sm">মেনু দেখুন</Link>
              <Link href="/reservation" className="btn-outline px-6 py-3 text-sm">টেবিল বুক করুন</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ChefSection />
    </>
  );
}
