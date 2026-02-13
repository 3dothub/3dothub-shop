import Image from "next/image";
import type { ComboProduct } from "@/lib/types/storefront";
import { WalletOutlined } from "@ant-design/icons";

export default function ComboBudgetCategorySection({
  comboProducts,
  budgetFilters,
  personalized,
  corporate,
}: {
  comboProducts?: ComboProduct[];
  budgetFilters?: string[];
  personalized?: string[];
  corporate?: string[];
}) {
  const displayedComboProducts = comboProducts ?? [];
  const displayedBudgetFilters = budgetFilters ?? [];
  const personalizedItems = personalized ?? [];
  const corporateItems = corporate ?? [];

  return (
    <section className="reveal w-full space-y-5" data-reveal>
      <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
        <div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-(--accent)">Valentine&apos;s Exclusive</p>
            <h3 className="mt-2 text-2xl font-semibold text-(--app-fg)">Valentine&apos;s Special Combos!</h3>
            <p className="mt-2 text-sm text-(--muted)">
              Double the joy with hand-picked combo sets and exclusive designs.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            {displayedComboProducts.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-xl border border-(--border) bg-(--surface-strong)">
                <div className="relative h-24">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-2 text-center">
                  <p className="text-xs font-semibold text-(--app-fg)">{item.title}</p>
                  <p className="text-xs text-(--muted)">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
        <div className="text-center">
          <p className="inline-flex items-center justify-center gap-2 text-3xl font-bold text-(--app-fg) md:text-5xl">
            <WalletOutlined className="text-(--accent)" />
            <span>Find Gifts by Budget</span>
          </p>
          <p className="mt-2 text-lg font-medium text-(--muted) md:text-xl">Quick picks that fit your pocket</p>
          <div className="mx-auto mt-3 h-px w-20 bg-(--accent)" />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {displayedBudgetFilters.map((item, index) => {
            const budgetPillVariants = [
              "bg-green-100/80 text-slate-900 border-slate-500",
              "bg-purple-100/80 text-slate-900 border-slate-500",
              "bg-yellow-100/80 text-slate-900 border-slate-500",
              "bg-teal-100/80 text-slate-900 border-slate-500",
            ];
            const variantClass = budgetPillVariants[index % budgetPillVariants.length];

            return (
              <span
                key={item}
                className={`inline-flex min-h-11 w-auto items-center justify-center rounded-full px-4 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-sm ${variantClass}`}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-(--border)" />
          <h3 className="text-center text-3xl font-bold tracking-[0.18em] text-(--app-fg) md:text-5xl">
            PERSONALIZED GIFTS
          </h3>
          <div className="h-px flex-1 bg-(--border)" />
        </div>
        <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
          <div className="mt-1 flex flex-wrap gap-2">
          {personalizedItems.map((item) => (
            <span
              key={item}
              className="rounded-full bg-(--surface-strong) px-4 py-2 text-xs uppercase tracking-wide text-(--muted)"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      </div>

      <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
        <h3 className="text-xl font-semibold text-(--app-fg)">CORPORATE GIFTS</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {corporateItems.map((item) => (
            <span
              key={item}
              className="rounded-full bg-(--surface-strong) px-4 py-2 text-xs uppercase tracking-wide text-(--muted)"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
