"use client"
import { useState,useEffect } from 'react';
import { Search, ChevronDown, Plus, RefreshCw, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';
import getWikiResults from '../../../../../lib/getProducts';
interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  color: string;
  discount: number;
  rating: number;
  sales: number;
  lastUpdate: string;
}

const mockProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'Apple MacBook Pro 17" with Retina Display and Touch Bar',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Laptop',
    price: 2999,
    stock: 15,
    color: 'Space Gray',
    discount: 10,
    rating: 5.0,
    sales: 300,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-002',
    name: 'Microsoft Surface Pro 8 with Type Cover and Surface Pen',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Laptop',
    price: 1999,
    stock: 8,
    color: 'Platinum',
    discount: 0,
    rating: 4.5,
    sales: 856,
    lastUpdate: 'This week',
  },
  {
    id: 'PRD-003',
    name: 'Magic Mouse 2 Wireless Rechargeable Multi-Touch Surface',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 99,
    stock: 45,
    color: 'Silver',
    discount: 15,
    rating: 4.8,
    sales: 10,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-004',
    name: 'Apple Watch Series 8 GPS + Cellular 45mm Stainless Steel',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Watches',
    price: 399,
    stock: 22,
    color: 'Midnight',
    discount: 5,
    rating: 5.0,
    sales: 500,
    lastUpdate: '2 days ago',
  },
  {
    id: 'PRD-005',
    name: 'Apple iMac 27" 5K Retina Display Desktop Computer with Magic Keyboard',
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desktop',
    price: 2499,
    stock: 5,
    color: 'Silver',
    discount: 20,
    rating: 4.9,
    sales: 1000,
    lastUpdate: 'This week',
  },
  {
    id: 'PRD-006',
    name: 'Apple AirPods Pro 2nd Generation with MagSafe Charging Case',
    image: 'https://images.pexels.com/photos/8000616/pexels-photo-8000616.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 249,
    stock: 67,
    color: 'White',
    discount: 0,
    rating: 4.7,
    sales: 3500,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-007',
    name: 'iPad Pro 12.9" 6th Generation with M2 Chip and Liquid Retina Display',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tablet',
    price: 1099,
    stock: 18,
    color: 'Space Gray',
    discount: 8,
    rating: 4.6,
    sales: 750,
    lastUpdate: '3 days ago',
  },
  {
    id: 'PRD-008',
    name: 'Magic Keyboard with Touch ID and Numeric Keypad for Mac Models',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 149,
    stock: 31,
    color: 'Black',
    discount: 12,
    rating: 4.4,
    sales: 2021,
    lastUpdate: 'This week',
  },
  {
    id: 'PRD-001',
    name: 'Apple MacBook Pro 17" with Retina Display and Touch Bar',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Laptop',
    price: 2999,
    stock: 15,
    color: 'Space Gray',
    discount: 10,
    rating: 5.0,
    sales: 300,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-002',
    name: 'Microsoft Surface Pro 8 with Type Cover and Surface Pen',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Laptop',
    price: 1999,
    stock: 8,
    color: 'Platinum',
    discount: 0,
    rating: 4.5,
    sales: 856,
    lastUpdate: 'This week',
  },
  {
    id: 'PRD-003',
    name: 'Magic Mouse 2 Wireless Rechargeable Multi-Touch Surface',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 99,
    stock: 45,
    color: 'Silver',
    discount: 15,
    rating: 4.8,
    sales: 10,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-004',
    name: 'Apple Watch Series 8 GPS + Cellular 45mm Stainless Steel',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Watches',
    price: 399,
    stock: 22,
    color: 'Midnight',
    discount: 5,
    rating: 5.0,
    sales: 500,
    lastUpdate: '2 days ago',
  },
  {
    id: 'PRD-005',
    name: 'Apple iMac 27" 5K Retina Display Desktop Computer with Magic Keyboard',
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desktop',
    price: 2499,
    stock: 5,
    color: 'Silver',
    discount: 20,
    rating: 4.9,
    sales: 1000,
    lastUpdate: 'This week',
  },
  {
    id: 'PRD-006',
    name: 'Apple AirPods Pro 2nd Generation with MagSafe Charging Case',
    image: 'https://images.pexels.com/photos/8000616/pexels-photo-8000616.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 249,
    stock: 67,
    color: 'White',
    discount: 0,
    rating: 4.7,
    sales: 3500,
    lastUpdate: 'Just now',
  },
  {
    id: 'PRD-007',
    name: 'iPad Pro 12.9" 6th Generation with M2 Chip and Liquid Retina Display',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tablet',
    price: 1099,
    stock: 18,
    color: 'Space Gray',
    discount: 8,
    rating: 4.6,
    sales: 750,
    lastUpdate: '3 days ago',
  },
  {
    id: 'PRD-008',
    name: 'Magic Keyboard with Touch ID and Numeric Keypad for Mac Models',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    price: 149,
    stock: 31,
    color: 'Black',
    discount: 12,
    rating: 4.4,
    sales: 2021,
    lastUpdate: 'This week',
  },
];
const getRandomWidth = () => {
  const widths = [
    "w-1/2",
    "w-2/3",
    "w-3/4",
    "w-4/5",
    "w-5/6",
    "w-full",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
  ];
  return widths[Math.floor(Math.random() * widths.length)];
};
const skeletonBase = " h-[10px] animate-pulse rounded bg-gray-200";
export default function Products() {
   const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = mockProducts.length;
  const totalSales = mockProducts.reduce((sum, p) => {
    const salesNum = p.sales;
    return sum + salesNum;
  }, 0);
  const discountPercent = (actualPrice: number, discountPrice: number) => {
   if (actualPrice && discountPrice) {
      return Math.round(
          ((actualPrice - discountPrice) / actualPrice) * 100
        )
    }
    return 0;
    }
    
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const getStockColor = (stock: number) => {
    if (stock > 50) return 'bg-green-400';
    if (stock > 20) return 'bg-yellow-300';
    if (stock > 10) return 'bg-orange-400';
    return 'bg-red-500';
  };
  const [productItems, setProductItems] = useState<dummyStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
      setLoading(true)
      setError("")
      const request: Promise<ProductRes> = await getWikiResults("all");
      const response: dummyStore[] | undefined = (await request)?.products;
      if (response) {
        setLoading(false)
        setProductItems([...productItems, ...response]);
      }else{
        setLoading(false)
        setError("Failed to load products");
      }
    };
    useEffect(() => {
      fetchProducts();
    }, []);
  return (
    <div className="p-4 lg:p-10">
      <div className="max-w-6xl w-full  mx-auto">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8">
            Products
          </h1>
          <button
            className="relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-4 py-1 sm:text-sm/6 border-transparent bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
            type="button"
          >
            Add Product
          </button>
        </div>

        <div className="mt-8 mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
            <input
              placeholder="Search products..."
              className="w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-10 pr-3 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <div className="relative">
            <button
              type="button"
              className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-base/6 text-zinc-950 sm:text-sm/6 hover:bg-zinc-50 transition-colors min-w-[140px]"
            >
              <span>Category</span>
              <ChevronDown className="size-4 text-zinc-500" />
            </button>
          </div> */}
          {/* <div className="relative">
            <button
              type="button"
              className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-base/6 text-zinc-950 sm:text-sm/6 hover:bg-zinc-50 transition-colors min-w-[140px]"
            >
              <span>Stock Status</span>
              <ChevronDown className="size-4 text-zinc-500" />
            </button>
          </div> */}
        </div>

