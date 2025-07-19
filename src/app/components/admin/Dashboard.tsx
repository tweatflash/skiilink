import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { dashboardStats, salesData, topProducts } from '../../data/admin';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: formatPrice(dashboardStats.totalRevenue),
      change: dashboardStats.revenueGrowth,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: dashboardStats.totalOrders.toLocaleString(),
      change: dashboardStats.ordersGrowth,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Products',
      value: dashboardStats.totalProducts.toLocaleString(),
      change: dashboardStats.productsGrowth,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Customers',
      value: dashboardStats.totalCustomers.toLocaleString(),
      change: dashboardStats.customersGrowth,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentSales = salesData.slice(-7);
  const maxRevenue = Math.max(...recentSales.map(d => d.revenue));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
            View Reports
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          
          return (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className={`p-2 lg:p-3 rounded-lg ${stat.bgColor} dark:bg-opacity-20`}>
                  <Icon size={20} className={`lg:w-6 lg:h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? <ArrowUpRight size={14} className="lg:w-4 lg:h-4" /> : <ArrowDownRight size={14} className="lg:w-4 lg:h-4" />}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">Sales Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Last 7 days performance</p>
            </div>
            <button className="hidden sm:flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Eye size={14} />
              <span className="text-xs lg:text-sm">View Details</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {recentSales.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 w-12 lg:w-16">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 lg:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs lg:text-sm font-semibold text-gray-900 dark:text-gray-100">{formatPrice(data.revenue)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{data.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">Top Products</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Best performing items</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{product.name}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{product.sales} sales</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{formatPrice(product.revenue)}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Latest updates from your store</p>
          </div>
          <button className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-xs lg:text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { type: 'order', message: 'New order #ORD-001 received from Adebayo Johnson', time: '2 minutes ago', status: 'success' },
            { type: 'product', message: 'Solar Panel 400W stock is running low (5 items left)', time: '15 minutes ago', status: 'warning' },
            { type: 'customer', message: 'New customer Fatima Abdullahi registered', time: '1 hour ago', status: 'info' },
            { type: 'order', message: 'Order #ORD-002 has been shipped', time: '2 hours ago', status: 'success' },
            { type: 'product', message: 'New product "Smart LED Light" added to inventory', time: '3 hours ago', status: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-xs lg:text-sm text-gray-900 dark:text-gray-100">{activity.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;