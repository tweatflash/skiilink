import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 animate-fade-in">
      <div className="max-w-md mx-auto pt-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
            <CheckCircle className="w-20 h-20 text-green-500 relative" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">Order Confirmed!</h1>
        <p className="text-lg text-slate-600 mb-12">Your order has been successfully placed and is being processed.</p>

        {orderId && (
          <div className="mb-12">
            <p className="text-sm text-slate-600 mb-2">Order Number</p>
            <p className="text-2xl font-mono font-semibold text-slate-900 break-all">{orderId}</p>
          </div>
        )}

        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4 text-left">
            <div className="flex-shrink-0 mt-1">
              <Package className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">Order Processing</p>
              <p className="text-slate-600">Your items are being prepared for shipment</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">Confirmation Email</p>
              <p className="text-slate-600">Check your inbox for order details and tracking information</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <p className="text-sm text-slate-600">
          Questions? <a href="mailto:support@store.com" className="text-blue-600 hover:text-blue-700 font-semibold">Contact our support team</a>
        </p>
      </div>
    </div>
  );
}
