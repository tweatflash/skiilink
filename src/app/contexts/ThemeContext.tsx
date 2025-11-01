import React, { createContext, useContext, useEffect, useState,SetStateAction ,Dispatch, useRef,type ReactNode} from "react";

import checkLoggedInStatus from '../../../lib/checkLoggedin'
import Cookies from "js-cookie";
type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  authError: {
    show: boolean;
    error: string;
  };
  setAuthError: any;
  cartItems:CartItem[];
  setCartItems:Dispatch<SetStateAction<any>>;
  catalogueProducts:dummyStore[]
  setCatalogueProducts:Dispatch<SetStateAction<any>>; 
  isCartOpen:boolean;
  setIsCartOpen: Dispatch<SetStateAction<any>>;
  searchQuery:string;
  setSearchQuery:any;
  handleUpdateQuantity:any;
  handleRemoveItem:any
  loggedIn:{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}
  setLoggedIn:Dispatch<SetStateAction<{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}>>
  search:boolean
  setSearch:Dispatch<SetStateAction<boolean>>
  getSubtotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return (
        saved ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });
  const [authError, setAuthError] = useState({
    show: false,
    error: "",
  });
  const cookies=Cookies.get("RFTFL")
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const [cartItems, setCartItems] = useState([]);
  const [catalogueProducts, setCatalogueProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search,setSearch]=useState(false)
  const [userAuth,setUserAuth]=useState<UserRoot | {}>({})
    const [isLoaded, setIsLoaded] = useState(false)
  const [loggedIn,setLoggedIn]=useState<{"boolean":"pending"|"true" |"false" ,"role":"user" | "admin" | null}>({"boolean":"pending", "role":null})
  useEffect(()=>{
    if (cookies) {
      setLoggedIn({"boolean":"pending", "role":null})
      
    }else{
      setLoggedIn({"boolean":"false", "role":null})
    }
  },[])
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart-items-storage")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCartItems(parsed.cartItems || [])
        console.log(parsed)
      } catch (e) {
        console.error("Failed to parse cart storage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart-items-storage", JSON.stringify({ cartItems }))
    }
  }, [cartItems, isLoaded])
   const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev:any) =>
      prev.map((item:any) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter((item:any) => item.product.id !== productId));
  };

  const clearCart = () => setCartItems([])

  const getSubtotal = () => {
    return cartItems.reduce((total, item:CartItem) => total + item.product.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return cartItems.reduce((total, item:CartItem) => total + item.quantity, 0)
  }

  const ranOnce = useRef(false);
    const Authentication=async ()=>{
    const request=await checkLoggedInStatus()
    const response:UserRoot | undefined =await request?.data
    console.log(request)
    if (request === undefined ){
       setLoggedIn({"boolean":"false", "role":null})
    }else if (request.status && request.status===200){
        if (response?.user.role==="admin"){
          setLoggedIn({"boolean":"true", "role":"admin"})
        }else{
          setLoggedIn({"boolean":"true", "role":"user"})
        }
    }else if (request.status && request.status===500){
     
    }

  }
  
  useEffect(()=>{
    if (!ranOnce.current) {
      Authentication();
      ranOnce.current = true;
    }

  },[])
  return (
    <ThemeContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        catalogueProducts,
        setCatalogueProducts,
        theme,
        toggleTheme,
        authError,
        setAuthError,
        cartItems,
        setCartItems,
        isCartOpen, 
        setIsCartOpen,
        searchQuery, 
        setSearchQuery,
        handleUpdateQuantity,
        handleRemoveItem,
        search,
        setSearch,
        getSubtotal,
        getItemCount,
        clearCart
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
interface CartContextType {
  items: CartItem2[]
  addItem: (product: Product2) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
   const product: Product2 = {
  _id: "abc123",
  title: "Smartphone X200",
  description: "A sleek and powerful smartphone with cutting-edge features.",
  category: "Electronics",
  price: 799.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 120,
  tags: ["smartphone", "electronics", "mobile", "X200"],
  brand: "TechNova",
  sku: "TN-X200-BLK",
  fullDescription: "The Smartphone X200 combines style, speed, and innovation. With a high-resolution display, advanced camera system, and long-lasting battery, it's perfect for tech enthusiasts.",
  features: [
    "6.7-inch OLED display",
    "Triple-lens rear camera",
    "5G connectivity",
    "Fast charging",
    "Face recognition"
  ],
  specifications: [
    "Processor: Octa-core 3.1GHz",
    "RAM: 8GB",
    "Storage: 256GB",
    "Battery: 4500mAh",
    "OS: Android 13"
  ],
  image:[{
    url: "https://res.cloudinary.com/dt6naawfk/image/upload/v1754584716/Post-images/tmp-1-1754584715767_nevtgm.jpg",
    width: 500,
    height: 1000,
    aspectRatio: 0.5,
    _id: "img1",
    id: "img1",
  }],
  weight: 0.18,
  model: "X200",
  dimensions: {
    width: 75.4,
    height: 161.3,
    depth: 7.9
  },
  warrantyInformation: "2-year limited warranty covering manufacturing defects.",
  shippingInformation: "Ships within 3–5 business days. Free shipping on orders over $500.",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 5,
      comment: "Absolutely love this phone! Great camera and battery life.",
      date: "2025-09-15",
      reviewerName: "Jane Doe",
      reviewerEmail: "jane.doe@example.com"
    },
    {
      rating: 4,
      comment: "Solid performance, but wish it had expandable storage.",
      date: "2025-09-20",
      reviewerName: "John Smith",
      reviewerEmail: "john.smith@example.com"
    }
  ],
  returnPolicy: "30-day return policy. Item must be in original condition.",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-10-01T12:00:00Z",
    barcode: "1234567890123",
    qrCode: "https://example.com/qrcode/x200"
  },
  thumbnail: "https://res.cloudinary.com/dt6naawfk/image/upload/v1754584716/Post-images/tmp-1-1754584715767_nevtgm.jpg"
}
  const product2: Product2 ={
  _id: 2025,
  title: "UltraView 27\" 4K Monitor",
  description: "A professional-grade 4K UHD monitor with vibrant color accuracy.",
  category: "Computers & Accessories",
  price: 499.99,
  discountPercentage: 15,
  rating: 4.7,
  stock: 85,
  tags: ["monitor", "4K", "UHD", "display", "UltraView"],
  brand: "PixelPro",
  sku: "PP-UV27-4K",
  fullDescription: "Designed for creatives and professionals, the UltraView 27\" delivers stunning visuals with 99% AdobeRGB coverage and HDR10 support.",
  features: [
    "27-inch IPS panel",
    "3840x2160 resolution",
    "HDR10 support",
    "USB-C and HDMI ports",
    "Adjustable stand"
  ],
  specifications: [
    "Panel Type: IPS",
    "Refresh Rate: 60Hz",
    "Response Time: 5ms",
    "Connectivity: HDMI x2, USB-C, DisplayPort",
    "Color Accuracy: 99% AdobeRGB"
  ],
  weight: 5.2,
  model: "UV27-4K",
  dimensions: {
    width: 61.2,
    height: 45.3,
    depth: 18.5
  },
  warrantyInformation: "3-year warranty with on-site support.",
  shippingInformation: "Ships in 2–4 business days. Free shipping available.",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 5,
      comment: "Perfect for photo editing. Colors are spot on!",
      date: "2025-08-12",
      reviewerName: "Amina Yusuf",
      reviewerEmail: "amina.y@example.com"
    },
    {
      rating: 4,
      comment: "Great display, but the stand could be sturdier.",
      date: "2025-09-03",
      reviewerName: "David Okoro",
      reviewerEmail: "d.okoro@example.com"
    }
  ],
  returnPolicy: "Return within 14 days for a full refund.",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2025-07-20T09:30:00Z",
    updatedAt: "2025-09-25T14:45:00Z",
    barcode: "9876543210987",
    qrCode: "https://images.pexels.com/qrcode/uv27"
  },
  thumbnail: "https://res.cloudinary.com/dt6naawfk/image/upload/v1757257001/Post-images/tmp-1-1757257000721_zr4klv.jpg",
  image: [
    {
      url: "https://res.cloudinary.com/dt6naawfk/image/upload/v1757257001/Post-images/tmp-1-1757257000721_zr4klv.jpg",
      width: 800,
      height: 600,
      aspectRatio: 1.33,
      _id: "img2",
      id: "img2"
    },
    {
      url: "https://images.pexels.com/images/uv27-side.jpg",
      width: 800,
      height: 600,
      aspectRatio: 1.33,
      _id: "img3",
      id: "img3"
    }
  ],
  id: "2025",
  name: "UltraView 27\" 4K Monitor",
  inStock: true
};
  const [items, setItems] = useState<CartItem2[]>([{ product:product, quantity: 3 },{ product:product2, quantity: 1 }])
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart-storage")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setItems(parsed.items || [])
      } catch (e) {
        console.error("Failed to parse cart storage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart-storage", JSON.stringify({ items }))
    }
  }, [items, isLoaded])

  const addItem = (product: Product2) => {
    const productId = product.id || product._id?.toString() || ""
    const existingItem = items.find((item) => {
      const itemId = item.product.id || item.product._id?.toString() || ""
      return itemId === productId
    })

    if (existingItem) {
      setItems(
        items.map((item) => {
          const itemId = item.product.id || item.product._id?.toString() || ""
          return itemId === productId ? { ...item, quantity: item.quantity + 1 } : item
        }),
      )
    } else {
      setItems([...items, { product, quantity: 1 }])
    }
  }

  const removeItem = (productId: string) => {
    setItems(
      items.filter((item) => {
        const itemId = item.product.id || item.product._id?.toString() || ""
        return itemId !== productId
      }),
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems(
      items.map((item) => {
        const itemId = item.product.id || item.product._id?.toString() || ""
        return itemId === productId ? { ...item, quantity } : item
      }),
    )
  }

  const clearCart = () => setItems([])

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartStore() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartStore must be used within CartProvider")
  }
  return context
}

