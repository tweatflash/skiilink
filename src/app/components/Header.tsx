import React, { useContext } from 'react';
import { ShoppingCart, Search, Sun, Moon, Menu, X, User, CircleUser, ChevronDownIcon } from 'lucide-react';
import { ThemeContext, useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Button } from './ui/button2';
interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  onSearchChange,
  searchQuery
}) => {
  // const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
   const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error("ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider.");
    }
  const {setSearch}=themeContext;
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-screen mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"}>
          <div className="flex items-center space-x-2">
           <img src="/logo.PNG" alt="Skiilink Logo" className="max-h-6 h-auto w-auto max-w-full"/>
          </div>
          </Link>
          {/* Desktop Navigation */}
          
          <div className="hidden lg:flex items-center gap-6">
            <Button
              variant="ghost"
              className="inline-flex items-center gap-1 h-auto p-0"
            >
              <span className=" font-normal text-black text-base tracking-[0] leading-[normal]">
                Shop
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>

            <Button variant="ghost" className="h-auto p-0">
              <span className=" font-normal text-black text-base tracking-[0] leading-[normal]">
                On Sale
              </span>
            </Button>

            <Button variant="ghost" className="h-auto p-0">
              <span className=" font-normal text-black text-base tracking-[0] leading-[normal]">
                New Arrivals
              </span>
            </Button>

            <Button variant="ghost" className="h-auto p-0">
              <span className=" font-normal text-black text-base tracking-[0] leading-[normal]">
                Brands
              </span>
            </Button>
          </div>
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8 h-full">
            <div className="relative w-full h-full py-3">
              <div
                onClick={()=>setSearch(true)}
                className="w-full px-4 py-2 pl-11 bg-gray-100 text-sm h-full  dark:bg-gray-800  rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 cursor-pointer"
              />
              <Search className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-500" size={18} />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            {/* User */}
            <button
              // onClick={toggleTheme}
              className="p-2.5 rounded-xl  transition-colors duration-200"
              aria-label="User"
            >
               <CircleUser size={20} className="text-gray-600 dark:text-gray-400" />
             
            </button>

            {/* Search Button - Mobile */}
            <button className="md:hidden p-2.5 rounded-xl  transition-colors duration-200 cursor-pointer" onClick={()=>setSearch(true)}>
              <Search size={20} className="text-gray-600 dark:text-gray-400" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-gray-600 transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center animate-pulse">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl  transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="md:hidden pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-11 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          </div>
        </div> */}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden  border-t border-gray-200 dark:border-gray-800 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="products"
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#"
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Account
              </Link>
              <Link
                href="/sign-in"
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;