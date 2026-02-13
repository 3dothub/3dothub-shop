import Image from "next/image";
import SectionHeading from "@/lib/components/home/SectionHeading";
import type { OccasionCard, RecipientCard } from "@/lib/types/storefront";

export default function OccasionRecipientSection({
  cards,
  recipientCards,
  trustStats,
}: {
  cards?: OccasionCard[];
  recipientCards?: RecipientCard[];
  trustStats?: string[];
}) {
  const displayedCards = cards ?? [];
  const displayedRecipientCards = recipientCards ?? [];
  const displayedTrustStats = trustStats ?? [];
  const cardGridClass =
    displayedCards.length <= 1
      ? "md:grid-cols-1"
      : displayedCards.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";
    
  return (
    <section className="reveal w-full" data-reveal>
      <SectionHeading
        title="Special Occasions"
        subtitle="Make your milestones unforgettable with specially curated collections."
      />

      <div className={`mt-6 grid gap-4 ${cardGridClass}`}>
        {displayedCards.map((item) => (
          <article key={item.title} className="group overflow-hidden rounded-2xl border border-(--border) bg-(--surface)">
            <div className="relative h-44">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/35" />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-base font-semibold text-(--app-fg)">{item.title}</p>
              <p className="text-sm text-(--muted)">{item.caption}</p>
              <button className="text-xs uppercase tracking-[0.24em] text-(--accent)">
                {item.cta}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-6">
        <p className="text-sm font-semibold text-(--app-fg)">Shop by Recipient</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {displayedRecipientCards.map((item) => (
            <article
              key={item.label}
              className="group overflow-hidden rounded-xl border border-(--border) bg-(--surface-strong)"
            >
              <div className="relative h-24">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
              <p className="p-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-(--app-fg)">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2 rounded-2xl bg-(--surface-strong) p-4 text-xs text-(--muted) md:grid-cols-4">
        {displayedTrustStats.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}
