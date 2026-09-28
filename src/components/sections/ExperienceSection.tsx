import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const experiences = [
  { title: "Great Food", bn: "দারুণ খাবার", img: "/images/food/chicken-steak.jpg", text: "প্রতিটি প্লেটে বাছাই করা উপকরণ ও নিখুঁত রান্না।" },
  { title: "Beautiful Ambience", bn: "সুন্দর পরিবেশ", img: "/images/ambience/interior-1.jpg", text: "উষ্ণ আলো আর আরামদায়ক বসার ব্যবস্থা।" },
  { title: "Friendly Service", bn: "আন্তরিক সার্ভিস", img: "/images/ambience/dining-1.jpg", text: "যত্নশীল টিম, প্রতিটি অতিথির জন্য।" },
  { title: "Memorable Moments", bn: "স্মরণীয় মুহূর্ত", img: "/images/ambience/event-1.jpg", text: "পরিবার ও বন্ধুদের সাথে উদযাপনের জায়গা।" },
];

export function ExperienceSection() {
  return (
    <section className="bg-charcoal-500 py-14 sm:py-20" id="experience">
      <div className="shell">
        <SectionHeading
          light
          eyebrow="The NOORÉ Experience"
          title="খাবারের চেয়ে বেশি কিছু"
          subtitle="শুধু পেট ভরানো নয় — একটি সম্পূর্ণ অভিজ্ঞতা।"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 90}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={e.img} alt={e.bn} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/85 via-charcoal-500/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-300">{e.title}</p>
                  <p className="font-bengali text-base font-bold text-ivory">{e.bn}</p>
                  <p className="mt-1 hidden text-xs leading-relaxed text-ivory/75 sm:block">{e.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
