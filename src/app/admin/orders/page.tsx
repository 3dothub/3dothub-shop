type AdminOrder = {
  id: string;
  customer: string;
  total: number;
  status: "Pending" | "Paid" | "Shipped";
};

const mockOrders: AdminOrder[] = [
  { id: "ORD-1001", customer: "Aarav", total: 2499, status: "Pending" },
  { id: "ORD-1002", customer: "Diya", total: 1799, status: "Paid" },
  { id: "ORD-1003", customer: "Kabir", total: 3299, status: "Shipped" },
];

export default function AdminOrdersPage() {
  return (
    <section className="rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
      <h2 className="text-xl font-semibold text-(--app-fg)">Orders</h2>
      <p className="mt-1 text-sm text-(--muted)">Track and manage incoming orders.</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b border-(--border) text-(--muted)">
              <th className="py-2 pr-4">Order ID</th>
              <th className="py-2 pr-4">Customer</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-(--border)">
                <td className="py-2 pr-4 text-(--app-fg)">{order.id}</td>
                <td className="py-2 pr-4 text-(--muted)">{order.customer}</td>
                <td className="py-2 pr-4 text-(--muted)">₹{order.total}</td>
                <td className="py-2 pr-4 text-(--muted)">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
