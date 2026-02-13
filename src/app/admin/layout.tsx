import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-6 rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">Admin Panel</p>
        <h1 className="mt-2 text-2xl font-semibold text-(--app-fg)">Store Management</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {adminLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-(--border) bg-(--surface-strong) px-4 py-2 text-sm font-medium text-(--app-fg)"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
