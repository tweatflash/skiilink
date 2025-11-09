"use client";

import {
  ChevronDownIcon,
  CircleUser,
  SearchIcon,
  Star,
  StarHalf,
  XIcon,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import Badge from "app/components/ui/Badge";
import { Button } from "app/components/ui/button2";
import { Card, CardContent } from "app/components/ui/card2";
import { NewsletterSection } from "./NewsletterSection";
import { FooterSection } from "./FooterSection";
import { DressStyleSection } from "./dressStyleSection";

import { Separator } from "app/components/ui/separator";
import CategoryCard from "app/components/CategoryCard";
import { categories } from "app/data/products";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../../../lib/formatPrice";
import CustomerReviews from "app/components/customerReviews";

const brandLogos = [
  { src: "/brands/baofeng.png", alt: "Baofeng", className: "" },
  { src: "/brands/dahua.png", alt: "Dahua", className: "h-[40px] w-auto" },
  {
    src: "/brands/starplus.png",
    alt: "Star Plus",
    className: "h-[50px] w-auto",
  },
  {
    src: "/brands/hikvision2.png",
    alt: "Hik Vision",
    className: "h-[25px] w-auto",
  },
  // { src: "/brands/hikvision.png", alt: "Hik Vision", className: "" },
  {
    src: "/brands/salpha.svg",
    alt: "Salpha energy",
    className: "h-[20px] w-auto",
  },
];

const newArrivalsProducts = [
  {
    image: "/images/hithium2.png",
    title: "Hithium HeroEE",
    rating: 3.5,
    price: 350000,
    originalPrice: 400000,
    discount: 20,
  },
  {
    image: "/images/tripleCamera.jpg",
    title: "Triple Lens Solar Camera",
    rating: 4.5,
    price: 140000,
    originalPrice: 160000,
    discount: 30,
  },
  {
    image: "/images/baofeng.png",
    title: "Baofeng C5 Walkie Talkie",
    rating: 3.5,
    price: 25000,
    originalPrice: 30000,
    discount: 20,
  },
  {
    image: "/images/555wPannel.webp",
    title: "555W Solar Panel",
    rating: 4.5,
    price: 155000,
    originalPrice: 160000,
    discount: 30,
  },
];

const topSellingProducts = [
  {
    image:
      "https://res.cloudinary.com/dt6naawfk/image/upload/v1760622592/Post-images/tmp-1-1760622591678_zrkhnk.jpg",
    title: "Solar Bullet Camera",
    rating: 5.0,
    price: 100000,
    originalPrice: 110000,
    discount: 20,
  },
  {
    image:
      "https://res.cloudinary.com/dt6naawfk/image/upload/v1757359074/Post-images/tmp-4-1757359072749_fyvihw.jpg",
    title: "Solar Street Light",
    rating: 5.0,
    price: 42000,
    originalPrice: 38000,
    discount: 20,
  },
  {
    image:
      "https://res.cloudinary.com/dt6naawfk/image/upload/v1756905600/Post-images/tmp-14-1756905599538_x8v9eo.jpg",
    title: "EcoFlow 800W Power Station",
    rating: 5.0,
    price: 750000,
    originalPrice: 800000,
    discount: 750000,
  },
  {
    image:
      "https://res.cloudinary.com/dt6naawfk/image/upload/v1756807681/Post-images/tmp-3-1756807679873_ejekyk.png",
    title: "Tubular Solar Battery",
    rating: 5.0,
    price: 280000,
    originalPrice: 290000,
    discount: 20,
  },
];

const stats = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export default function NewPage() {
  const router = useRouter();
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?sort=${categoryId}`);
  };
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="inline-flex items-start gap-[5.31px]">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <Star fill="orange" stroke="orange" size={20} />;
          } else if (index === fullStars && hasHalfStar) {
            return <StarHalf fill="orange" stroke="orange" size={20} />;
          }
          return null;
        })}
      </div>
    );
  };
  return (
    <div className="bg-white w-full relative flex flex-col">
      {/* Hero Section with Background */}
      <section className="relative w-full bg-[#F2F0F1]">
        <div className="max-w-7xl w-full mx-auto relative">
          {/* <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="absolute w-[7.22%] h-[2.38%] top-[5.03%] left-[87.15%]"
            alt="Vector"
            src="/vector.svg"
          />
          <img
            className="absolute w-[3.89%] h-0 top-[9.86%] left-[52.08%]"
            alt="Vector"
            src="/vector.svg"
          />
        </div> */}

          <div className="relative w-full px-5 md:px-8 pt-12 sm:pt-[103px] pb-12 md:pb-[116px]">
            <div className="max-w-full mx-auto md:max-w-6xl">
              <h2 className="text-center max-w-3xl mx-auto font-bold text-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0] leading-tight mb-6 md:mb-8">
                Smart Security<br/>Solar Simplicity
              </h2>

              <p className="text-center mx-auto font-normal text-[#00000099] text-lg md:text-xl tracking-[0] leading-[22px] mb-6 md:mb-8 max-w-full md:max-w-[545px]">
                We deliver trusted security gadgets and solar gear to protect
                your space and power your lifestyle—effortlessly.
              </p>

              <Button className="bg-black block w-full sm:w-auto text-white rounded-[62px] px-8 md:px-[54px] h-[52px] mx-auto  font-medium text-lg">
                Shop Now
              </Button>

              <div className="flex justify-center mx-auto flex-wrap items-center gap-4 md:gap-8 mt-8 md:mt-12">
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Separator orientation="vertical" />}
                    <div className="inline-flex flex-col items-start">
                      <h1 className=" text-black text-2xl md:text-[40px] tracking-[0] leading-[normal]">
                        {stat.value}
                      </h1>
                      <div className=" font-normal text-[#00000099] text-sm md:text-base tracking-[0] leading-[22px]">
                        {stat.label}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="w-full bg-black py-8 md:py-11 mx-auto ">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[100px] flex flex-wrap items-center justify-center invert md:justify-between gap-6 md:gap-4">
          {brandLogos.map((brand, index) => (
            <img
              key={index}
              className={brand.className}
              alt={brand.alt}
              src={brand.src}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full px-4 py-12 lg:px-16 md:py-[72px] mx-auto max-w-xl md:max-w-2xl lg:max-w-7xl">
        <h2 className=" font-bold text-black text-3xl md:text-5xl text-center tracking-[0] leading-[normal] mb-8 md:mb-[55px]">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-5">
          {newArrivalsProducts.map((product, index) => (
            <Card key={index} className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="w-full aspect-[1/1] relative hrpi bg-[#f0eeed] rounded-[20px] overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    alt={product.title}
                    src={product.image}
                  />
                </div>

                <h3 className=" text-black text-md md:text-lg tracking-[0] leading-[normal] mb-2">
                  {product.title}
                </h3>

                <div className="inline-flex items-center gap-[13px] mb-2">
                  {renderStars(product.rating)}
                  {/* <span className=" font-[boldCal] text-sm tracking-[0] leading-[normal]">
                    <span className="text-black">{product.rating}/</span>
                    <span className="text-[#00000099]">5</span>
                  </span> */}
                </div>

                <div className="inline-flex flex-wrap items-center gap-2.5">
                  <span className=" text-black text-xl md:text-2xl tracking-[0] leading-[normal]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className=" text-[#00000066] text-xl md:text-2xl tracking-[0] leading-[normal] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6 md:mt-9">
          <Button
            variant="outline"
            className="rounded-[62px] w-full sm:w-auto px-8 md:px-[54px] py-3 md:py-4 h-auto md:h-[52px] font-medium text-sm md:text-base border-[#0000001a]"
          >
            View All
          </Button>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto">
        <Separator />
      </div>

      {/* Top Selling Section */}
      <section className="w-full px-4 lg:px-16 py-12 md:py-[72px] mx-auto max-w-xl md:max-w-2xl lg:max-w-7xl">
        <h2 className=" font-bold text-black text-3xl md:text-5xl text-center tracking-[0] leading-[normal] mb-8 md:mb-[55px]">
          Top Selling
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-5">
          {topSellingProducts.map((product, index) => (
            <Card key={index} className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="w-full  aspect-[1/1] bg-[#f0eeed] rounded-[20px] overflow-hidden mb-4 relative hrpi flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    alt={product.title}
                    src={product.image}
                  />
                </div>

                <h3 className=" text-black text-md md:text-lg tracking-[0] leading-[normal] mb-2">
                  {product.title}
                </h3>

                <div className="inline-flex font-[boldCal] items-center gap-[13px] mb-2">
                  {renderStars(product.rating)}
                  {/* <span className=" font-normal text-sm tracking-[0] leading-[normal]">
                    <span className="text-black">{product.rating}/</span>
                    <span className="text-[#00000099]">5</span>
                  </span> */}
                </div>

                <div className="inline-flex flex-wrap items-center gap-2.5">
                  <span className=" font-bold text-black text-xl md:text-2xl tracking-[0] leading-[normal]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className=" font-bold text-[#00000066] text-xl md:text-2xl tracking-[0] leading-[normal] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6 md:mt-9">
          <Button
            variant="outline"
            className="rounded-[62px] w-full sm:w-auto px-8 md:px-[54px] py-3 md:py-4 h-auto md:h-[52px] font-medium text-sm md:text-base border-[#0000001a]"
          >
            View All
          </Button>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-xl md:max-w-2xl lg:max-w-7xl mx-auto lg:px-16 px-4">
          <div className="text-center mb-12">
            <h2 className=" font-bold text-black text-3xl md:text-5xl text-center tracking-[0] leading-[normal] mb-8 md:mb-[55px]">
              Categories
            </h2>
            {/* <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Explore our comprehensive range of solar, security, and electrical
                    products designed for modern living.
                  </p> */}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.slice(0, 8).map((category: any) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <CustomerReviews />
    </div>
  );
}