import { WifiOff, RefreshCw } from 'lucide-react';
type Prop={
  refresh:any
}
export default function ErrorPage({refresh}:Prop) {
  return (
     <div className="min-h-[calc(100vh-160px)]  bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Error icon */}
        <div className="mb-6">
          <WifiOff className="w-12 h-12 text-red-500 mx-auto mb-2" />
          {/* <span className="text-2xl">❌</span> */}
        </div>

        {/* Error message */}
        <h1 className="text-xl font-medium text-gray-800 mb-2">
          Network Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          Unable to get products. Please check your connection.
        </p>

        {/* Retry button */}
        <div className="flex items-center justify-center">
          <button onClick={()=>refresh()} className="flex  items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Try Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
