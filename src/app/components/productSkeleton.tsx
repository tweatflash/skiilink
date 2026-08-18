import React from 'react'

export default function Skeleton() {
  return (
    <div className="flex flex-col w-full max-w-xs bg-white dark:bg-gray-900 p-0 my-4 sm:my-1 overflow-hidden">
      {/* Product Image Skeleton */}
      <div className="relative w-full aspect-square overflow-hidden  bg-gray-200 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
      </div>

      {/* Rating & Sold Count Skeleton */}
      <div className="flex items-center gap-1 mt-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative w-3.5 h-3.5 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
            </div>
          ))}
        </div>
        <div className="relative w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded ml-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Product Title Skeleton */}
      <div className="mt-3 space-y-2">
        <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Price Section Skeleton */}
      {/* <div className="mt-2 flex items-center gap-2">
        <div className="relative w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div> */}

      {/* Action Buttons Skeleton */}
      <div className="mt-3 flex gap-2">
        <div className="relative flex-1 h-7 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative flex-1 h-7 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}
