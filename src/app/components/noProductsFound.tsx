import {  Package, ArrowLeft } from 'lucide-react';
export default function NoProductsFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* No product icon */}
        <div className="mb-6">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        </div>

        {/* No product message */}
        <h1 className="text-xl font-medium text-gray-800 mb-2">
          Product Not Found
        </h1>
        
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>

        {/* Go back button */}
        <div className="flex items-center justify-center">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
