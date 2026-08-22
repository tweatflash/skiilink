import React, { useContext } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Zap,
  Shield,
  LucideShoppingBag,
  Dot,
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
  return `₦${price.toLocaleString("en-NG", {
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
      <div onClick={()=>handleProductClick()} className=" w-full max-w-xs bg-white dark:bg-gray-900 rounded-lg  transition duration-300 cursor-pointer" >
  {/* Product Image */}
  <div className="hrpi relative w-full aspect-square overflow-hidden rounded-sm">
    <img
      src={product.image[0].url}
      alt={product.title}
      className="size-full object-cover transition-transform duration-300 "
    />
    <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    {product.sku && (
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs  px-2 py-0.5 rounded">
        SALE
      </span>
    )}
  </div>

 

  {/* Rating & Sold Count */}
  <div className="flex items-center gap-1 mt-3">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(product.rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }
      />
    ))}
    <span className="text-xs line-clamp-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md dark:text-gray-400 ml-1">
      {product.category}
    </span>
  </div>
 {/* Product Title */}
  <h3  className="mt-1 med-ivvic text-sm text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-orange-500 transition-colors">
    {product.title}
  </h3>
  {/* Price Section */}
  <div className="mt-1 flex items-center flex-wrap  gap-2">
    <h2 className="text-base price-font font-bold text-red-600 dark:text-red-400">
      ₦{product.price.toLocaleString("en-NG")}
    </h2>
  
    {product.discountPercentage ? (
    <h2 className="text-base price-font font-bold  text-gray-500 line-through">
      {formatPrice(product.discountPercentage)}
    </h2>
    ):null}
   
  </div>

  {/* Optional: Quick Action Buttons */}
  <div className="mt-3 flex gap-2" > 
    <button onClick={() => onAddToCart(product)} className="flex-1 text-xs med-livvic bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_3px_12px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:scale-[0.97] active:shadow-[0_0px_1px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(0,0,0,0.1)] text-white py-[6px] rounded hover:bg-orange-600 transition">
     Buy Now
    </button>
    
    <button className="flex-1 med-livvic active:scale-[0.97] text-xs font-medium bg-gray-200 py-[6px] rounded hover:bg-gray-100 transition">
      Add to Cart
    </button>
  </div>
</div>
    </Card>
  );
};

export default ProductCard2;
