"use client";
import { useContext, useEffect, useState } from "react";
import ProductCard2 from "./ProductCard2";
import { Button } from "./ui/button2";
import getWikiResults from "../../../lib/getProducts";
import { ThemeContext } from "app/contexts/ThemeContext";
export default function BackpackCatalog() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<dummyStore[]>([]);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
    );
  }
  const { cartItems, setCartItems } = themeContext;
  const fetchProducts = async () => {
    setLoading(true);
    // setError("")
    const request: Promise<ProductRes> = await getWikiResults("all");
    const response: dummyStore[] | undefined = (await request)?.products;
    if (response) {
      setLoading(false);
      setProducts([...products, ...response]);
    } else {
      setLoading(false);
      // setError("Failed to load products");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleAddToCart = (product: CartItem["product"], quantity: number) => {
    setCartItems((prev: CartItem[]) => {
      const existingItem = prev.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: product, quantity }];
    });
  };
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-screen">
        {/* Header Section */}
        <div className="mb-12 flex items-start justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              MORE PRODUCT
            </p>
            <h1 className="mb-4 text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
              Explore More Products
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Explore a variety of backpacks designed for comfort, durability,
              and style, ideal for travel, hiking, or daily use.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-border bg-background text-sm font-medium hover:bg-accent"
          >
            Show More
          </Button>
        </div>

        <div className="grid gap-x-4 sm:gap-y-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard2
              product={product}
              key={product._id}
              onAddToCart={() => handleAddToCart(product, 1)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