// Checkout Context
interface CheckoutContextType {
  currentStep: number
  customerDetails: customerDetails2 | null
  selectedShipping: ShippingOption | null
  order: Order | null
  setStep: (step: number) => void
  setCustomerDetails: (details: customerDetails2,item?:any,data?:any) => void
  setShippingOption: (option: ShippingOption) => void
  setOrder: (order: Order) => void
  reset: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [customerDetails, setCustomerDetailsState] = useState<customerDetails2 | null>(null)
  const [selectedShipping, setSelectedShippingState] = useState<ShippingOption | null>(null)
  const [order, setOrderState] = useState<Order | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("checkout-storage")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCurrentStep(parsed.currentStep || 1)
        setCustomerDetailsState(parsed.customerDetails || null)
        setSelectedShippingState(parsed.selectedShipping || null)
        setOrderState(parsed.order || null)
      } catch (e) {
        console.error("Failed to parse checkout storage", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "checkout-storage",
        JSON.stringify({
          currentStep,
          customerDetails,
          selectedShipping,
          order,
        }),
      )
    }
  }, [currentStep, customerDetails, selectedShipping, order, isLoaded])

  const setStep = (step: number) => setCurrentStep(step)
  const setCustomerDetails = (details: customerDetails2,item?:any,data?:any) => setCustomerDetailsState(details)
  const setShippingOption = (option: ShippingOption) => setSelectedShippingState(option)
  const setOrder = (orderData: Order) => setOrderState(orderData)

  const reset = () => {
    setCurrentStep(1)
    setCustomerDetailsState(null)
    setSelectedShippingState(null)
    setOrderState(null)
  }

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        customerDetails,
        selectedShipping,
        order,
        setStep,
        setCustomerDetails,
        setShippingOption,
        
        setOrder,
        reset
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckoutStore() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckoutStore must be used within CheckoutProvider")
  }
  return context
}
