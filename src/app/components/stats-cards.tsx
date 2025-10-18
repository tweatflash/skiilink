import { ShoppingBagIcon, CurrencyDollarIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline"

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: CurrencyDollarIcon,
    positive: true,
  },
  {
    name: "Orders",
    value: "356",
    change: "+12.5% from last month",
    icon: ShoppingBagIcon,
    positive: true,
  },
  {
    name: "Customers",
    value: "2,345",
    change: "+8.2% from last month",
    icon: UsersIcon,
    positive: true,
  },
  {
    name: "Conversion Rate",
    value: "3.24%",
    change: "+2.1% from last month",
    icon: ChartBarIcon,
    positive: true,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="rounded-lg border border-zinc-950/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500">{stat.name}</p>
              <Icon className="size-5 text-zinc-400" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-semibold text-zinc-950">{stat.value}</p>
              <p className={stat.positive ? "mt-1 text-xs text-green-600" : "mt-1 text-xs text-red-600"}>
                {stat.change}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
