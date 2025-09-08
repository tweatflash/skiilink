import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const config = {
      public_key: 'FLWPUBK_TEST-be991d4a6e11f924beafb5b15d5721f6-X',
      tx_ref: Date.now().toString(),
      amount: total,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'user@gmail.com',
        phone_number: '070********',
        name: 'john doe',
      },
      customizations: {
        title: 'SKIILINK VENTURES LIMITED',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
      },
    };
  
    const fwConfig = {
      ...config,
      text: 'Checkout',
      callback: (response:any) => {
        console.log(response);
        removeAllItems(items)
        onClose()
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {},
    };
  if (!isOpen) return null;
  const removeAllItems=(items:CartItem[])=>{
    items.forEach((item:CartItem) => onRemoveItem(item.product._id.toString()));
  }
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product._id} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.product.image[0].url}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product.title}</h3>
                      <p className="text-orange-600 font-semibold">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product._id.toString(), Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product._id.toString(), item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product._id.toString())}
                          className="ml-auto text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total: {formatPrice(total)}</span>
              </div>
              <FlutterWaveButton className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors" {...fwConfig} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;