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
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <article
            key={item.id ?? item.title}
            className="group overflow-hidden rounded-2xl border border-(--border) bg-(--surface) transition duration-300 hover:-translate-y-1"
          >
            <div className="relative h-52 overflow-hidden">
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
              <div className="absolute left-3 top-3 rounded-full bg-(--accent) px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                {item.discount ?? "Popular"}
              </div>
            </div>
            <div className="space-y-2 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-(--muted)">{item.category}</p>
              <h3 className="text-base font-semibold text-(--app-fg)">{item.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-(--app-fg)">{formatPrice(item.price)}</span>
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
