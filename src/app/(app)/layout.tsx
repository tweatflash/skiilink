"use client";
import Cart from "app/components/Cart";
import CommandPalette from "app/components/commandPallete";
import Header from "app/components/Header";
import { ThemeContext } from "app/contexts/ThemeContext";
import React, { useContext } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const {
    cartItems,
    setIsCartOpen,
    isCartOpen,
    searchQuery,
    setSearchQuery,
    handleUpdateQuantity,
    handleRemoveItem,
  } = themeContext;
  const cartItemCount: number = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <div className="min-h-screen  dark:bg-gray-950 transition-colors duration-300">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      {children}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-20 transition-colors duration-300">
        <div className="max-screen mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="text-2xl font-bold">Skiilink V.LTD</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-4 leading-relaxed">
                Leading provider of solar, security, and electrical solutions
                for homes and businesses.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Products</h3>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>Solar Panels</li>
                <li>Solar Batteries</li>
                <li>Inverters</li>
                <li>Security Cameras</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>Installation Guide</li>
                <li>Warranty</li>
                <li>Technical Support</li>
                <li>Returns</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 mt-16 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2024 Skiilink Ventures limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <CommandPalette/>
    </div>
  );
}
