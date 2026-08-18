"use client"
import React from 'react'
import { CartProvider, CheckoutProvider, ThemeProvider } from "./contexts/ThemeContext";
export default function Index({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <ThemeProvider>
          <CartProvider>
            <CheckoutProvider>
              {children}
            </CheckoutProvider>
          </CartProvider>
        </ThemeProvider>
    </>
  )
}