<div className="flex-1 overflow-y-auto">
      <div className="mx-auto">
        <section>
          <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
            <div className="flex flex-col py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Products: </span>
                  <span className="text-gray-900 font-semibold">{totalProducts}</span>
                </h5>
                <h5>
                  <span className="text-gray-500">Total sales: </span>
                  <span className="text-gray-900 font-semibold">${totalSales.toFixed(1)}M</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh products
                </button>
               
              </div>
            </div>

          

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Discount
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Sales
                    </th>
                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                      Last Update
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productItems.map((product:dummyStore) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <img
                          src={product.image[0].url}
                          alt={product.title}
                          className="w-8 h-8 border border-gray-200 bg- relative rounded-md mr-3 object-cover"
                        />
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {product.title}
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 whitespace-nowrap text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        N{product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {product.discountPercentage > 0 ? (
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">
                            {discountPercent(product.price,product.discountPercentage)}% off
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                         
                           <span
                      className={`inline-flex rounded-md border px-2.5 py-0.5 text-xs font-medium ${
                        product.stock > 20
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : product.stock > 10
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {product.stock} units
                    </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="ml-1 text-gray-500">
                            {product.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                          0
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        Undefined 
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            className="px-3 py-0.5 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-lg transition-colors"
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-0.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg transition-colors"
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                   {
                                    [...Array(10)].map(item=> <tr
                                      key={item}
                                      className="hover:bg-gray-50 border-b border-gray-200 hover:border-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                                    >
                                        <th
                                            scope="row"
                                            className="flex items-center px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                                          >
                                            <div
                                            
                                              className="w-8 h-8 animate-pulse bg-gray-200 rounded-md mr-3 object-cover"
                                            />
                                             <div className={clsx(skeletonBase, getRandomWidth(),"min-w-40")}/>
                                          </th>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth(),"!h-4 min-w-20")}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth()," min-w-20")}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth()," min-w-14")}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth())}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth()," min-w-10")}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth())}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth()," min-w-5")}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth())}/>
                                      </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                          <div className={clsx(skeletonBase, getRandomWidth())}/>
                                      </td>
                                    </tr>)
                                   }
                </tbody>
              </table>
            </div>

            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-900">1-{filteredProducts.length}</span>
                {' '}of{' '}
                <span className="font-semibold text-gray-900">{mockProducts.length}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="flex items-center justify-center px-3 py-3 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    1
                  </button>
                </li>
                <li>
                  <button className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    2
                  </button>
                </li>
                <li>
                  <button
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                  >
                    3
                  </button>
                </li>
                <li>
                  <button className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    ...
                  </button>
                </li>
                <li>
                  <button className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    10
                  </button>
                </li>
                <li>
                  <button className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
        {/* <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            Showing{' '}
            <span className="font-medium text-zinc-950">1</span> to{' '}
            <span className="font-medium text-zinc-950">{filteredProducts.length}</span> of{' '}
            <span className="font-medium text-zinc-950">{mockProducts.length}</span> results
          </div>
        </div> */}
      </div>
    </div>
  );
}
