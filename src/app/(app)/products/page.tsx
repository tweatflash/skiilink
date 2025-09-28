"use client";
import React, { useState, useMemo, useContext, useEffect, Suspense } from "react";
import {
  categories,
  featuredProducts,
  bestSellingProducts,
} from "../../data/products";
import { Product, CartItem } from "../../types/product";
import CatalogPage from "app/components/CatalogPage";
import { ThemeContext, ThemeProvider } from "app/contexts/ThemeContext";
function App() {
  let searchCategory: string | null = null;
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

  const handleAddToCart = (product: dummyStore, quantity: number = 1) => {
    setCartItems((prev:any) => {
      const existingItem = prev.find((item:any) => item.product.id === product._id);
      if (existingItem) {
        return prev.map((item:any) =>
          item.product._id === product._id
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

  

 
  return (
    // <ThemeProvider>
    <Suspense>
      <div className="min-h-screen w-full">
      
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
    </Suspense>
    // </ThemeProvider>
  );
}

export default App;
