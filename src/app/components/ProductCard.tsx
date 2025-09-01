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
    router.push("/products/688fe27c8552f5ced64ce93a")
   
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
    <Card hover className="group">
      <div className="relative cursor-pointer border border-gray-200 rounded-lg" onClick={handleProductClick}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg aspect-square object-cover bg-white transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        {/* <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <Badge variant="new" className="animate-pulse shadow-lg">
              NEW
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="bestseller" className="shadow-lg">
              BESTSELLER
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="error" className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
              -{discountPercentage}% OFF
            </Badge>  
          )}
        </div> */}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <button className="p-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-110 transition-all duration-200 border border-white/20">
            <Heart size={16} className="text-gray-600 dark:text-gray-400 hover:text-red-500" />
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-110 transition-all duration-200 border border-white/20"
            >
              <Eye size={16} className="text-gray-600 dark:text-gray-400 hover:text-blue-500" />
            </button>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="error" size="lg" className="shadow-xl">
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Energy Efficiency Indicator */}
        {product.category === 'solar-panels' && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-green-500/95 backdrop-blur-xl text-white px-3 py-1.5 rounded-2xl shadow-lg border border-green-400/30">
            <Zap size={14} />
            <span className="text-xs">Eco-Friendly</span>
          </div>
        )}
      </div>

      <div className="py-4 ">
        <div className="mb-2 cursor-pointer" onClick={handleProductClick}>
          <div className="sm:rrrflex items-start justify-between mb-2">
            <h3 className=" text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate line-clamp-2 text-sm sm:text-base leading-tight">
              {product.name}
            </h3>
            {/* {product.warranty && (
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-xl ml-2 border border-green-200 dark:border-green-800">
                <Shield size={12} />
                <span className="text-xs font-semibold">Warranty</span>
              </div>
            )} */}
          </div>
          {/* {product.brand && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">{product.brand}</p>
          )} */}
        </div>
        
       

        {/* Rating */}
        <div className="flex items-center flex-wrap gap-2 mb-2">
          <div className="flex  items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current drop-shadow-sm'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {product.rating.toFixed(2)} | {product.reviews}+ sold
          </span>
        </div>

        {/* Key Features */}
        {/* {product.specifications && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.specifications.slice(0, 2).map((spec, index) => (
              <Badge
                key={index}
                variant="default"
                size="sm"
              >
                {spec}
              </Badge>
            ))}
          </div>
        )} */}

        {/* Price */}
        <div className="flex items-center justify-between mb-0">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {/* <Button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          variant={product.inStock ? 'primary' : 'secondary'}
          className="hidden sm:mt-3 sm:flex w-full"
          size="lg"
        >
          <ShoppingCart size={16} />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </Button> */}
      </div>
    </Card>
  );
};

export default ProductCard;