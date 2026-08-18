"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"

const orders = [
  {
    id: "3000",
    date: "Jul 11, 2024 10:45 AM",
    customer: "Leslie Alexander",
    event: "Bear Hug: Live in Concert",
    amount: "$80.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3001",
    date: "Jul 11, 2024 9:30 AM",
    customer: "Michael Foster",
    event: "Viking People",
    amount: "$120.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3002",
    date: "Jul 10, 2024 3:15 PM",
    customer: "Dries Vincent",
    event: "Six Fingers — DJ Set",
    amount: "$50.00",
    status: "Refunded",
    statusColor: "bg-zinc-400/20 text-zinc-700",
  },
  {
    id: "3003",
    date: "Jul 10, 2024 1:20 PM",
    customer: "Lindsay Walton",
    event: "We All Look The Same",
    amount: "$90.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3004",
    date: "Jul 9, 2024 11:45 AM",
    customer: "Courtney Henry",
    event: "Bear Hug: Live in Concert",
    amount: "$80.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3005",
    date: "Jul 9, 2024 9:00 AM",
    customer: "Tom Cook",
    event: "Viking People",
    amount: "$120.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3006",
    date: "Jul 8, 2024 4:30 PM",
    customer: "Whitney Francis",
    event: "Six Fingers — DJ Set",
    amount: "$50.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3007",
    date: "Jul 8, 2024 2:15 PM",
    customer: "Leonard Krasner",
    event: "We All Look The Same",
    amount: "$90.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3008",
    date: "Jul 7, 2024 10:00 AM",
    customer: "Floyd Miles",
    event: "Bear Hug: Live in Concert",
    amount: "$80.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
  {
    id: "3009",
    date: "Jul 6, 2024 3:45 PM",
    customer: "Emily Selman",
    event: "Viking People",
    amount: "$120.00",
    status: "Successful",
    statusColor: "bg-lime-400/20 text-lime-700",
  },
]

export function OrdersList() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8">Orders</h1>
          <button
            className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing.3.5)-1px)] py-[calc(theme(spacing.2.5)-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing.1.5)-1px)] sm:text-sm/6 border-transparent bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
            type="button"
          >
            Export
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-10 pr-3 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              type="button"
              className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-base/6 text-zinc-950 sm:text-sm/6 hover:bg-zinc-50 transition-colors min-w-[140px]"
            >
              <span>Status</span>
              <ChevronDownIcon className="size-4 text-zinc-500" />
            </button>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button
              type="button"
              className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-base/6 text-zinc-950 sm:text-sm/6 hover:bg-zinc-50 transition-colors min-w-[180px]"
            >
              <CalendarIcon className="size-4 text-zinc-500" />
              <span>Select date range</span>
              <ChevronDownIcon className="size-4 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-8 flow-root">
          <div className="-mx-6 -my-2 overflow-x-auto lg:-mx-10">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full text-left text-sm/6">
                <thead className="text-zinc-500">
                  <tr>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Order number
                    </th>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Purchase date
                    </th>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Customer
                    </th>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Event
                    </th>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Amount
                    </th>
                    <th className="border-b border-zinc-950/10 px-6 py-2 font-medium first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-950/[2.5%]">
                      <td className="border-b border-zinc-950/5 px-6 py-4 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        <Link href={`/orders/${order.id}`} className="font-medium text-zinc-950 hover:text-blue-600">
                          #{order.id}
                        </Link>
                      </td>
                      <td className="border-b border-zinc-950/5 px-6 py-4 text-zinc-500 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        {order.date}
                      </td>
                      <td className="border-b border-zinc-950/5 px-6 py-4 text-zinc-950 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        {order.customer}
                      </td>
                      <td className="border-b border-zinc-950/5 px-6 py-4 text-zinc-500 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        {order.event}
                      </td>
                      <td className="border-b border-zinc-950/5 px-6 py-4 text-zinc-950 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        {order.amount}
                      </td>
                      <td className="border-b border-zinc-950/5 px-6 py-4 first:pl-6 last:pr-6 lg:first:pl-10 lg:last:pr-10">
                        <span
                          className={`inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            Showing <span className="font-medium text-zinc-950">1</span> to{" "}
            <span className="font-medium text-zinc-950">10</span> of{" "}
            <span className="font-medium text-zinc-950">100</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled
            >
              <ChevronLeftIcon className="size-4" />
              <span className="ml-1">Previous</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <span className="mr-1">Next</span>
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
