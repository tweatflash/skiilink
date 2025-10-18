import React from 'react';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import Button from './ui/Button';
import Link from 'next/link';
interface HeroSectionProps {
  onShopNow: () => void;
  onViewCatalog: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onViewCatalog }) => {
  return (
    <section className="relative min-h-sc overflow-hidden bg-gray-50 py-20 md:py-32">
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl font-normal leading-tight tracking-tight text-balance md:text-7xl lg:text-8xl">
            Power meets protection
          </h1>
          <p className="mx-auto mt-6 w-full max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Discover cutting-edge solar accessories and security gadgets designed for modern living. Sustainable energy
            solutions and advanced protection for your home.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products">
              <Button size="lg" className="group gap-2 bg-primary hover:bg-primary/90">
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
};

export default HeroSection;