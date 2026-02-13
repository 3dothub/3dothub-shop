import { getProducts, getShopCategories, getSpecialOccasions } from "@/lib/database/repository";

const cardClass = "rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5";

export default async function AdminDashboardPage() {
  let products: Record<string, unknown>[] = [];
  let categories: Record<string, unknown>[] = [];
  let occasions: Record<string, unknown>[] = [];

  try {
    [products, categories, occasions] = await Promise.all([
      getProducts(),
      getShopCategories(),
      getSpecialOccasions(),
    ]);
  } catch {
    products = [];
    categories = [];
    occasions = [];
  }

  const stats = [
    { label: "Products", value: products.length },
    { label: "Categories", value: categories.length },
    { label: "Special Occasions", value: occasions.length },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <section key={item.label} className={cardClass}>
          <p className="text-sm text-(--muted)">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-(--app-fg)">{item.value}</p>
        </section>
      ))}
    </div>
  );
}
