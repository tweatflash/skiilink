"use client"
import React, { useState, useMemo } from 'react';



import { categories, featuredProducts, bestSellingProducts } from '../data/products';
import { Product, CartItem } from '../types/product';
import CategoryCard from 'app/components/CategoryCard';
import ProductCard from 'app/components/ProductCard';
import Cart from 'app/components/Cart';
import CatalogPage from 'app/components/CatalogPage';
import ProductOverview from 'app/components/ProductOverview';
import AdminPanel from 'app/components/AdminPanel';
import Header from 'app/components/Header';
import { ThemeProvider } from 'app/contexts/ThemeContext';
import HeroSection from 'app/components/HeroSection';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'product' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts = [...featuredProducts, ...bestSellingProducts];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory, allProducts]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
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
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('catalog');
  };

  const handleShopNow = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCatalog = () => {
    setCurrentView('catalog');
    setSelectedCategory(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToCatalog = () => {
    setCurrentView('catalog');
    setSelectedProduct(null);
  };

  // Check if admin view is requested (you can add authentication logic here)
  const isAdminView = currentView === 'admin'

  if (isAdminView) {
    return (
      // <ThemeProvider>
        <AdminPanel />
      // </ThemeProvider>
    );
  }

  if (currentView === 'product' && selectedProduct) {
    return (
      // <ThemeProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            cartItemCount={cartItemCount}
            onCartClick={() => setIsCartOpen(true)}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          
          <ProductOverview
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onAddToCart={handleAddToCart}
          />

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      // </ThemeProvider>
    );
  }

  if (currentView === 'catalog') {
    return (
      // <ThemeProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            cartItemCount={cartItemCount}
            onCartClick={() => setIsCartOpen(true)}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          
          <CatalogPage
            onBack={handleBackToHome}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      // </ThemeProvider>
    );
  }

  return (
    // <ThemeProvider>
        <div className="min-h-screen bg-gray-50">
          <div className='w-full relative'>
          <Header
            cartItemCount={cartItemCount}
            onCartClick={() => setIsCartOpen(true)}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          </div>
          <CatalogPage
            onBack={handleBackToHome}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      // </ThemeProvider>
  );
}

export default App;