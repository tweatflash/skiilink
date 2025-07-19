export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  description: string;
  fullDescription?: string;
  specifications?: string[];
  features?: string[];
  warranty?: string;
  brand?: string;
  model?: string;
  weight?: string;
  dimensions?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}