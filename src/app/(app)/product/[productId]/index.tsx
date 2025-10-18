"use client"
import React, { useContext, useState } from "react";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Zap,
  Award,
  Clock,
} from "lucide-react";
// import { Product } from "../../../types/product";
import { ThemeContext } from "app/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import BackpackCatalog from "app/components/moreToLove";

interface ProductOverviewProps {
  product: dummyStore;
  // onBack: () => void;
  // onAddToCart: (product: Product, quantity: number) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductOverview: React.FC<ProductOverviewProps> = ({
  product,
  // onBack,
  // onAddToCart,
}) => {
  const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error("ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider.");
    }
  const {setCartItems}=themeContext
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");
    const router=useRouter()
  const images = product.image;
  const discountPercentage = product.discountPercentage
    ? Math.round(
        ((product.discountPercentage - product.price) / product.discountPercentage) * 100
      )
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  
  const handleAddToCart = (product: dummyStore, quantity: number = 1) => {
      
      setCartItems((prev:CartItem[]) => {
        const existingItem = prev.find((item:CartItem) => item.product._id === product._id);
        
        if (existingItem) {
          return prev.map((item:CartItem) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          
        }else{
            
            return [...prev, { product, quantity }];
        }
        
      });
    };
    const onBack=()=>{
      router.push('/products')
    }
     
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="">
        <div className="max-screen mx-auto px-4 pt-4">
          <div className="flex w-full no-scrollbar overflow-x-auto items-center space-x-4">
            {/* <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="whitespace-nowrap">Back to Products</span>
            </button> */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="whitespace-nowrap">Products</span>
              <span>/</span>
              <span className="whitespace-nowrap">{product.category}</span>
              <span>/</span>
              <span className="text-gray-900 whitespace-nowrapfont-medium truncate">
                {product.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-screen mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
        

          {/* Product Details */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Product Info */}
            <div>
              {product.brand && (
                <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide mb-2">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold break-all break-words whitespace-pre-wrap text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
               <p className="text-gray-600 mb-4 text-lg leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
              {/* Rating */}
              <div className="flex flex-wrap items-center space-x-4 ">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {product.rating.toFixed(2)} ({product.rating} reviews)
                </span>
              </div>

             
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.discountPercentage ? (
                  <div className="flex flex-col">
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.discountPercentage)}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      Save {formatPrice(product.discountPercentage - product.price)}
                    </span>
                  </div>
                ): null}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-4">
                {product.stock ? (
                  <>
                    <Check size={16} className="text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <Clock size={16} className="text-red-500" />
                    <span className="text-red-600 font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={()=>handleAddToCart(product,quantity)}
                disabled={!product.stock}
                className={`w-full flex items-center justify-center space-x-3 py-2 px-6 rounded-lg font-semibold text-base transition-all duration-200 ${
                  product.stock
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 "
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>
                  {product.stock ? `Add ${quantity} to Cart` : "Out of Stock"}
                </span>
              </button>
            </div>
               
            {/* Trust Indicators */}
            <div className="flex justify-between flex-wrap gap-4 shrink-0">
              <div className="flex  items-center space-x-2 text-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Warranty
                  </p>
                  <p className="text-xs text-gray-600">Protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-600">On orders ₦500k+</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <RotateCcw size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-600">30-day policy</p>
                </div>
              </div>
            </div>
          </div>

            {/* Product Images */}
          <div className="space-y-4 lg:order-2 order-1">
            {/* Main Image */}
            <div className="relative hrpi rounded-2xl overflow-hidden">
              <img
                src={images[selectedImage].url}
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.meta && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                    NEW
                  </span>
                )}
                {product.brand && (
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                    BESTSELLER
                  </span>
                )}
                {discountPercentage > 0 ? (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                    -{discountPercentage}% OFF
                  </span>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                  <Heart
                    size={20}
                    className="text-gray-600 hover:text-red-500"
                  />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                  <Share2
                    size={20}
                    className="text-gray-600 hover:text-blue-500"
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-3 w-full relative h-20 overflow-x-scroll no-scrollbar pb-2">
                <div className="w-fit flex space-x-3 absolute overflow-x-auto no-scrollbar">
                  {images.map((image:any , index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg relative  overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-orange-500 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Product Description
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {product.fullDescription || product.description}
                  </p>

                  {product.features && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Key Features
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {product.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <Check
                                size={16}
                                className="text-green-500 mt-1 flex-shrink-0"
                              />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      General
                    </h4>
                    <dl className="space-y-3">
                      {product.brand && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Brand:</dt>
                          <dd className="font-medium text-gray-900">
                            {product.brand}
                          </dd>
                        </div>
                      )}
                      {product.model && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Model:</dt>
                          <dd className="font-medium text-gray-900">
                            {product.model}
                          </dd>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Weight:</dt>
                          <dd className="font-medium text-gray-900">
                            {product.weight}
                          </dd>
                        </div>
                      )}
                      {product.dimensions && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Dimensions:</dt>
                          <dd className="font-medium text-gray-900">
                            {product.dimensions.width}
                          </dd>
                        </div>
                      )}
                      {product.warrantyInformation && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Warranty:</dt>
                          <dd className="font-medium text-gray-900">
                            {product.warrantyInformation}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {product.features && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map(
                          (spec: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Zap size={14} className="text-orange-500" />
                              <span className="text-gray-700">{spec}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center flex-wrap justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-semibold text-gray-900">
                        {product.rating.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({product.reviews.length} reviews)
                    </span>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Adebayo O.",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "Excellent product! Works exactly as described. Installation was straightforward and the quality is outstanding.",
                    },
                    {
                      name: "Fatima A.",
                      rating: 4,
                      date: "1 month ago",
                      comment:
                        "Very good value for money. The performance has been consistent and reliable. Would recommend to others.",
                    },
                    {
                      name: "Chidi N.",
                      rating: 5,
                      date: "2 months ago",
                      comment:
                        "Top quality product with excellent customer service. Delivery was fast and packaging was secure.",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-semibold text-sm">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <BackpackCatalog/>
      </div>
    </div>
  );
};

export default ProductOverview;
