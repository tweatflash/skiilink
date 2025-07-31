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
type dummyStore={
    _id: number,
    title: string,
    description: string,
    category: string,
    price:number,
    "discountPercentage": number,
    rating: number,
    "stock": number,
    "tags":[any][]
    brand: string,
    "sku": string,
    "weight": number,
    "dimensions": {
        "width": number,
        "height": number,
        "depth": number
    },
    "warrantyInformation": string,
    "shippingInformation": string,
    "availabilityStatus": string,
    "reviews": {
        
        "rating":number ,
        "comment": string,
        "date": string,
        "reviewerName": string,
        "reviewerEmail": string
    }[],
    "returnPolicy": string,
    "minimumOrderQuantity": number,
    "meta": {
        "createdAt": string,
        "updatedAt": string,
        "barcode": string,
        "qrCode": string
    },
    "thumbnail": string,
    "images":string[]
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
type Result={
    pageid: string,
    title: string,
    extract: string,
    thumbnail?:{
        source: string,
        width: number,
        height: number
    }
}
type SearchResult={
    query?:{
        pages?:Result[]
    }
}
type Ddstiew={
    product:dummyStore,
    loggedIn:boolean
}

type Product2={
    products: dummyStore[]
}