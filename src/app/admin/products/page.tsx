import { getProducts } from "@/lib/database/repository";

const toNumber = (value: unknown) => Number(value ?? 0) || 0;

export default async function AdminProductsPage() {
  let products: Record<string, unknown>[] = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  const rows = products.slice(0, 50);

  return (
    <section className="rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
      <h2 className="text-xl font-semibold text-(--app-fg)">Products</h2>
      <p className="mt-1 text-sm text-(--muted)">Maintain your product catalog.</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead>
            <tr className="border-b border-(--border) text-(--muted)">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">MRP</th>
              <th className="py-2 pr-4">Final Price</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => {
              const name = String(item.name ?? item.title ?? "Product");
              const category = String(item.category ?? "-");
              const mrp = toNumber(item.mrp ?? item.pdfPrice ?? item.price);
              const finalPrice = toNumber(item.finalPrice ?? item.price ?? mrp);
              const status = String(item.status ?? "Active");

              return (
                <tr key={String(item.id ?? item._id ?? name)} className="border-b border-(--border)">
                  <td className="py-2 pr-4 text-(--app-fg)">{name}</td>
                  <td className="py-2 pr-4 text-(--muted)">{category}</td>
                  <td className="py-2 pr-4 text-(--muted)">₹{mrp}</td>
                  <td className="py-2 pr-4 text-(--muted)">₹{finalPrice}</td>
                  <td className="py-2 pr-4 text-(--muted)">{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
