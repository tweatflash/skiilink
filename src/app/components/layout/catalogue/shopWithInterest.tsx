'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryCard {
  id: string;
  title: string;
  href: string;
  image: string;
  isExternal?: boolean;
}

const categories: CategoryCard[] = [
  {
    id: 'business',
    title: 'Security Gadgets',
    href: '/category/business',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=464&h=580&fit=crop'
  },
  {
    id: 'gaming',
    title: 'Electronics',
    href: '/category/gaming',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=464&h=580&fit=crop'
  },
  {
    id: 'education',
    title: 'Solar Products',
    href: '/category/education',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=464&h=580&fit=crop'
  },
  {
    id: 'creative',
    title: 'Modern Life',
    href: '/category/creative',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=464&h=580&fit=crop'
  }
];

const ShopByInterest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const maxIndex = Math.max(0, categories.length - itemsPerView.desktop);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section 
      className="py-12 lg:py-20 bg-[#0d3a38] dark:bg-gray-900 overflow-hidden"
      aria-label="Shop by interest"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-0 ">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className=" text-3xl lg:text-4xl font-bold text-white mb-4">
            Shop by Interest
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover products tailored to your passions and lifestyle
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="overflow-hidden">
            <div 
              className="grid grid-cols-2 lg:flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`
              }}
            >
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className={`hidden absolute inset-y-0 left-0 right-0 lg:flex items-center justify-between pointer-events-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-200 transform -translate-x-6 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                canGoPrevious 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-600' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
              }`}
              aria-label="Previous categories"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-200 transform translate-x-6 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
                canGoNext 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-600' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
              }`}
              aria-label="Next categories"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="hidden lg:flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-110'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-orange-300 dark:hover:bg-orange-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: CategoryCard;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const CardWrapper = category.isExternal ? 'a' : Link;
  const cardProps = category.isExternal 
    ? { 
        href: category.href, 
        target: '_blank', 
        rel: 'noopener noreferrer' 
      }
    : { 
        href: category.href 
      };

  return (
    <div className="flex-none w-full lg:w-1/3 px-2 lg:px-3 py-4 lg:py-0">
      <CardWrapper
        {...cardProps}
        className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform  focus:outline-none focus:ring-4 focus:ring-orange-500/20"
        aria-label={`Shop ${category.title} products`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">
              {category.title}
            </h3>
            
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardWrapper>
    </div>
  );
};

export default ShopByInterest;