"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  ShoppingBagIcon,
  CogIcon,
  ChartBarIcon,
  UsersIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import { ChevronDown, ChevronUp, HelpCircle, Home, Layers, Settings, Sparkles, Ticket } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/administration_dashboard", icon: HomeIcon },
    { name: "Orders", href: "orders", icon: ShoppingBagIcon },
    { name: "Products", href: "products", icon: TagIcon },
    { name: "Customers", href: "customers", icon: UsersIcon },
    { name: "Analytics", href: "analytics", icon: ChartBarIcon },
    { name: "Shipping", href: "shipping", icon: TruckIcon },
    { name: "Settings", href: "settings", icon: CogIcon },
  ]

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed  inset-0 z-40 bg-zinc-950/10 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
        <nav className="flex h-full min-h-0 flex-col">
          {/* Team Selector */}
          <div className="flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5">
            <button
              type="button"
              className="flex w-full cursor-default items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
            >
              <span className="inline-grid shrink-0 align-middle rounded-full">
                <img className="size-7 rounded-full sm:size-6" src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Catalyst" />
              </span>
              <span className="truncate">Catalyst</span>
              <ChevronDown className="ml-auto size-5 shrink-0 sm:size-4" />
            </button>
          </div>
          {/* Main Navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="flex flex-col gap-0.5">
              <span className="relative">
                <span className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"></span>
                <a
                  href="/"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <Home className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Home</span>
                </a>
              </span>

              <span className="relative">
                <a
                  href="/events"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <Layers className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Events</span>
                </a>
              </span>

              <span className="relative">
                <a
                  href="/orders"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <Ticket className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Orders</span>
                </a>
              </span>

              <span className="relative">
                <a
                  href="/settings"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <Settings className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Settings</span>
                </a>
              </span>
            </div>

            {/* Upcoming Events Section */}
            <div className="mt-8 flex flex-col gap-0.5 max-lg:hidden">
              <h3 className="mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400">
                Upcoming Events
              </h3>
              <span className="relative">
                <a
                  href="/events/1000"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  Bear Hug: Live in Concert
                </a>
              </span>
              <span className="relative">
                <a
                  href="/events/1001"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  Six Fingers — DJ Set
                </a>
              </span>
              <span className="relative">
                <a
                  href="/events/1002"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  We All Look The Same
                </a>
              </span>
              <span className="relative">
                <a
                  href="/events/1003"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  Viking People
                </a>
              </span>
            </div>

            <div aria-hidden="true" className="mt-8 flex-1"></div>

            {/* Bottom Links */}
            <div className="flex flex-col gap-0.5">
              <span className="relative">
                <a
                  href="#"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <HelpCircle className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Support</span>
                </a>
              </span>
              <span className="relative">
                <a
                  href="#"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
                >
                  <Sparkles className="size-6 shrink-0 sm:size-5" />
                  <span className="truncate">Changelog</span>
                </a>
              </span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 max-lg:hidden">
            <button
              type="button"
              className="flex w-full cursor-default items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 sm:py-2 sm:text-sm/5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="inline-grid shrink-0 align-middle rounded-full">
                  <img className="size-10 rounded-full" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Erica" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    Erica
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    erica@example.com
                  </span>
                </span>
              </span>
              <ChevronUp className="ml-auto size-5 shrink-0 sm:size-4" />
            </button>
          </div>
        </nav>
      </div>

    
      {/* Mobile menu button */}
      {/* <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-white p-2 text-zinc-950 shadow-sm border border-zinc-950/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button> */}
    </>
  )
}
