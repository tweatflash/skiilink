import { useEffect, useState } from "react";
import getOrders from "../../../lib/getOrders";
import formatDate from "../../../lib/formatdate";
import { formatPrice } from "../../../lib/formatPrice";
import Link from "next/link";
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
  const [orders,setOrders]=useState<adminOrder[]>([])
  const [loading,setLoading]=useState(true)
  const fetchOrders = async () => {
        setLoading(true)
        // setError("")
        const request: Promise<any> = await getOrders();
        const response: adminOrder[] = (await request)?.orders;
        if (response) {
          setLoading(false)
          console.log(response)
          setOrders([...orders, ...response]);
        }else{
          setLoading(false)
          // setError("Failed to load products");
        }
      };
      useEffect(() => {
        fetchOrders();
      }, []);
      
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
            <tr key={order._id} className="hover:bg-zinc-50/50">
              <td className="relative px-4 py-4 whitespace-nowrap text-sm font-medium text-zinc-950">{order._id}
                <Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{formatDate(order.createdAt)}
                <Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm text-zinc-950">{order.name}
                <Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{order.orderItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                <Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
              </td>
              <td className="relative px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950">{formatPrice(order.total)}
                <Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
              </td>
              <td className="relative px-6 py-4 whitespace-now
              rap"><Link href={`/administration_dashboard/order/${order._id}`} className="absolute inset-0 focus:outline-hidden"/>
                <span
                  className={
                    "inline-flex rounded-md border px-2.5 py-0.5 text-xs font-medium " +
                    getStatusClassName(order.status==="pending" ? "Processing":  order.status==="paid" ? "Shipped" :order.status)
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
