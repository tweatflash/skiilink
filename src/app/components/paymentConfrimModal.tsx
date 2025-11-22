"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "./ui/button2";
import { useRouter } from "next/navigation";
import { ThemeContext } from "app/contexts/ThemeContext";
import { formatPrice } from "../../../lib/formatPrice";
export default function PaymentConfirmation() {
    const [isOpen, setIsOpen] = useState(true);
    const router =useRouter()
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
      throw new Error(
        "ThemeContext is undefined. Make sure your component is wrapped in ThemeContext.Provider."
      );
    }
    const {
      clearCart,
      cartItems,
      getSubtotal
    } = themeContext;
    const handleContinue =()=>{
        clearCart()
        router.push("/products")
    }
    const total=getSubtotal()
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center md:p-4">
        <div className="w-full h-full md:h-auto md:w-full md:max-w-md md:rounded-3xl bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 flex flex-col md:rounded-3xl">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                <div className="bg-green-500 rounded-full p-4">
                    <Check className="w-8 h-8 text-white" />
                </div>
                </div>
                <h1 className="text-2xl font-[bold-livvic] text-black">
                Payment Completed
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                Your order has been placed successfully!
                <br />A confirmation email has been sent.
                </p>
            </div>

            <div className="space-y-4 mb-8 border-t border-gray-200 pt-6 flex-1">
                <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                    Date
                </span>
                <span className="text-sm text-foreground">18/06/2025</span>
                </div>

                <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                    Payment Method
                </span>
                <span className="text-sm text-foreground">
                    Master Card **2879
                </span>
                </div>

                <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                    Email Address
                </span>
                <span className="text-sm text-foreground">user@example.com</span>
                </div>

                <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                    Order Number
                </span>
                <span className="text-sm text-foreground">#DJD-4C391</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">
                    Purchased Items
                </p>
                <ul className="space-y-2">
                    {cartItems.map(item=><li className="text-sm text-foreground truncate">{item.product.title}</li>) }
                </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-[bold-livvic] text-foreground">Total</span>
                <span className="text-lg font-[bold-livvic] text-foreground">
                    {formatPrice(total)}
                </span>
                </div>
            </div>

            <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
            >
                Continue Shopping
            </Button>
            </div>
        </div>
        </div>
    );
}
