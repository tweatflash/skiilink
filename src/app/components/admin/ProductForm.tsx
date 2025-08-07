import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { Product } from "../../types/product";
import { ProductFormData } from "../../types/admin";
import { categories } from "../../data/products";
import uploadWithFormData from "../../../../lib/upload(formData)";
interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailimg = useRef<HTMLInputElement>(null);
  const serverFormdata = new FormData();
  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.name || "",
    description: product?.description || "",
    fullDescription: product?.fullDescription || product?.description || "",
    price: product?.price || 0,
    discountPercentage: product?.originalPrice || undefined,
    category: product?.category || "",
    brand: product?.brand || "",
    sku: product?.model || "",
    weight: product?.weight || "",
    dimensions: product?.dimensions || "",
    warrantyInformation: product?.warranty || "",
    specifications: product?.specifications || [""],
    features: product?.features || [""],
    // thumbnail: "",
    images: [],
    inStock: product?.inStock ?? true,
    isNew: product?.isNew || false,
    isBestSeller: product?.isBestSeller || false,
  });
  function omitKeys<T extends object>(
    obj: T,
    keysToRemove: (keyof T)[]
  ): Partial<T> {
    const newObj = { ...obj };
    keysToRemove.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }

  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[] | any>(
    product?.images || [product?.image].filter(Boolean) || []
  );

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "specifications" | "features",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "specifications" | "features") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (
    field: "specifications" | "features",
    index: number
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    // Create preview URLs
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls((prev: any) => [
          ...prev,
          e.target?.result as string,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };
  const [thumbnailPreviews, setThumnailPreview] = useState("");
  // const handleThumbnailUpload = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = event.target.files?.[0];
  //   if (!files) return;

  //   const newImages = files;
  //   setFormData((prev) => ({ ...prev, thumbnail: newImages }));

  //   // Create preview URLs

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setThumnailPreview(e.target?.result as string);
  //   };
  //   reader.readAsDataURL(files);
  // };
  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviewUrls.filter(
      (_: any, i: any) => i !== index
    );
    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviewUrls(newPreviews);
  };
  const removeThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: "" }));
    setThumnailPreview("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty specifications and features
    const cleanedData = {
      ...formData,
      specifications: formData.specifications.filter(
        (spec) => spec.trim() !== ""
      ),
      features: formData.features.filter((feature) => feature.trim() !== ""),
    };
    console.log(formData);
    const cleanedFormData = omitKeys(formData, [
      "isBestSeller",
      "isNew",
      "inStock",
      "fullDescription",
      "dimensions",
    ]);

    Object.entries(cleanedFormData).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        // Append each image file individually
        value.forEach((file) => {
          serverFormdata.append(`image`, file);
        }); // assumes each item is a File object
      } else if (Array.isArray(value)) {
        // Stringify arrays before appending
        serverFormdata.append(key, JSON.stringify(value));
      } else {
        // Append primitive values directly
        serverFormdata.append(key, value != null ? String(value) : "");
      }
    });
    // console.log(formData);

    const data = await uploadWithFormData("/products/create", serverFormdata);
    if (data) onSave(cleanedData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {product ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {product
                ? "Update product information"
                : "Create a new product listing"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand
              </label>
              <input
                type="text"
                value={formData.brand}
                required
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter model number"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter a brief product description"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Description
            </label>
            <textarea
              rows={6}
              value={formData.fullDescription}
              onChange={(e) =>
                handleInputChange("fullDescription", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter detailed product description"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₦) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Price (₦)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.discountPercentage || ""}
                onChange={(e) =>
                  handleInputChange(  
                    "discountPercentage",
                    parseFloat(e.target.value) || undefined
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.00"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Leave empty if no discount
              </p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Product Details
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="e.g., 2.5kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dimensions
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) =>
                  handleInputChange("dimensions", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="e.g., 30 × 20 × 10cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Warranty
              </label>
              <input
                type="text"
                value={formData.warrantyInformation}
                onChange={(e) =>
                  handleInputChange("warrantyInformation", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="e.g., 2 years"
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Specifications
            </h2>
            <button
              type="button"
              onClick={() => addArrayItem("specifications")}
              className="flex items-center space-x-2 px-3 py-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Add Specification</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) =>
                    handleArrayChange("specifications", index, e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter specification"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("specifications", index)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Features
            </h2>
            <button
              type="button"
              onClick={() => addArrayItem("features")}
              className="flex items-center space-x-2 px-3 py-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleArrayChange("features", index, e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter feature"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("features", index)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Thumbnail */}
        {/* <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Thumbnail
          </h2>

          <div className="space-y-6">
            <div>
              <input
                ref={thumbnailimg}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => thumbnailimg.current?.click()}
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
              >
                <div className="text-center">
                  <Upload
                    size={24}
                    className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
                  />
                  <p className="text-gray-600 dark:text-gray-400">
                    Click to upload thumbnail image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </button>
            </div>

            {thumbnailPreviews && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <img
                    src={thumbnailPreviews}
                    alt={`Preview `}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeThumbnail()}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div> */}
        {/* Images */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Product Images
          </h2>

          <div className="space-y-6">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
              >
                <div className="text-center">
                  <Upload
                    size={24}
                    className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
                  />
                  <p className="text-gray-600 dark:text-gray-400">
                    Click to upload images
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </button>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviewUrls.map((url: any, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Product Status
          </h2>

          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  handleInputChange("inStock", e.target.checked ? true : false)
                }
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700 dark:text-gray-300">In Stock</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => handleInputChange("isNew", e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Mark as New Product
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) =>
                  handleInputChange("isBestSeller", e.target.checked)
                }
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Mark as Best Seller
              </span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
          >
            <Save size={16} />
            <span>{product ? "Update Product" : "Create Product"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
