const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    customer: "Alice Johnson",
    product: "Wireless Headphones",
    amount: "$129.99",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2024-01-15",
    customer: "Bob Smith",
    product: "Smart Watch",
    amount: "$299.99",
    status: "Processing",
  },
  {
    id: "ORD-003",
    date: "2024-01-14",
    customer: "Carol White",
    product: "Laptop Stand",
    amount: "$49.99",
    status: "Shipped",
  },
  {
    id: "ORD-004",
    date: "2024-01-14",
    customer: "David Brown",
    product: "USB-C Cable",
    amount: "$19.99",
    status: "Delivered",
  },
  {
    id: "ORD-005",
    date: "2024-01-13",
    customer: "Emma Davis",
    product: "Keyboard",
    amount: "$89.99",
    status: "Cancelled",
  },
  {
    id: "ORD-001",
    date: "2024-01-15",
    customer: "Alice Johnson",
    product: "Wireless Headphones",
    amount: "$129.99",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2024-01-15",
    customer: "Bob Smith",
    product: "Smart Watch",
    amount: "$299.99",
    status: "Processing",
  },
  {
    id: "ORD-003",
    date: "2024-01-14",
    customer: "Carol White",
    product: "Laptop Stand",
    amount: "$49.99",
    status: "Shipped",
  },
  {
    id: "ORD-004",
    date: "2024-01-14",
    customer: "David Brown",
    product: "USB-C Cable",
    amount: "$19.99",
    status: "Delivered",
  },
  {
    id: "ORD-005",
    date: "2024-01-13",
    customer: "Emma Davis",
    product: "Keyboard",
    amount: "$89.99",
    status: "Cancelled",
  },
]

function getStatusClassName(status: string) {
  const styles = {
    Delivered: "bg-green-50 text-green-700 border-green-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Shipped: "bg-purple-50 text-purple-700 border-purple-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  }
  return styles[status as keyof typeof styles] || ""
}

export function OrdersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-zinc-950/5 bg-zinc-50/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y bg-white divide-zinc-950/5">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-zinc-50/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950">{order.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={
                    "inline-flex rounded-md border px-2.5 py-0.5 text-xs font-medium " +
                    getStatusClassName(order.status)
                  }
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
