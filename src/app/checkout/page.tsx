"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CustomerDetailsForm } from "app/components/customer-details-form";
import { ShippingOptionsForm } from "app/components/shipping-options-form";
import { PaymentForm } from "app/components/payment-form";
import { OrderConfirmation } from "app/components/order-confirmation";
import { useCartStore, useCheckoutStore } from "app/contexts/ThemeContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getItemCount } = useCartStore();
  const { currentStep, selectedShipping } = useCheckoutStore();
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  useEffect(() => {
    if (items.length === 0 && currentStep < 4) {
      //   router.push("/cart")
    }
  }, [items.length, currentStep, router]);

  if (items.length === 0 && currentStep < 4) {
    // return null;
  }

  const subtotal = getSubtotal();
  const shipping = selectedShipping?.price || 4.9;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
   <div className="w-full bg-white">
     <div className="min-h-screen max-w-6xl m-auto w-full ">
      {/* Header */}
      <header className="w-full p-5  lg:hidden border-b border-gray-200">
          <div className="max-w-xl m-auto w-full">
            <Link href="/" className="flex items-center w-fit gap-2  text-[--color] tracking-wid bg-gray-100 px-3 py-2 rounded-[12px]">
             
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    
                    <img
                      className="w-full h-full"
                      alt="Logo"
                      title="Skiilink Ventures Limited."
                      src="/ali.png"
                      />
                  </div>
                  Skiilink Ventures Limited.
                
            </Link>
            </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Form */}
        <div className="order-2 lg:order-1  px-4 sm:px-5 lg:px-10  py-8 lg:py-12 min-h-screen">
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0">
           
      <Link href="/" className="mb-5 hidden lg:flex items-center w-fit gap-2  text-[--color] tracking-wid bg-gray-100 px-3 py-2 rounded-[12px]">
             
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    
                    <img
                      className="w-full h-full"
                      alt="Logo"
                      title="Skiilink Ventures Limited."
                      src="/ali.png"
                      />
                  </div>
                  Skiilink Ventures Limited.
                
            </Link>
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm mb-8">
              <Link href="/cart" className="text-blue-600 hover:text-blue-700">
                Cart
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span
                className={
                  currentStep >= 1
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }
              >
                Information
              </span>
              <span className="text-gray-400">&gt;</span>
              <span
                className={
                  currentStep >= 2
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }
              >
                Shipping
              </span>
              <span className="text-gray-400">&gt;</span>
              <span
                className={
                  currentStep >= 3
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }
              >
                Payment
              </span>
            </nav>

            {/* Form Content */}
            <div>
              {currentStep === 1 && <CustomerDetailsForm />}
              {currentStep === 2 && <ShippingOptionsForm />}
              {currentStep === 3 && <PaymentForm />}
              {currentStep === 4 && <OrderConfirmation />}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
              All rights reserved Skiilink Ventures Limited. &copy; 2024
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-1  lg:order-2 lg:min-h-screen h-full  border-b lg:border-b-0 lg:border-l border-gray-200">
          {/* Mobile: Collapsible Summary */}
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="lg:hidden w-full px-4 py-4 flex items-center justify-between bg-gray-50"
          >
          <div className="w-full max-w-xl m-auto flex items-center justify-between">
              <div className="flex items-center space-x-2 max-w-xl">
              <span className="text-sm text-gray-600">
                {showOrderSummary ? "Hide" : "Show"} order summary
              </span>
              {showOrderSummary ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
            <div className="text-lg font-semibold">${total.toFixed(2)}</div>
          </div>
          </button>

          {/* Order Summary Content */}
          <div
            className={`${
              showOrderSummary ? "block" : "hidden"
            } lg:block px-4  sticky top-0 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-12`}
          >
            <div className="max-w-xl  mx-auto lg:mr-auto lg:ml-0">
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const productId =
                    item.product.id || item.product._id?.toString() || "";
                  const productName =
                    item.product.name || item.product.title || "";
                  const productImage =item.product.thumbnail;

                  return (
                    <div key={productId} className="flex items-start space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={productImage || "/placeholder.svg"}
                          alt={productName}
                          fill
                          className="object-cover rounded-lg border-gray-200 border-2"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white text-xs rounded-md flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {productName}
                        </p>
                        {item.product.description && (
                          <p className="text-sm text-gray-500">
                            {item.product.description}
                          </p>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal · {getItemCount()} items
                  </span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${shipping.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">USD</span>
                  <span className="text-2xl font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
