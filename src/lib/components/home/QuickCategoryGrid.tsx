import Image from "next/image";
import type { QuickCategory } from "@/lib/types/storefront";

export default function QuickCategoryGrid({
  items,
}: {
  items?: QuickCategory[];
}) {
  const displayedItems = items ?? [];

  if (displayedItems.length === 0) {
    return null;
  }

  return (
    <section className="reveal w-full" data-reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayedItems.map((item) => (
          <article key={item.title} className="group relative overflow-hidden rounded-2xl bg-(--surface)">
            <div className="relative h-40">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/35" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/90">{item.subtitle}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
