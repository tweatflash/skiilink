"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Heart,
  Star,
  Truck,
  RotateCcw,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeContext } from "app/contexts/ThemeContext";

interface ProductDetailsProps {
  product: dummyStore;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const { setCartItems } = themeContext;
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.price);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    setTotal(quantity * Number(product.price || 0));
  }, [product, quantity]);

  const handleAddToCart = () => {
    setCartItems((prev: CartItem[]) => {
      const existingItem = prev.find(
        (item: CartItem) => item.product._id === product._id
      );
      if (existingItem) {
        return prev.map((item: CartItem) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const images = product.image ?? [];

  // Optional fields — safe to leave unset on `dummyStore` for now.
  // These simply stay hidden until the field exists on the product.
  const rating = (product as any).rating as number | undefined;
  const reviewCount = (product as any).reviewCount as number | undefined;
  const colorOptions = (product as any).colors as
    | { name: string; hex: string }[]
    | undefined;
  const specs = (product as any).specs as string | undefined;
  const materials = (product as any).materials as string | undefined;
  const whatsInBox = (product as any).whatsInBox as string | undefined;

  // Kept as your original field name (product.discountPercentage), used the
  // same way it already was: as the pre-discount "compare at" price.
  const compareAtPrice = product.discountPercentage
    ? Number(product.discountPercentage)
    : 0;
  const unitSavings = compareAtPrice ? compareAtPrice - Number(product.price) : 0;

  const infoSections = [
    { key: "specs", title: "Specs and Compatibility", content: specs },
    { key: "materials", title: "Materials and Sustainability", content: materials },
    { key: "box", title: "In the Box", content: whatsInBox },
    {
      key: "notice",
      title: "Delivery Notice",
      content:
        "Once you complete payment, your order will be confirmed and prepared for delivery. For enquiries or complaints, contact our support team.",
    },
  ];

  return (
    <div className="relative w-full px-4 sm:px-10 bg-white flex justify-center min-h-screen">
      <div className="relative max-w-[550px] lg:max-w-[1360px] w-full h-fit pt-6 lg:pt-10 pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm title-font text-(--secondary) mb-6">
          <Link href="/" className="hover:text-black text-sm transition-colors">
            All&nbsp;products
          </Link>
          {/* <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/?category=${encodeURIComponent(product.category)}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </Link> */}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black text-sm font-medium truncate">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Image gallery grid */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {images.map((img, i) => (
              <div
                key={i}
                className="hrpi relative aspect-square bg-gray-100 rounded-2xl overflow-hidden"
              >
                {i === 0 && compareAtPrice ? (
                  <span className="absolute top-3 left-3 z-10 bg-white text-black text-sm px-2.5 py-1 rounded-md shadow-sm">
                    Sale
                  </span>
                ) : null}
                {i === 0 ? (
                  <button
                    onClick={() => setIsWishlisted((w) => !w)}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 z-10 size-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`}
                    />
                  </button>
                ) : null}
                <Image
                  src={img.url}
                  alt={product.title}
                  sizes="50vw"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {images.length==1 ? [1,2,3].map(item=>(
              <div className="hrpi relative aspect-square bg-gray-100 rounded-2xl overflow-hidden"></div>
            )):<></>
            }
          </div>

          {/* Details column */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-(--secondary) leading-body tracking-body title-font">
                {product.category}
              </p>
              <h2 className="text-3xl leading-[1.2] tracking-[-0.02em] text-black bold-livvic">
                {product.title}
              </h2>
            </div>

            {rating ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(rating) ? "fill-black text-black" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {reviewCount ? (
                  <span className="text-sm title-font text-(--secondary) underline underline-offset-2">
                    {reviewCount}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="flex items-baseline price-font gap-3 flex-wrap">
              <span className="text-3xl tracking-[-0.04em] tt text-black">
                {formatPrice(total)}
              </span>
              {compareAtPrice ? (
                <>
                  <span className="text-lg price-font title-font text-red-600 line-through">
                    {formatPrice(compareAtPrice * quantity)}
                  </span>
                  {unitSavings > 0 ? (
                    <span className="text-sm price-font text-green-600">
                      {formatPrice(unitSavings * quantity)} off
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>

            {colorOptions?.length ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm title-font font-medium text-(--secondary)">
                  Color
                </span>
                <div className="flex items-center gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.name}
                      title={c.name}
                      aria-label={c.name}
                      className="size-7 rounded-full border border-gray-200"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <span
              className={`text-sm font-medium title-font ${
                product.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock ? "In stock. Ready to ship" : "Out of stock"}
            </span>

            <div className="flex items-center gap-3">
              <button
                disabled={!product.stock}
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-full custom3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {justAdded ? "Added ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => setIsWishlisted((w) => !w)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="size-12 flex-shrink-0 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            <button
              disabled={!product.stock}
              onClick={() => {
                handleAddToCart();
                router.push("/checkout");
              }}
              className="w-full text-center text-sm font-medium underline underline-offset-4 text-(--secondary) hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy now, skip the cart
            </button>

            <div>
              <p className="text-sm title-font font-medium text-(--secondary) mb-3">
                Quantity
              </p>
              <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4 text-black" />
                </button>
                <span className="w-12 text-black text-center font-medium title-font tracking-body leading-body">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-2 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-4 text-sm title-font">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 mt-0.5 text-(--secondary) flex-shrink-0" />
                <span className="text-(--secondary)">
                  Free standard shipping (3-5 business days) on qualifying orders.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 mt-0.5 text-(--secondary) flex-shrink-0" />
                <span className="text-(--secondary)">
                  Free returns within 30 days of your purchase.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-(--secondary) leading-body tracking-body title-font">
                Description
              </span>
              <p className="text-(--secondary) p-4 bg-gray-200 rounded-2xl leading-body tracking-body title-font">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200">
              {infoSections.map((section) => (
                <div key={section.key} className="border-b border-gray-200">
                  <button
                    onClick={() =>
                      setOpenSection((s) => (s === section.key ? null : section.key))
                    }
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="title-font font-medium text-black">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-(--secondary) transition-transform ${
                        openSection === section.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === section.key ? (
                    <p className="pb-4 text-(--secondary) leading-body tracking-body title-font">
                      {section.content || "Details coming soon for this product."}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;