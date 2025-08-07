"use client"
import React, { useState, useMemo } from 'react';

import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import CatalogPage from '../components/CatalogPage';
import ProductOverview from '../components/ProductOverview';
import AdminPanel from '../components/AdminPanel';
import { categories, featuredProducts, bestSellingProducts } from '../data/products';
import { Product, CartItem } from '../types/product';
import { useRouter } from 'next/navigation';
import Header from 'app/components/Header';

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

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
  const router =useRouter()
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`)
    
  };

  const handleShopNow = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCatalog = () => {
    router.push("/products")
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

  // if (currentView === 'catalog') {
  //   return (
  //     // <ThemeProvider>
  //       <div className="min-h-screen bg-gray-50">
  //         <Header
  //           cartItemCount={cartItemCount}
  //           onCartClick={() => setIsCartOpen(true)}
  //           onSearchChange={setSearchQuery}
  //           searchQuery={searchQuery}
  //         />
          
  //         <CatalogPage
  //           onBack={handleBackToHome}
  //           onAddToCart={handleAddToCart}
  //           onProductClick={handleProductClick}
  //           searchQuery={searchQuery}
  //           selectedCategory={selectedCategory}
  //         />

  //         <Cart
  //           isOpen={isCartOpen}
  //           onClose={() => setIsCartOpen(false)}
  //           items={cartItems}
  //           onUpdateQuantity={handleUpdateQuantity}
  //           onRemoveItem={handleRemoveItem}
  //         />
  //       </div>
  //     // </ThemeProvider>
  //   );
  // }

  return (
    // <ThemeProvider>
    <>
      
      
      {/* Admin Access Button - Remove in production */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setCurrentView('admin')}
          className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white rounded-2xl shadow-2xl hover:shadow-gray-900/25 dark:hover:shadow-gray-800/25 transition-all duration-300 text-sm font-semibold backdrop-blur-xl border border-gray-700/50 hover:scale-105"
        >
          Admin Panel
        </button>
      </div>

      <HeroSection onShopNow={handleShopNow} onViewCatalog={handleViewCatalog} />

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Shop by Category</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive range of solar, security, and electrical products designed for modern living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {categories.slice(0, 8).map((category:any) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {selectedCategory ? 'Filtered Products' : searchQuery ? 'Search Results' : 'Featured Products'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {selectedCategory && (
                  <span>
                    Showing products in: <strong>{categories.find((c:any) => c.id === selectedCategory)?.name}</strong>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 underline font-medium"
                    >
                      Clear filter
                    </button>
                  </span>
                )}
                {searchQuery && !selectedCategory && (
                  <span>
                    Search results for: <strong>"{searchQuery}"</strong>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 underline font-medium"
                    >
                      Clear search
                    </button>
                  </span>
                )}
                {!selectedCategory && !searchQuery && 'Discover our most popular and highest-rated products.'}
              </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 underline font-medium"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers - Only show when no filters are active */}
      {!selectedCategory && !searchQuery && (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Best Sellers</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our customers' favorite products - tried, tested, and highly rated.
              </p>  
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {bestSellingProducts.map((product:any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="text-2xl font-bold">Skiilink V.LTD</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-4 leading-relaxed">
                Leading provider of solar, security, and electrical solutions for homes and businesses.
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

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
    // </ThemeProvider>
  );
}

export default App;