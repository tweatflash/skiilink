type Ddstiew={
    product:dummyStore,
    loggedIn:boolean
}
type dummyStore={
    "_id": number | string,
    "title": string,
    "description": string,
    "category": string,
    "price":number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "tags":[    ][]
    "brand": string,
    "sku": string,
    "fullDescription"?:string,
    "features"?:string[],
    "specifications"?:string[],
    "weight": number,
    "model":string,
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
    "image":ImageObj[]
}
type ImageObj={
    "url": string,
    "width": number,
    "height": number,
    "aspectRatio": number,
    "_id": string,
    "id": string
}
type ProductRes={
    products: dummyStore[]
}
type ProductF ={
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
type CartItem ={
  product: dummyStore;
  quantity: number;
}
type UserRoot ={
  user: UserAuth
  notificationsCount: number
}

type UserAuth ={
  _id: string
  name: string
  email: string
  dateOfBirth: string
  googleId: string
  homeTown: string
  role: string
  location: string
  language: string
  isVerified: boolean
  verificationToken: string
  createdAt: string
  updatedAt: string
  __v: number
}
