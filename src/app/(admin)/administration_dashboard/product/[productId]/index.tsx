type product = {
  data: dummyStore;
}
export default function Index({data}:product) {
  return (
     <div className="min-h-screen">
      <div className="grow p-6 lg:rounded-lg bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5">
        <div className="mx-auto max-w-6xl">
          <div className="max-lg:hidden">
            <a className="inline-flex items-center gap-2 text-sm text-zinc-500" href="/administration_dashboard/products">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="w-4 h-4 fill-zinc-400">
                <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"></path>
              </svg>
              Products
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="w-32 shrink-0 hrpi relative overflow-hidden rounded-lg">
                <img className="aspect-[1/1] rounded-lg shadow-sm" src={data.image[0].url} alt="" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h1 className="text-2xl font-semibold text-zinc-950 sm:text-xl">{data.title}</h1>
                  <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium sm:text-xs bg-lime-400/20 text-lime-700">Laptops</span>
                </div>
                <div className="mt-2 text-sm text-zinc-500">{data.description}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border font-semibold px-3 py-1.5 sm:text-sm focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:opacity-50 border-zinc-950/10 text-zinc-950 hover:bg-zinc-950/5 active:bg-zinc-950/5" type="button">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></span>
                Update 
              </button>
              <button className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border font-semibold px-3 py-1.5 sm:text-sm focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:opacity-50 border-transparent bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 active:bg-zinc-800" type="button">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></span>
                Delete Product
              </button>
            </div>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <hr role="presentation" className="w-full border-t border-zinc-950/10" />
              <div className="mt-6 text-lg font-medium sm:text-sm">Total revenue</div>
              <div className="mt-3 text-3xl font-semibold sm:text-2xl">$102,552</div>
              <div className="mt-3 text-sm sm:text-xs">
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium sm:text-xs bg-lime-400/20 text-lime-700">+3.2%</span>
                <span className="text-zinc-500"> from last week</span>
              </div>
            </div>
            <div>
              <hr role="presentation" className="w-full border-t border-zinc-950/10" />
              <div className="mt-6 text-lg font-medium sm:text-sm">Product sold</div>
              <div className="mt-3 text-3xl font-semibold sm:text-2xl">350/500</div>
              <div className="mt-3 text-sm sm:text-xs">
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium sm:text-xs bg-lime-400/20 text-lime-700">+8.1%</span>
                <span className="text-zinc-500"> from last week</span>
              </div>
            </div>
            <div>
              <hr role="presentation" className="w-full border-t border-zinc-950/10" />
              <div className="mt-6 text-lg font-medium sm:text-sm">Pageviews</div>
              <div className="mt-3 text-3xl font-semibold sm:text-2xl">0</div>
              <div className="mt-3 text-sm sm:text-xs">
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm font-medium sm:text-xs bg-pink-400/15 text-pink-700">-0.75%</span>
                <span className="text-zinc-500"> from last week</span>
              </div>
            </div>
          </div>
          <h2 className="mt-12 text-base font-semibold text-zinc-950 sm:text-sm">Recent orders</h2>
          <div className="flow-root">
            <div className="mt-4 -mx-6 overflow-x-auto whitespace-nowrap lg:-mx-10">
              <div className="inline-block min-w-full align-middle sm:px-6 lg:px-10">
                <table className="min-w-full text-left text-sm text-zinc-950">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-6 last:pr-6 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">Order number</th>
                      <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-6 last:pr-6 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">Purchase date</th>
                      <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-6 last:pr-6 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">Customer</th>
                      <th className="text-right border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-6 last:pr-6 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '3000', date: 'May 9, 2024', customer: 'Leslie Alexander', amount: 'US$80.00' },
                      { id: '3003', date: 'Apr 23, 2024', customer: 'Lindsay Walton', amount: 'US$80.00' },
                      { id: '3007', date: 'Apr 6, 2024', customer: 'Leonard Krasner', amount: 'US$80.00' },
                      { id: '3008', date: 'Apr 3, 2024', customer: 'Floyd Miles', amount: 'US$80.00' },
                      { id: '3011', date: 'Mar 21, 2024', customer: 'Emma Dorsey', amount: 'US$80.00' },
                      { id: '3016', date: 'Feb 28, 2024', customer: 'Jeffrey Webb', amount: 'US$80.00' },
                      { id: '3017', date: 'Feb 23, 2024', customer: 'Kathryn Murphy', amount: 'US$80.00' },
                      { id: '3021', date: 'Feb 5, 2024', customer: 'Blake Reid', amount: 'US$80.00' }
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-950/5">
                        <td className="relative px-4 first:pl-6 last:pr-6 border-b border-zinc-950/5 py-4 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">
                          <a aria-label={`Order #${order.id}`} tabIndex={0} className="absolute inset-0 focus:outline-none" href={`/orders/${order.id}`}></a>
                          {order.id}
                        </td>
                        <td className="text-zinc-500 relative px-4 first:pl-6 last:pr-6 border-b border-zinc-950/5 py-4 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">
                          <a aria-label={`Order #${order.id}`} tabIndex={-1} className="absolute inset-0 focus:outline-none" href={`/orders/${order.id}`}></a>
                          {order.date}
                        </td>
                        <td className="relative px-4 first:pl-6 last:pr-6 border-b border-zinc-950/5 py-4 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">
                          <a aria-label={`Order #${order.id}`} tabIndex={-1} className="absolute inset-0 focus:outline-none" href={`/orders/${order.id}`}></a>
                          {order.customer}
                        </td>
                        <td className="text-right relative px-4 first:pl-6 last:pr-6 border-b border-zinc-950/5 py-4 sm:first:pl-1 sm:last:pr-1 lg:first:pl-10 lg:last:pr-10">
                          <a aria-label={`Order #${order.id}`} tabIndex={-1} className="absolute inset-0 focus:outline-none" href={`/orders/${order.id}`}></a>
                          {order.amount}
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
    </div>
  )
}
