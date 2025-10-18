import React from 'react'

export default function Page() {
  return (
    <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
  <div className="mx-auto max-w-6xl">
    {/*$*/}
    {/*/$*/}
    <div className="max-lg:hidden">
      <a
        className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        data-headlessui-state=""
        href="/orders"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-4 fill-zinc-400 dark:fill-zinc-500"
        >
          <path
            fillRule="evenodd"
            d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        Orders
      </a>
    </div>
    <div className="mt-4 lg:mt-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Order #3000
        </h1>
        <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:hover:bg-lime-400/15">
          Successful
        </span>
      </div>
      <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500"
            >
              <path
                fillRule="evenodd"
                d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z"
                clipRule="evenodd"
              />
              <path d="M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z" />
            </svg>
            <span>US$80.00</span>
          </span>
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5V5h14v-.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                fillRule="evenodd"
                d="M15 7H1v4.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V7ZM3 10.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm3.75-.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="inline-flex gap-3">
              American Express{" "}
              <span>
                <span aria-hidden="true">••••</span> 1254
              </span>
            </span>
          </span>
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500"
            >
              <path
                fillRule="evenodd"
                d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z"
                clipRule="evenodd"
              />
            </svg>
            <span>May 9, 2024</span>
          </span>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-3 py-2 sm:px-2.5 sm:py-1 sm:text-sm/6 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 border-zinc-950/10 text-zinc-950 active:bg-zinc-950/5 hover:bg-zinc-950/5 dark:border-white/15 dark:text-white dark:bg-transparent dark:active:bg-white/5 dark:hover:bg-white/5 cursor-default"
            data-headlessui-state=""
          >
            <span
              className="absolute top-1/2 left-1/2 px-4 py-1 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            Refund
          </button>
          <button
            className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-3 py-2 sm:px-2.5 sm:py-1 sm:text-sm/6 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 border-transparent bg-zinc-900 dark:bg-zinc-600 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-zinc-900 before:shadow-sm dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-lg after:shadow-[inset_0_1px_theme(colors.white/15%)] active:after:bg-white/10 hover:after:bg-white/10 dark:after:-inset-px dark:after:rounded-lg disabled:before:shadow-none disabled:after:shadow-none text-white dark:active:after:bg-white/5 dark:hover:after:bg-white/5 cursor-default"
            type="button"
            data-headlessui-state=""
          >
            <span
              className="absolute top-1/2 left-1/2 px-4 py-1 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            Resend Invoice
          </button>
        </div>
      </div>
    </div>
    <div className="mt-12">
      <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
        Summary
      </h2>
      <hr
        role="presentation"
        className="mt-4 w-full border-t border-zinc-950/10 dark:border-white/10"
      />
      <dl className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Customer
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          Leslie Alexander
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Event
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          <a
            className="flex items-center gap-2"
            data-headlessui-state=""
            href="/events/1000"
          >
            <span
              data-slot="avatar"
              className="size-6 inline-grid shrink-0 align-middle rounded-[20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 *:rounded-[20%]"
            >
              <img
                className="size-full"
                alt=""
                src="/events/bear-hug-thumb.jpg"
              />
            </span>
            <span>Bear Hug: Live in Concert</span>
          </a>
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Amount
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          US$80.00
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Amount after exchange rate
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          US$80.00 → CA$109.47
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Fee
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          CA$3.28
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Net
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          CA$106.19
        </dd>
      </dl>
    </div>
    <div className="mt-12">
      <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
        Payment method
      </h2>
      <hr
        role="presentation"
        className="mt-4 w-full border-t border-zinc-950/10 dark:border-white/10"
      />
      <dl className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Transaction ID
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          ch_2HLf8DfYJ0Db7asfCC5T546TY
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Card number
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          •••• 1254
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Card type
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          American Express
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Card expiry
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          01 / 2025
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Owner
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          Leslie Alexander
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Email address
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          leslie.alexander@example.com
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Address
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          123 Main St. Toronto, ON
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          Country
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          <span className="inline-flex gap-3">
            <img alt="Canada" src="/flags/ca.svg" />
            Canada
          </span>
        </dd>
        <dt className="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
          CVC
        </dt>
        <dd className="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:[&:nth-child(2)]:border-none dark:text-white dark:sm:border-white/5">
          <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:hover:bg-lime-400/15">
            Passed successfully
          </span>
        </dd>
      </dl>
    </div>
  </div>
</div>

  )
}
