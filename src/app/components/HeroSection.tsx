import React from 'react';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import Button from './ui/Button';

interface HeroSectionProps {
  onShopNow: () => void;
  onViewCatalog: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onViewCatalog }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'url("images/image_1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Power Your Future with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                  {' '}Clean Energy
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 leading-relaxed max-w-2xl">
                Discover premium solar panels, batteries, security systems, and electrical solutions. 
                Transform your home or business with sustainable, reliable technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onShopNow}
                size="xl"
                className="group bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 hover:from-orange-600 hover:via-orange-700 hover:to-yellow-600 shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="font-semibold">Shop Now</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                onClick={onViewCatalog}
                variant="outline"
                size="xl"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
              >
                View Catalog
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-700/50">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                  <Shield className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">25-Year</p>
                  <p className="text-sm text-gray-400">Warranty</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <Truck className="text-blue-400" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Free</p>
                  <p className="text-sm text-gray-400">Shipping</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors">
                  <Award className="text-yellow-400" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Expert</p>
                  <p className="text-sm text-gray-400">Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-3xl"></div>
                <img
                src="images/image_3.jpg"
                alt="Solar Panel Installation"
                className="relative rounded-3xl shadow-2xl border border-white/10"
                />
              <div className="absolute -bottom-6 -left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">10,000+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;