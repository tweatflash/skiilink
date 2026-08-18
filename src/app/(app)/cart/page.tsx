"use client";
import React, { useContext, useEffect, useState } from "react";
import { Minus, Plus, Trash2, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ThemeContext } from "app/contexts/ThemeContext";

// Adjust to your actual free-shipping policy
const FREE_SHIPPING_THRESHOLD = 50000;

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CartPage() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const { cartItems, setCartItems } = themeContext as {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  };
  const router = useRouter();

  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    setIsAuthed(Boolean(Cookies.get("ACTFL")));
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product._id !== productId);
      }
      return prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const moveToWishlist = (productId: string) => {
    // TODO: wire this up to your actual wishlist store/context.
    removeItem(productId);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire this up to your promo code endpoint.
  };

  const items = cartItems ?? [];

  const originalSubtotal = items.reduce((sum, item) => {
    const compareAt = Number(item.product.discountPercentage) || item.product.price;
    return sum + compareAt * item.quantity;
  }, 0);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalSavings = originalSubtotal - total;
  const qualifiesForFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center gap-4">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl bold-livvic text-black">Your cart is empty</h1>
            <p className="text-(--secondary) title-font">
              Items you add to your cart will show up here.
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 rounded-full bg-black text-white custom3 font-medium hover:opacity-90 transition-opacity"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-10 py-10">
      <h1 className="text-3xl bold-livvic sm:text-4xl tt text-black mb-5">Shopping Cart</h1>

      {isAuthed === false && (
        <p className="text-sm title-font text-(--secondary) mb-8">
          <Link href="/sign-in" className="underline underline-offset-4 text-black">
            Sign in
          </Link>{" "}
          or{" "}
          <Link href="/sign-up" className="underline underline-offset-4 text-black">
            create a new account
          </Link>{" "}
          to track orders and see items you may have added using another device.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const compareAt = Number(item.product.discountPercentage) || 0;
            return (
              <div
                key={item.product._id}
                className="flex gap-4 p-4 border border-gray-200 rounded-2xl"
              >
                <img
                  src={item.product.image[0].url}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-medium text-black title-font">
                    {item.product.title}
                  </h3>
                  <span
                    className={`text-xs font-medium title-font ${
                      item.product.stock ? "text-(--success)" : "text-(--warning)"
                    }`}
                  >
                    {item.product.stock ? "In stock" : "Out of stock"}
                  </span>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-orange-600 price-font font-medium">
                      {formatPrice(item.product.price)}
                    </span>
                    {compareAt ? (
                      <span className="text-sm price-font text-(--secondary) line-through">
                        {formatPrice(compareAt)}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id.toString(), item.quantity - 1)
                        }
                        className="p-1.5 hover:bg-(--card) rounded-full transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id.toString(), item.quantity + 1)
                        }
                        className="p-1.5 hover:bg-(--card) rounded-full transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={() => removeItem(item.product._id.toString())}
                        className="flex items-center gap-1.5 text-(--secondary) hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                      {/* <button
                        onClick={() => moveToWishlist(item.product._id.toString())}
                        className="flex items-center gap-1.5 text-(--secondary) hover:text-black transition-colors"
                      >
                        <Heart size={14} />
                        Move to Wishlist
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="flex flex-col gap-2">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-(--success) transition-all"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
            <p className="text-sm price-font text-(--success) font-medium">
              {`Add ${formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for discounted shipping`}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h2 className="text-lg tt text-black mb-4">Summary ({items.length})</h2>

            <form onSubmit={handleApplyPromo} className="flex gap-2 mb-5">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter your promo code"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Submit
              </button>
            </form>

            <div className="flex flex-col gap-2 text-sm title-font">
              <div className="flex justify-between text-black">
                <span>Subtotal</span>
                <span className="price-font">{formatPrice(originalSubtotal)}</span>
              </div>
              <div className="flex justify-between text-(--secondary)">
                <span>Estimated Shipping</span>
                <span>{"Calculated at checkout"}</span>
              </div>
              <div className="flex justify-between text-(--secondary)">
                <span>Estimated Tax</span>
                <span className="price-font">—</span>
              </div>
              {totalSavings > 0 ? (
                <div className="flex justify-between text-(--success)">
                  <span>Total Savings</span>
                  <span className="price-font">-{formatPrice(totalSavings)}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 flex justify-between items-baseline">
            <span className="text-black font-medium title-font">Total</span>
            <span className="text-xl tt text-black price-font">{formatPrice(total)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3 rounded-full bg-black text-white custom3 font-medium hover:opacity-90 transition-opacity"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}