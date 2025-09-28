import React, { useContext } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Zap,
  Shield,
  LucideShoppingBag,
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { ThemeContext } from "app/contexts/ThemeContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: dummyStore;
  onAddToCart: (product: dummyStore) => void;
  viewMode?: "grid" | "list";
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const formatPrice = (price: number) => {
  return `NGN ${price.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const ProductCard2: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  viewMode = "grid",
}) => {
  const discountPercentage = product.discountPercentage
    ? Math.round(
        ((product.discountPercentage - product.price) /
          product.discountPercentage) *
          100
      )
    : 0;
  const router = useRouter();
  const handleProductClick = () => {
    router.push("/product/" + product._id);
  };

  // Grid view with enhanced modern design
  return (
    <Card hover className="group cursor-pointer relative my-4 sm:my-1">
      <div className=" w-full max-w-xs bg-white dark:bg-gray-900 rounded-lg  transition duration-300 cursor-pointer">
  {/* Product Image */}
  <div className="hrpi relative w-full aspect-square overflow-hidden rounded-sm">
    <img
      src={product.image[0].url}
      alt={product.title}
      className="w-full h-full object-cover transition-transform duration-300 "
    />
    <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    {product.sku && (
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
        SALE
      </span>
    )}
  </div>

  {/* Product Title */}
  <h3 onClick={()=>handleProductClick()} className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-orange-500 transition-colors">
    {product.title}
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
    {product.discountPercentage ? (
      <span className="text-sm text-gray-500 line-through">
        {formatPrice(product.discountPercentage)}
      </span>
    ) : null}
  </div>

  {/* Optional: Quick Action Buttons */}
  <div className="mt-3 flex gap-2" > 
    <button onClick={() => onAddToCart(product)} className="flex-1 text-xs font-medium bg-orange-500 text-white py-[6px] rounded hover:bg-orange-600 transition">
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

export default ProductCard2;
