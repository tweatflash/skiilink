"use client";
import Cart from "app/components/Cart";
import CommandPalette from "app/components/commandPallete";
import { Footer } from "app/components/footer";
import Header from "app/components/Header";
import { ThemeContext } from "app/contexts/ThemeContext";
import { FooterSection } from "app/components/new/FooterSection";
import React, { useContext } from "react";
import { Button } from "app/components/ui/button2";
import { XIcon } from "lucide-react";

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
    setSearch,
  } = themeContext;
  const cartItemCount: number = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen  dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full min-h-[38px] bg-black flex items-center justify-center relative px-4">
              <p className=" font-normal text-white text-sm tracking-[0] leading-[normal]">
                <span className=" font-normal text-white text-sm tracking-[0]">
                  Sign up and get 20% off to your first order.{" "}
                </span>
                <span className="font-medium underline cursor-pointer">
                  Sign Up Now
                </span>
              </p>
              <Button
                variant="ghost"
                className="absolute right-4 md:right-[100px] h-auto p-0"
              >
                <XIcon className="w-5 h-5 text-white" />
              </Button>
            </div>
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
      <FooterSection />
      <CommandPalette />
    </div>
  );
}
