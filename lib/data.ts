export interface Category {
  id: string
  name: string
  description: string
  icon: string
  image?: string
  productCount: number
  featured: boolean
  color: string
}

export const categories: Category[] = [
  {
    id: "solar-panels",
    name: "Solar Panels",
    description: "High-efficiency solar panels for residential and commercial use",
    icon: "Sun",
    image:
      "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 156,
    featured: true,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "solar-batteries",
    name: "Solar Batteries",
    description: "Energy storage solutions for solar power systems",
    icon: "Battery",
    image:
      "https://images.pexels.com/photos/9875456/pexels-photo-9875456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 89,
    featured: true,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "inverters",
    name: "Inverters",
    description: "Power inverters for converting DC to AC electricity",
    icon: "Zap",
    image:
      "https://images.pexels.com/photos/9875423/pexels-photo-9875423.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 67,
    featured: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "security-cameras",
    name: "Security Cameras",
    description: "Advanced surveillance systems for home and business",
    icon: "Camera",
    image:
      "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 234,
    featured: true,
    color: "from-slate-500 to-gray-500",
  },
  {
    id: "led-lights",
    name: "LED Lights",
    description: "Energy-efficient LED lighting solutions",
    icon: "Lightbulb",
    image:
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 178,
    featured: false,
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "electrical-tools",
    name: "Electrical Tools",
    description: "Professional tools for electrical work and installation",
    icon: "Wrench",
    image:
      "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 145,
    featured: false,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "smart-home",
    name: "Smart Home",
    description: "Intelligent home automation and control systems",
    icon: "Home",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 92,
    featured: false,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "cables-wires",
    name: "Cables & Wires",
    description: "High-quality electrical cables and wiring solutions",
    icon: "Cable",
    image:
      "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    productCount: 203,
    featured: false,
    color: "from-gray-500 to-slate-500",
  }, 
]

export const products: any[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/premium-wireless-headphones.png",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch.png",
    description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/organic-cotton-t-shirt.jpg",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    category: "clothing",
    inStock: true,
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    price: 899.99,
    image: "/professional-camera-lens.jpg",
    description: "High-performance camera lens for professional photography.",
    category: "electronics",
    inStock: false,
  },
]

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    estimatedDays: "5-7 business days",
    description: "Regular delivery service",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 12.99,
    estimatedDays: "2-3 business days",
    description: "Faster delivery service",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 24.99,
    estimatedDays: "1 business day",
    description: "Next day delivery",
  },
]

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08 // 8% tax rate
}
