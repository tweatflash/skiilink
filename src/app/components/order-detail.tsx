"use client"

import Link from "next/link"
import { ChevronLeftIcon, CreditCardIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline"

interface OrderDetailProps {
  orderId: string
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  // Mock order data - in a real app, this would be fetched based on orderId
  const order = {
    id: orderId,
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
    amount: "$80.00",
    customer: "Leslie Alexander",
    customerEmail: "leslie.alexander@example.com",
    event: "Bear Hug: Live in Concert",
    date: "Jul 11, 2024 10:45 AM",
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/2024",
    },
    items: [
      {
        id: 1,
        name: "General Admission",
        description: "Bear Hug: Live in Concert",
        quantity: 2,
        price: "$35.00",
        total: "$70.00",
        image: "/generic-concert-ticket.png",
      },
    ],
    subtotal: "$70.00",
    tax: "$10.00",
    total: "$80.00",
  }

  return (
    <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5">
      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <div className="max-lg:hidden">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <ChevronLeftIcon className="size-4" />
            Orders
          </Link>
        </div>

        {/* Header */}
        <div className="mt-4 lg:mt-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8">Order #{order.id}</h1>
            <span
              className={`inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 ${order.statusColor}`}
            >
              {order.status}
            </span>
          </div>

          {/* Order Info */}
          <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
            <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
              <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6">
                <CreditCardIcon className="size-4 shrink-0 text-zinc-400" />
                <span className="text-zinc-500">Amount paid</span>
                <span className="font-medium">{order.amount}</span>
              </span>
              <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6">
                <UserIcon className="size-4 shrink-0 text-zinc-400" />
                <span className="text-zinc-500">Customer</span>
                <span className="font-medium">{order.customer}</span>
              </span>
              <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6">
                <CalendarIcon className="size-4 shrink-0 text-zinc-400" />
                <span className="text-zinc-500">Event</span>
                <span className="font-medium">{order.event}</span>
              </span>
              <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6">
                <CalendarIcon className="size-4 shrink-0 text-zinc-400" />
                <span className="text-zinc-500">Date</span>
                <span className="font-medium">{order.date}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Payment Method */}
            <div>
              <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6">Payment method</h2>
              <div className="mt-4 rounded-lg border border-zinc-950/10 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-100">
                    <CreditCardIcon className="size-6 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-950">{order.paymentMethod.type}</span>
                      <span className="text-sm text-zinc-500">ending in {order.paymentMethod.last4}</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">Expires {order.paymentMethod.expiry}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-10">
              <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6">Order items</h2>
              <div className="mt-4 flow-root">
                <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-0">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full">
                      <thead className="text-zinc-500">
                        <tr>
                          <th className="border-b border-zinc-950/10 px-0 py-2 text-left text-sm font-medium">
                            Product
                          </th>
                          <th className="border-b border-zinc-950/10 px-6 py-2 text-right text-sm font-medium">
                            Quantity
                          </th>
                          <th className="border-b border-zinc-950/10 px-6 py-2 text-right text-sm font-medium">
                            Price
                          </th>
                          <th className="border-b border-zinc-950/10 px-0 py-2 text-right text-sm font-medium">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td className="border-b border-zinc-950/5 py-4 pr-6">
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="size-16 rounded-lg bg-zinc-100 object-cover"
                                />
                                <div>
                                  <div className="text-sm font-medium text-zinc-950">{item.name}</div>
                                  <div className="mt-1 text-xs text-zinc-500">{item.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-zinc-950/5 px-6 py-4 text-right text-sm text-zinc-950">
                              {item.quantity}
                            </td>
                            <td className="border-b border-zinc-950/5 px-6 py-4 text-right text-sm text-zinc-950">
                              {item.price}
                            </td>
                            <td className="border-b border-zinc-950/5 py-4 text-right text-sm font-medium text-zinc-950">
                              {item.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-zinc-950/10 bg-zinc-50 p-6">
              <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6">Summary</h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-zinc-500">Subtotal</dt>
                  <dd className="font-medium text-zinc-950">{order.subtotal}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-zinc-500">Tax</dt>
                  <dd className="font-medium text-zinc-950">{order.tax}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-950/10 pt-4 text-base font-semibold">
                  <dt className="text-zinc-950">Total</dt>
                  <dd className="text-zinc-950">{order.total}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-lg bg-zinc-950 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Refund order
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-6 rounded-lg border border-zinc-950/10 bg-white p-6">
              <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6">Customer</h2>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 text-sm font-semibold">
                    {order.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-950">{order.customer}</div>
                    <div className="text-xs text-zinc-500">{order.customerEmail}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
