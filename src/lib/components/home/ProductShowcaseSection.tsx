import Image from "next/image";
import SectionHeading from "@/lib/components/home/SectionHeading";
import type { ShopCardProduct } from "@/lib/types/storefront";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductShowcaseSection({
  title,
  subtitle,
  action,
  products,
  fallbackImage,
}: {
  title: string;
  subtitle: string;
  action: string;
  products: ShopCardProduct[];
  fallbackImage?: string;
}) {
  return (
    <section className="reveal w-full" data-reveal>
      <SectionHeading title={title} subtitle={subtitle} action={action} />
      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
        {products.map((item) => (
          <article
            key={item.id ?? item.title}
            className="group overflow-hidden rounded-xl border border-(--border) bg-(--surface) transition duration-300 hover:-translate-y-1 md:rounded-2xl"
          >
            <div className="relative h-36 overflow-hidden md:h-52">
              {item.image || fallbackImage ? (
                <Image
                  src={item.image || fallbackImage || ""}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-(--surface-strong) text-xs text-(--muted)">
                  No image
                </div>
              )}
              <div className="absolute left-2 top-2 rounded-full bg-(--accent) px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white md:left-3 md:top-3 md:px-2 md:py-1 md:text-[10px]">
                {item.discount ?? "Popular"}
              </div>
            </div>
            <div className="space-y-1.5 p-3 md:space-y-2 md:p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-(--muted) md:text-[11px] md:tracking-[0.22em]">{item.category}</p>
              <h3 className="text-sm font-semibold text-(--app-fg) md:text-base">{item.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-(--app-fg) md:text-base">{formatPrice(item.price)}</span>
                {item.strike ? (
                  <span className="text-xs text-(--muted) line-through">{formatPrice(item.strike)}</span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
