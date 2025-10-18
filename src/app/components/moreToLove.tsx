"use client"

import { Star } from "lucide-react"
import { Button } from "./ui/button2"

const products = [
  {
    id: 1,
    name: "OSPREY ATMOS AG",
    price: 450,
    originalPrice: 550,
    image: "/black-osprey-atmos-backpack.jpg",
    colors: ["#1a1a1a", "#4a4a4a", "#6b7280"],
    rating: 4.5,
    soldCount: 250,
    onSale: true,
  },
  {
    id: 2,
    name: "DEUTER FUTURA VARIO",
    price: 350,
    originalPrice: 420,
    image: "/navy-blue-deuter-futura-backpack.jpg",
    colors: ["#374151", "#1e3a8a", "#6b7280"],
    rating: 4,
    soldCount: 180,
    onSale: true,
  },
  {
    id: 3,
    name: "NORTH FACE BOREALIS",
    price: 109,
    image: "/gray-north-face-borealis-backpack.jpg",
    colors: ["#4b5563", "#1f2937", "#6b7280"],
    rating: 5,
    soldCount: 320,
    onSale: false,
  },
  {
    id: 4,
    name: "PATAGONIA BLACK HOLE",
    price: 179,
    originalPrice: 220,
    image: "/navy-patagonia-black-hole-backpack.jpg",
    colors: ["#1e3a8a", "#7c3aed", "#6b7280"],
    rating: 4.5,
    soldCount: 290,
    onSale: true,
  },
  {
    id: 5,
    name: "FJÄLLRÄVEN RUCKSACK",
    price: 130,
    image: "/brown-fjallraven-rucksack-backpack.jpg",
    colors: ["#1a1a1a", "#78350f", "#6b7280"],
    rating: 4,
    soldCount: 150,
    onSale: false,
  },
  {
    id: 6,
    name: "HYNES EAGLE 2.0",
    price: 129,
    originalPrice: 160,
    image: "/black-hynes-eagle-backpack.jpg",
    colors: ["#374151", "#1f2937", "#6b7280"],
    rating: 4.5,
    soldCount: 200,
    onSale: true,
  },
  {
    id: 7,
    name: "COLUMBIA TRAIL 2",
    price: 125,
    image: "/blue-columbia-trail-backpack.jpg",
    colors: ["#4b5563", "#1e40af", "#6b7280"],
    rating: 4,
    soldCount: 175,
    onSale: false,
  },
  {
    id: 8,
    name: "HULE LANDMARK",
    price: 299,
    originalPrice: 380,
    image: "/gray-hule-landmark-backpack.jpg",
    colors: ["#1e3a8a", "#4b5563", "#6b7280"],
    rating: 5,
    soldCount: 210,
    onSale: true,
  },
]

export default function BackpackCatalog() {
  const handleAddToCart = (productId: number) => {
    console.log("[v0] Adding product to cart:", productId)
    // Add to cart logic here
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 flex items-start justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">MORE PRODUCT</p>
            <h1 className="mb-4 text-4xl font-black uppercase leading-tight tracking-tight text-foreground md:text-5xl">
              EXPLORE MORE BACKPACK
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Explore a variety of backpacks designed for comfort, durability, and style, ideal for travel, hiking, or
              daily use.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-border bg-background text-sm font-medium hover:bg-accent"
          >
            Show More
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative w-full max-w-xs cursor-pointer rounded-lg bg-white transition duration-300 dark:bg-gray-900"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Sale badge */}
                {product.onSale && (
                  <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    SALE
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h3 className="mt-3 line-clamp-2 text-sm font-bold text-gray-800 transition-colors group-hover:text-orange-500 dark:text-gray-100">
                {product.name}
              </h3>

              {/* Rating & Sold Count */}
              <div className="mt-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.soldCount}+ sold)</span>
              </div>

              {/* Price Section */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 rounded bg-orange-500 py-[6px] text-xs font-medium text-white transition hover:bg-orange-600"
                >
                  Add to Cart
                </button>
                <button className="flex-1 rounded border border-gray-300 py-[6px] text-xs font-medium transition hover:border-orange-500 dark:border-gray-600">
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
