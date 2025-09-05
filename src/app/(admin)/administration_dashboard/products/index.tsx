"use client"
import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Star,
  Package,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Product } from '../../../types/product';
import { featuredProducts, bestSellingProducts, categories } from '../../../data/products';
import ProductForm from '../../../components/admin/ProductForm';
import getWikiResults from '../../../../../lib/getProducts';
import deleteProduct from '../../../../../lib/deleteProduct';
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductManagement: React.FC = () => {
  const [products] = useState<Product[]>([...featuredProducts, ...bestSellingProducts]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [productItems, setProductItems] = useState<dummyStore[]>([]);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string | number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await deleteProduct(productId);
        console.log('Product deleted:', result);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const getStockStatus = (product: dummyStore) => {
    if (!product.stock) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    // Simulate low stock warning
    const isLowStock = Math.random() > 0.7;
    if (isLowStock) return { label: 'Low Stock', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
  };
  const fetchProducts = async () => {
      const request: Promise<ProductRes> = await getWikiResults("all");
      const response: dummyStore[] | undefined = (await request)?.products;
      if (response && response.length) {
        setProductItems([...productItems, ...response]);
      }
    };
    useEffect(()=>{
      fetchProducts();
    },[])
  if (showProductForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={() => setShowProductForm(false)}
        onSave={(productData) => {
          console.log('Save product:', productData);
          setShowProductForm(false);
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Product Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory and listings</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
            
            <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 space-y-4">
            {productItems.map((product) => {
              const stockStatus = getStockStatus(product);
              return (
                <div key={product._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <img
                      src={product.image[0].url}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2">{product.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{product.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {product.brand && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        )}
                        {product.brand && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{formatPrice(product.price)}</span>
                      {product.price && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </div>
                      )}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{product.rating}</span>
                      {/* <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span> */}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        // onClick={() => handleEditProduct(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title="View Product"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Product</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Category</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Price</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Stock Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Rating</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {productItems.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image[0].url}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{product.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{product.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {product.brand && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                            {product.brand && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Best Seller
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</span>
                        {product.price && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.label === 'In Stock' && <CheckCircle size={12} className="mr-1" />}
                        {stockStatus.label === 'Low Stock' && <AlertTriangle size={12} className="mr-1" />}
                        {stockStatus.label === 'Out of Stock' && <Package size={12} className="mr-1" />}
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.rating}</span>
                        {/* <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews.length})</span> */}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          // onClick={() => handleEditProduct(product)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                          title="View Product"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Your First Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
               Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;