import { Order, DashboardStats, SalesData, TopProduct, Customer } from '../types/admin';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Adebayo Johnson',
    customerEmail: 'adebayo.j@email.com',
    customerPhone: '+234 801 234 5678',
    items: [
      {
        productId: '1',
        productName: 'Monocrystalline Solar Panel 400W',
        productImage: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 2,
        price: 449850,
        total: 899700
      },
      {
        productId: '2',
        productName: 'Lithium Solar Battery 100Ah',
        productImage: 'https://images.pexels.com/photos/9875456/pexels-photo-9875456.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 1,
        price: 899850,
        total: 899850
      }
    ],
    total: 1799550,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: {
      street: '123 Victoria Island Road',
      city: 'Lagos',
      state: 'Lagos State',
      zipCode: '101001',
      country: 'Nigeria'
    },
    orderDate: new Date('2024-01-15'),
    estimatedDelivery: new Date('2024-01-20'),
    trackingNumber: 'TRK123456789',
    notes: 'Customer requested morning delivery'
  },
  {
    id: 'ORD-002',
    customerName: 'Fatima Abdullahi',
    customerEmail: 'fatima.a@email.com',
    customerPhone: '+234 802 345 6789',
    items: [
      {
        productId: '4',
        productName: '4K Security Camera System',
        productImage: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 1,
        price: 1199775,
        total: 1199775
      }
    ],
    total: 1199775,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    shippingAddress: {
      street: '456 Ahmadu Bello Way',
      city: 'Abuja',
      state: 'FCT',
      zipCode: '900001',
      country: 'Nigeria'
    },
    orderDate: new Date('2024-01-14'),
    estimatedDelivery: new Date('2024-01-19'),
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    customerName: 'Chidi Okafor',
    customerEmail: 'chidi.o@email.com',
    customerPhone: '+234 803 456 7890',
    items: [
      {
        productId: '3',
        productName: 'Pure Sine Wave Inverter 3000W',
        productImage: 'https://images.pexels.com/photos/9875423/pexels-photo-9875423.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 1,
        price: 674850,
        total: 674850
      },
      {
        productId: '5',
        productName: 'Smart LED Flood Light 50W',
        productImage: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 3,
        price: 134925,
        total: 404775
      }
    ],
    total: 1079625,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'cash_on_delivery',
    shippingAddress: {
      street: '789 New Market Road',
      city: 'Port Harcourt',
      state: 'Rivers State',
      zipCode: '500001',
      country: 'Nigeria'
    },
    orderDate: new Date('2024-01-10'),
    estimatedDelivery: new Date('2024-01-15'),
    trackingNumber: 'TRK456789123'
  },
  {
    id: 'ORD-004',
    customerName: 'Aisha Mohammed',
    customerEmail: 'aisha.m@email.com',
    customerPhone: '+234 804 567 8901',
    items: [
      {
        productId: '7',
        productName: 'Portable Solar Generator 500W',
        productImage: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 1,
        price: 1049775,
        total: 1049775
      }
    ],
    total: 1049775,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'bank_transfer',
    shippingAddress: {
      street: '321 Bompai Road',
      city: 'Kano',
      state: 'Kano State',
      zipCode: '700001',
      country: 'Nigeria'
    },
    orderDate: new Date('2024-01-16'),
    estimatedDelivery: new Date('2024-01-21')
  },
  {
    id: 'ORD-005',
    customerName: 'Emeka Nwankwo',
    customerEmail: 'emeka.n@email.com',
    customerPhone: '+234 805 678 9012',
    items: [
      {
        productId: '6',
        productName: 'Professional Multimeter Kit',
        productImage: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 2,
        price: 194925,
        total: 389850
      },
      {
        productId: '10',
        productName: 'Solar Cable Kit 100ft',
        productImage: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        quantity: 1,
        price: 119925,
        total: 119925
      }
    ],
    total: 509775,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'card',
    shippingAddress: {
      street: '654 Aba Road',
      city: 'Owerri',
      state: 'Imo State',
      zipCode: '460001',
      country: 'Nigeria'
    },
    orderDate: new Date('2024-01-12'),
    notes: 'Customer requested cancellation due to change of mind'
  }
];

