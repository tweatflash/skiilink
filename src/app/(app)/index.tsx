"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import {
  categories,
  featuredProducts,
  bestSellingProducts,
} from "../data/products";
import { Product, CartItem } from "../types/product";
import { useRouter } from "next/navigation";
import Header from "app/components/Header";
import ShopByInterest from "app/components/layout/catalogue/shopWithInterest";
import { NewsletterSection } from "app/components/newletter";
import BrandsSection from "app/components/brandsSection";
import Skeleton from "app/components/productSkeleton";
import getWikiResults from "../../../lib/getProducts";
import ProductCard2 from "app/components/ProductCard2";
import { ThemeContext } from "app/contexts/ThemeContext";
import CustomerReviews from "app/components/customerReviews";
import NewPage from "../components/new/new";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState<dummyStore[]>([]);
  const [currentView, setCurrentView] = useState<
    "home" | "catalog" | "product" | "admin"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<dummyStore | null>(
    null
  );

  const allProducts = [...featuredProducts, ...bestSellingProducts];
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const { cartItems, setCartItems } = themeContext;
  const fetchProducts = async () => {
    setLoading(true);
    // setError("")
    const request: Promise<ProductRes> = await getWikiResults("all");
    const response: dummyStore[] | undefined = (await request)?.products;
    if (response) {
      setLoading(false);
      setData([...data, ...response]);
    } else {
      setLoading(false);
      // setError("Failed to load products");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
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

  const handleAddToCart = (product: CartItem["product"], quantity: number) => {
    setCartItems((prev: CartItem[]) => {
      const existingItem = prev.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: product, quantity }];
    });
  };

  const router = useRouter();
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?sort=${categoryId}`);
  };

  const handleShopNow = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewCatalog = () => {
    router.push("/products");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const handleProductClick = (product: dummyStore) => {
    setSelectedProduct(product);
    setCurrentView("product");
  };

  const handleBackToCatalog = () => {
    setCurrentView("catalog");
    setSelectedProduct(null);
  };

  return (
    <NewPage/>  
  );
}

export default App;
