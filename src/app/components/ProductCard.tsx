import React, { useContext } from 'react';
import { Star, ShoppingCart, Heart, Eye, Zap, Shield } from 'lucide-react';
import { Product } from '../types/product';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { ThemeContext } from 'app/contexts/ThemeContext';
import { useRouter } from 'next/navigation';


interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onProductClick,
  viewMode = 'grid' 
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const router=useRouter()
  const handleProductClick = () => {
    router.push("/product/688fe27c8552f5ced64ce93a")
   
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48 sm:h-56 flex-shrink-0 cursor-pointer" onClick={handleProductClick}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product.isNew && (
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  BESTSELLER
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                <Heart size={16} className="text-gray-600 hover:text-red-500" />
              </button>
              {onQuickView && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                >
                  <Eye size={16} className="text-gray-600 hover:text-blue-500" />
                </button>
              )}
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 cursor-pointer" onClick={handleProductClick}>
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.brand && (
                    <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
                  )}
                </div>
                {product.warranty && (
                  <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <Shield size={12} />
                    <span className="text-xs font-medium">Warranty</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Rating
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div> */}

              {/* Key Features */}
              {product.specifications && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.specifications.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onAddToCart && onAddToCart(product)}
                  disabled={!product.inStock}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                    product.inStock
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view with enhanced modern design
  return (
   <Card hover className="group cursor-pointer relative my-4 sm:my-1">
      <div className=" w-full max-w-xs  dark:bg-gray-900 rounded-lg  transition duration-300 cursor-pointer">
  {/* Product Image */}
  <div className="hrpi relative w-full aspect-square overflow-hidden rounded-2xl">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-300 "
    />
    <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    {product.isNew && (
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
        SALE
      </span>
    )}
  </div>

  {/* Product Title */}
  <h3 onClick={()=>handleProductClick()} className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-orange-500 transition-colors">
    {product.name}
  </h3>

  {/* Rating & Sold Count */}
  <div className="flex items-center gap-1 mt-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(product.rating)
            ? "text-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }
      />
    ))}
    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
      (200+ sold)
    </span>
  </div>

  {/* Price Section */}
  <div className="mt-2 flex items-center flex-wrap gap-2">
    <span className="text-lg font-bold text-red-600 dark:text-red-400">
      NGN {product.price.toLocaleString("en-NG")}
    </span>
    {product.discount ? (
      <span className="text-sm text-gray-500 line-through">
        {formatPrice(product.originalPrice ? product.originalPrice:0)}
      </span>
    ) : null}
  </div>

  {/* Optional: Quick Action Buttons */}
  <div className="mt-3 flex gap-2" > 
    <button className="flex-1 text-xs font-medium bg-orange-500 text-white py-[6px] rounded hover:bg-orange-600 transition">
      Add to Cart
    </button>
    <button className="flex-1 text-xs font-medium border border-gray-300 dark:border-gray-600 py-[6px] rounded hover:border-orange-500 transition">
      Wishlist
    </button>
  </div>
</div>
    </Card>
  );
};

export default ProductCard;