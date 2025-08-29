"use client";
import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  categories,
  featuredProducts,
  bestSellingProducts,
} from "../../data/products";
import { Product, CartItem } from "../../types/product";
import CategoryCard from "app/components/CategoryCard";
import ProductCard from "app/components/ProductCard";
import Cart from "app/components/Cart";
import CatalogPage from "app/components/CatalogPage";
import AdminPanel from "app/components/AdminPanel";
import Header from "app/components/Header";
import { ThemeContext, ThemeProvider } from "app/contexts/ThemeContext";
import HeroSection from "app/components/HeroSection";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function App() {
  // Wrap useSearchParams in a Suspense boundary as required by Next.js

  let searchCategory: string | null = null;
  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();
    searchCategory = searchParams.get('category');
    return null;
  };
  


  

  
  const jdjs=["all-products","solar-panels","solar-batteries","inverters","security-cameras","led-lights","electrical-tools","smart-home","cables-wires"]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    "home" | "catalog" | "product" | "admin"
  >("home");
   useEffect(() => {
    if (searchCategory && jdjs.includes(searchCategory)) {
      console.log("Filtering by searchCategory:", searchCategory);
      setSelectedCategory(searchCategory)
    } else {
      setSelectedCategory(null)
    }
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const themeContext = useContext(ThemeContext)
      if (!themeContext) {
          throw new Error("ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider.");
      }
      const { cartItems, setIsCartOpen,setCartItems, searchQuery, setSearchQuery ,} = themeContext;
  const allProducts = [...featuredProducts, ...bestSellingProducts];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, allProducts]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev:any) => {
      const existingItem = prev.find((item:any) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item:any) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev:any) =>
      prev.map((item:any) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev:any) =>
      prev.filter((item:any) => item.product.id !== productId)
    );
  };

 

  const handleShopNow = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSearchQuery("");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
  };

  // Check if admin view is requested (you can add authentication logic here)
  const isAdminView = currentView === "admin";

  if (isAdminView) {
    return (
      // <ThemeProvider>
      <AdminPanel />
      // </ThemeProvider>
    );
  }

  

 
  return (
    // <ThemeProvider>
    <div className="min-h-screen bg-gray-50">
      
      <div className="w-full relative"></div>
      {
        (selectedCategory || selectedCategory==null) && <CatalogPage
          onBack={handleBackToHome}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      }
      
    </div>
    // </ThemeProvider>
  );
}

export default App;
