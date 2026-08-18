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
import { Sidebar } from 'app/components/sidebar';

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
     <div className={`lg:pl-[263px] lg:py-2 lg:pr-2 relative isolate flex min-h-screen w-full bg-white max-lg:flex-col lg:bg-zinc-100`}>
      <Sidebar />
      <div className="flex flex-1 rounded-lg flex-col inset-2 bg-white w-full ring-1 ring-zinc-200">
         <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <span className="relative">
            <button
              aria-label="Open navigation"
              className="relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base font-medium text-zinc-950 sm:text-sm hover:bg-zinc-950/5 active:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 dark:active:bg-white/5"
              type="button"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="w-6 h-6 shrink-0 fill-zinc-500 sm:w-5 sm:h-5">
                <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z"></path>
              </svg>
            </button>
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <nav className="flex flex-1 items-center gap-4 py-2.5">
            <div aria-hidden="true" className="-ml-4 flex-1"></div>
            <div className="flex items-center gap-3">
              <span className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  className="relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base font-medium text-zinc-950 sm:text-sm hover:bg-zinc-950/5 active:bg-zinc-950/5 "
                >
                 
                  <span className="inline-grid shrink-0 align-middle rounded-[20%] outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
                    <img className="size-7 col-start-1 row-start-1 rounded-[20%]" src="/images/image_1.jpg" alt="" />
                  </span>
                </button>
              </span>
            </div>
          </nav>
        </div>
      </header>
        {/* <DashboardContent /> */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;