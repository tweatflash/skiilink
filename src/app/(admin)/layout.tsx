"use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Store
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab,setActiveTab]=useState("")
  const router=useRouter()
  const onTabChange=(id:string)=>{
    setActiveTab(id)
    if (id==="store") {
      router.push("/products")
    }else{
      router.push("/administration_dashboard/" + id)
    }
  }
  const menuItems = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'store', label: 'Store', icon: Store },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 dark:bg-gray-900 dark:shadow-gray-900/50`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Skiilink LTD</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-r-2 border-orange-600 dark:border-orange-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
              <LogOut size={20} className="mr-3" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 transition-colors duration-300">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 lg:p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Menu size={18} className="lg:w-5 lg:h-5" />
            </button>
            
            <div className="hidden sm:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 px-3 lg:px-4 py-1.5 lg:py-2 pl-8 lg:pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="relative p-1.5 lg:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell size={16} className="lg:w-5 lg:h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 font-semibold text-xs lg:text-sm">A</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@solartech.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;