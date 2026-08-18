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
    "image":ImageObj[],
    "views":any[]
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



type Product2 ={
  _id: number | string
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  fullDescription?: string
  features?: string[]
  specifications?: string[]
  weight: number
  model: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  image: ImageObj[]
  variant?: string
  // Legacy fields for backward compatibility
  id?: string
  name?: string
  inStock?: boolean
}

type CartItem2 ={
  product: Product2
  quantity: number
}

type ShippingOption ={
  id: string
  name: string
  price: number | string
  estimatedDays: string
  description?: string
  address?:string
  type:string
}

type CustomerDetails ={
  email: string
  firstName: string
  lastName: string
  phone: string
  phone?:any
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    
  }
}
type customerDetails2= {
      phoneNumber:string
      name: string,
      address: string,
      appartment: string,
      states: string,
      shippingMethod: string | null,

    } 

type PaymentDetails ={
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

type Order ={
  id: string
  items: CartItem2[]
  customerDetails: CustomerDetails
  shippingOption: ShippingOption
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  trackingNumber?: string
}
type adminOrder= {
  _id: string
  shippingFee: number
  subtotal: number
  total: number
  orderItems: adminOrderItem[]
  status: string
  user: string
  name: string
  phoneNumber: string
  states: string
  address: string
  appartment: string
  shippingMethod: string
  paymentIntentId: string
  flw_ref: string
  tx_ref: string
  createdAt: string
  updatedAt: string
  __v: number
}

type adminOrderItem= {
  name: string
  image: string
  price: number
  quantity: number
  product: string
  _id: string
}
