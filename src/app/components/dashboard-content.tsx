import clsx from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';
const orders = [
  { id: 3000, date: 'May 9, 2024', customer: 'Leslie Alexander', event: 'Bear Hug: Live in Concert', amount: 80.00 },
  { id: 3001, date: 'May 5, 2024', customer: 'Michael Foster', event: 'Six Fingers — DJ Set', amount: 299.00 },
  { id: 3002, date: 'Apr 28, 2024', customer: 'Dries Vincent', event: 'We All Look The Same', amount: 150.00 },
  { id: 3003, date: 'Apr 23, 2024', customer: 'Lindsay Walton', event: 'Bear Hug: Live in Concert', amount: 80.00 },
  { id: 3004, date: 'Apr 18, 2024', customer: 'Courtney Henry', event: 'Viking People', amount: 114.99 },
  { id: 3005, date: 'Apr 14, 2024', customer: 'Tom Cook', event: 'Six Fingers — DJ Set', amount: 299.00 },
  { id: 3006, date: 'Apr 10, 2024', customer: 'Whitney Francis', event: 'We All Look The Same', amount: 150.00 },
  { id: 3007, date: 'Apr 6, 2024', customer: 'Leonard Krasner', event: 'Bear Hug: Live in Concert', amount: 80.00 },
  { id: 3008, date: 'Apr 3, 2024', customer: 'Floyd Miles', event: 'Bear Hug: Live in Concert', amount: 80.00 },
  { id: 3009, date: 'Mar 29, 2024', customer: 'Emily Selman', event: 'Viking People', amount: 114.99 },
];

const stats = [
  { label: 'Total revenue', value: '₦0.00', change: '+4.5%', positive: true },
  { label: 'Average order value', value: '₦0.00', change: '-0.5%', positive: false },
  { label: 'products sold', value: '0', change: '+4.5%', positive: true },
  { label: 'Pageviews', value: '87', change: '+21.2%', positive: true },
];
const getRandomWidth = () => {
  const widths = [
    "w-1/2",
    "w-2/3",
    "w-3/4",
    "w-4/5",
    "w-5/6",
    "w-full",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
  ];
  return widths[Math.floor(Math.random() * widths.length)];
};
const skeletonBase = " h-[10px] animate-pulse rounded bg-gray-200";
export function DashboardContent() {
  return (
    
      <div className="p-6 lg:p-10">
      <div className="max-w-6xl w-full  mx-auto ">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Good day, Uche Ezeife
        </h1>

        <div className="mt-8 flex items-end justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overview
          </h2>
          <select
            name="period"
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </select>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                    stat.positive
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {stat.positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400">from last week</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-semibold text-gray-900 dark:text-white">
          Recent orders
        </h2>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg  border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap tracking-wider">
                    Order number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap tracking-wider">
                    Purchase date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {/* {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      US${order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))} */}
                 {
                  [...Array(10)].map(item=> <tr
                    key={item}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                     <div
                               className={clsx(skeletonBase, getRandomWidth())}
                             />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                     <div
          className={clsx(skeletonBase, getRandomWidth())}
        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div
          className={clsx(skeletonBase, getRandomWidth())}
        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                     <div
          className={clsx(skeletonBase, getRandomWidth())}
        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    <div
          className={clsx(skeletonBase, getRandomWidth())}
        />
                    </td>
                  </tr>)
                 }
              </tbody>
            </table>
          </div>
        </div>
      
    </div>
    </div>
  )
}
