"use client";
import LoadingDb from "app/components/loadingDb";
import { Button } from "app/components/ui/button2";
import { ThemeContext } from "app/contexts/ThemeContext";
import { Eye } from "lucide-react";
import { useContext, useState ,useEffect} from "react"; // adjust this import as needed
export default function AccountIndex() {
  const themeContext = useContext(ThemeContext)
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  if (!themeContext) {
        throw new Error("ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider.");
    }
  const {loggedIn,authLoading,userObj}=themeContext;
    useEffect(()=>{
      console.log(loggedIn,authLoading,userObj)
    },[loggedIn,authLoading,userObj])
  const orders = [
    {
      id: 1,
      label: "68ee4ea66bc4a9009ac32b8b",
      date: "Nov 10, 2025",
      status: "Delivered",
      items: [
        {
          name: "Wireless Bluetooth Earbuds",
          quantity: 1,
          price: "₦12,500",
          image: "/images/earbuds.png",
        },
        
      ],
      steps: ["Order Confirmed", "Packed", "Shipped", "Delivered"],
    },
    {
      id: 2,
      label: "68ee4ea66bc4a9009ac32b8b",
      date: "Nov 10, 2025",
      status: "Delivered",
      items: [
        {
          name: "Wireless Bluetooth Earbuds",
          quantity: 1,
          price: "₦12,500",
          image: "/images/earbuds.png",
        },
        
      ],
      steps: ["Order Confirmed", "Packed", "Shipped", "Delivered"],
    },
    // Add more orders similarly...
  ];

  const statusStyles = {
    Delivered: "bg-green-50 text-green-700 border-green-200",
    "In Transit": "bg-yellow-50 text-yellow-700 border-yellow-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    
      authLoading && !loggedIn ? <LoadingDb/> : !authLoading && !loggedIn ? <div className="px-4 py-8"><div className="max-w-7xl w-full m-auto"><h2 className="text-3xl">Please log in to view your account.</h2></div></div> : <div className="min-h-auto px-4">
      <div className="max-w-7xl mx-auto  pt-8">
        {/* Header */}
        <div className="flex justify-between items-start ">
          <div className="flex flex-col">
            <h1 className="text-3xl">My Account</h1>
            
          </div>
          <Button variant="outline" className="h-fit mt-2 py-1">
            Logout
          </Button>
        </div>
        <div>
          <p className="text-gray-700 mb-6 text-lg">
              Welcome {userObj.user.name}
            </p>
        </div>
        {/* Grid Layout */}
        <div className="">
          {/* Sidebar */}
          {/* <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h2 className="text-lg  mb-2">Welcome</h2>
              <p className="text-gray-700">Augustine Godwin</p>
              <p className="text-sm text-gray-500">augustine@example.com</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h2 className="text-lg  mb-2">Shipping Address</h2>
              <p className="text-gray-700">12 Unity Street, Wuse II, Abuja</p>
              <Button variant="default" className="mt-2">Manage Address</Button>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="space-y-4">
            {/* Personal Info */}
            {/* <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h2 className="text-lg  mb-4">Personal Info</h2>
              <div className="space-y-2 text-gray-700">
                <p>Email: augustine@example.com</p>
                <p>Phone: +234 801 234 5478</p>
              </div>
              <Button variant="default" className="mt-4">Edit Info</Button>
            </div> */}

            {/* Orders */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h2 className="text-2xl mb-4">Order History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[...Array(2)].map((_, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg p-4 bg-white"
      >
        <div className="mb-3 space-y-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="py-3 border-t border-gray-200 mb-3 space-y-3 animate-pulse">
          <div className="flex">
            <div className="basis-[10em] h-3 bg-gray-200 rounded w-24"></div>
            <div className="flex-1 pr-3 h-3 bg-gray-200 rounded w-32 ml-2"></div>
          </div>
          <div className="flex">
            <div className="basis-[10em] h-3 bg-gray-200 rounded w-24"></div>
            <div className="flex-1 pr-3 h-3 bg-gray-200 rounded w-40 ml-2"></div>
          </div>
          <div className="flex">
            <div className="basis-[10em] h-3 bg-gray-200 rounded w-24"></div>
            <div className="flex-1 pr-3 h-3 bg-gray-200 rounded w-20 ml-2"></div>
          </div>
          <div className="flex">
            <div className="basis-[10em] h-3 bg-gray-200 rounded w-24"></div>
            <div className="flex-1 pr-3 h-3 bg-gray-200 rounded w-28 ml-2"></div>
          </div>
        </div>

        <div className="border-t border-gray-200 space-y-3 animate-pulse">
          {[...Array(1)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>

              {/* <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white  transition"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between  items-start mb-3">
                      <div>
                        <h3 className="text-lg text-gray-500">
                          Order #:{" "}
                          <span className="font-medium text-gray-800 whitespace-nowrap">
                            {order.label}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-500">
                          4 Products | By Alex Jones | <span className="text-gray-700">{order.date}</span>
                        </p>
                      </div>
                    </div>
                    <div className="py-3 text-sm flex flex-col gap-1.5 border-t mb-3 border-gray-200">
                      
                      <div className="flex flex-wrap">
                        <div className="basis-[10em]">
                          <span className="text-gray-600">Status</span>
                        </div>
                        <div className="flex-1 pr-3">
                          <span
                            className={`inline-flex rounded-md border px-2.5 py-0.5 text-xs font-medium ${
                              statusStyles[order.status]
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="basis-[10em]">
                          <h3 className="text-gray-600">Delivery Address</h3>
                        </div>
                        <div className="flex-1 pr-3">Byazin junction , Delta, kubwa abuja</div>
                      </div>
                      
                      <div className="flex flex-wrap ">
                        <div className="basis-[10em]">
                          <h3 className="text-gray-600">Shipping Charges</h3>
                        </div>
                        <div className="flex-1 pr-3">NGN 0.00</div>
                      </div>
                      <div className="flex flex-wrap font-bold-livvic">
                        <div className="basis-[10em]">
                          <h3 className="text-gray-600">Total</h3>
                        </div>
                        <div className="flex-1 pr-3">NGN 41,200</div>
                      </div>
                      
                      
        
                    </div>
                  
                    <div className="border-t border-gray-200">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 py-3"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                            IMG
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} • {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                
              </div> */}
              {/* <p className="text-gray-700 text-lg">You haven't placed any orders yet.</p> */}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
              <h3 className="text-lg  mb-4">{selectedOrder.label} Tracking</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {selectedOrder.steps.map((step:any, index:any) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
}