export const dashboardStats: DashboardStats = {
  totalRevenue: 8547250,
  totalOrders: 127,
  totalProducts: 156,
  totalCustomers: 89,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  productsGrowth: 15.2,
  customersGrowth: 22.1
};

export const salesData: SalesData[] = [
  { date: '2024-01-01', revenue: 245000, orders: 8 },
  { date: '2024-01-02', revenue: 189000, orders: 6 },
  { date: '2024-01-03', revenue: 312000, orders: 12 },
  { date: '2024-01-04', revenue: 278000, orders: 9 },
  { date: '2024-01-05', revenue: 456000, orders: 15 },
  { date: '2024-01-06', revenue: 389000, orders: 11 },
  { date: '2024-01-07', revenue: 523000, orders: 18 },
  { date: '2024-01-08', revenue: 445000, orders: 14 },
  { date: '2024-01-09', revenue: 367000, orders: 10 },
  { date: '2024-01-10', revenue: 612000, orders: 21 },
  { date: '2024-01-11', revenue: 534000, orders: 16 },
  { date: '2024-01-12', revenue: 423000, orders: 13 },
  { date: '2024-01-13', revenue: 678000, orders: 23 },
  { date: '2024-01-14', revenue: 589000, orders: 19 },
  { date: '2024-01-15', revenue: 712000, orders: 25 }
];

export const topProducts: TopProduct[] = [
  {
    id: '1',
    name: 'Monocrystalline Solar Panel 400W',
    image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    sales: 45,
    revenue: 2024325
  },
  {
    id: '4',
    name: '4K Security Camera System',
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    sales: 23,
    revenue: 2759825
  },
  {
    id: '2',
    name: 'Lithium Solar Battery 100Ah',
    image: 'https://images.pexels.com/photos/9875456/pexels-photo-9875456.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    sales: 34,
    revenue: 3059490
  },
  {
    id: '7',
    name: 'Portable Solar Generator 500W',
    image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    sales: 18,
    revenue: 1889595
  },
  {
    id: '3',
    name: 'Pure Sine Wave Inverter 3000W',
    image: 'https://images.pexels.com/photos/9875423/pexels-photo-9875423.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    sales: 29,
    revenue: 1957065
  }
];

export const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Adebayo Johnson',
    email: 'adebayo.j@email.com',
    phone: '+234 801 234 5678',
    totalOrders: 5,
    totalSpent: 3245000,
    joinDate: new Date('2023-08-15'),
    lastOrder: new Date('2024-01-15'),
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: 'Fatima Abdullahi',
    email: 'fatima.a@email.com',
    phone: '+234 802 345 6789',
    totalOrders: 3,
    totalSpent: 1899000,
    joinDate: new Date('2023-09-22'),
    lastOrder: new Date('2024-01-14'),
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: 'Chidi Okafor',
    email: 'chidi.o@email.com',
    phone: '+234 803 456 7890',
    totalOrders: 7,
    totalSpent: 4567000,
    joinDate: new Date('2023-07-10'),
    lastOrder: new Date('2024-01-10'),
    status: 'active'
  },
  {
    id: 'CUST-004',
    name: 'Aisha Mohammed',
    email: 'aisha.m@email.com',
    phone: '+234 804 567 8901',
    totalOrders: 2,
    totalSpent: 1245000,
    joinDate: new Date('2023-11-05'),
    lastOrder: new Date('2024-01-16'),
    status: 'active'
  },
  {
    id: 'CUST-005',
    name: 'Emeka Nwankwo',
    email: 'emeka.n@email.com',
    phone: '+234 805 678 9012',
    totalOrders: 1,
    totalSpent: 389000,
    joinDate: new Date('2023-12-20'),
    lastOrder: new Date('2024-01-12'),
    status: 'inactive'
  }
];