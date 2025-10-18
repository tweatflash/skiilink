"use client";
import Cart from "app/components/Cart";
import CommandPalette from "app/components/commandPallete";
import { Footer } from "app/components/footer";
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
    search,
    setSearch
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
      <Footer />
      <CommandPalette/>
    </div>
  );
}
