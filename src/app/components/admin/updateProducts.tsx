"use client"
import React, { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react";
import uploadWithFormData from "../../../../lib/upload(formData)";

interface ProductFormProps {
  product?: dummyStore;
}

const categories = [
  { id: "laptops", name: "Laptops" },
  { id: "phones", name: "Phones" },
  { id: "tablets", name: "Tablets" },
  { id: "watches", name: "Watches" },
  { id: "accessories", name: "Accessories" },
  { id: "desktop", name: "Desktop" },
];
const ProductForm: React.FC<ProductFormProps> = ({
  product,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    fullDescription: product?.fullDescription || product?.description || "",
    price: product?.price || 0,
    discountPercentage: product?.discountPercentage || undefined,
    category: product?.category || "",
    brand: product?.brand || "",
    sku: product?.model || "",
    weight: product?.weight || "",
    dimensions: product?.dimensions || "",
    warrantyInformation: product?.warrantyInformation || "",
    specifications: product?.specifications || [""],
    features: product?.features || [""],
    images: [] as File[],
    inStock: product?.stock ?? true,
    isNew: product?.thumbnail || false,
    isBestSeller: product?.availabilityStatus || false,
    stock: product?.stock || 0,
    color: product?.sku || "",
  });

  const [originalFormData] = useState(formData);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    product?.image?.map((item: ImageObj) => item.url) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
 const serverFormdata = new FormData();
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasFormChanged()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
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
    const newArray = formData[field].filter((_: string, i: number) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

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

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_: File, i: number) => i !== index);
    const newPreviews = imagePreviewUrls.filter((_: string, i: number) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviewUrls(newPreviews);
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price > 0 &&
      formData.category !== "" &&
      formData.brand.trim() !== "" &&
      formData.weight !== "" &&
      formData.warrantyInformation.trim() !== "" &&
      (imagePreviewUrls.length > 0 || (product?.image?.length ?? 0) > 0)
    );
  };

  const hasFormChanged = () => {
    if (!product) return true;

    return (
      formData.title !== originalFormData.title ||
      formData.description !== originalFormData.description ||
      formData.fullDescription !== originalFormData.fullDescription ||
      formData.price !== originalFormData.price ||
      formData.discountPercentage !== originalFormData.discountPercentage ||
      formData.category !== originalFormData.category ||
      formData.brand !== originalFormData.brand ||
      formData.sku !== originalFormData.sku ||
      formData.weight !== originalFormData.weight ||
      formData.dimensions !== originalFormData.dimensions ||
      formData.warrantyInformation !== originalFormData.warrantyInformation ||
      formData.stock !== originalFormData.stock ||
      formData.color !== originalFormData.color ||
      formData.isNew !== originalFormData.isNew ||
      formData.isBestSeller !== originalFormData.isBestSeller ||
      JSON.stringify(formData.specifications) !== JSON.stringify(originalFormData.specifications) ||
      JSON.stringify(formData.features) !== JSON.stringify(originalFormData.features) ||
      formData.images.length > 0
    );
  };

  const isSubmitEnabled = () => {
    if (product) {
      return isFormValid() && hasFormChanged();
    }
    return isFormValid();
  };
   const handleSave = async (productData: any) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Product saved:', productData);
  };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isSubmitEnabled()) return;

//     setSaveError(null);
//     setShowModal(true);
//     setIsLoading(true);

//     try {
//       const cleanedData = {
//         ...formData,
//         specifications: formData.specifications.filter(
//           (spec: string) => spec.trim() !== ""
//         ),
//         features: formData.features.filter((feature: string) => feature.trim() !== ""),
//       };

//       await handleSave(cleanedData);

//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setSaveError(error instanceof Error ? error.message : "An error occurred while saving the product");
//     }
//   };
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
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!isSubmitEnabled()) return;
     
    setSaveError(null);
    setShowModal(true);
    setIsLoading(true);
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
    setIsLoading(false);
    if (!data) {
        setIsLoading(false);
      setSaveError("An error occurred while saving the product");
    }
    // if (data) onSave(cleanedData);
  };
  const handleContinue = () => {
    setShowModal(false);
    // onClose();
  };

  const handleViewProduct = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <div className="mx-auto max-w-6xl">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              {product ? "UPDATE PRODUCT" : "UPLOAD PRODUCT"}
            </h1>

            <hr className="my-10 mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />

            {saveError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">{saveError}</p>
              </div>
            )}

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Product Name
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  This will be displayed on your product listing.
                </p>
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Short Description
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Brief description displayed in product cards.
                </p>
              </div>
              <div>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Enter a brief product description"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Full Description
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Detailed product description for the product page.
                </p>
              </div>
              <div>
                <textarea
                  rows={6}
                  value={formData.fullDescription}
                  onChange={(e) =>
                    handleInputChange("fullDescription", e.target.value)
                  }
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder="Enter detailed product description"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Category & Brand
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Product classification and manufacturer information.
                </p>
              </div>
              <div className="space-y-4">
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brand name"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Product Details
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  SKU, color, weight, dimensions, and warranty information.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SKU/Model"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Color"
                />
                <input
                  type="text"
                  required
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Weight"
                />
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    handleInputChange("dimensions", e.target.value)
                  }
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dimensions"
                />
                <input
                  type="text"
                  required
                  value={formData.warrantyInformation}
                  onChange={(e) =>
                    handleInputChange("warrantyInformation", e.target.value)
                  }
                  className="col-span-2 relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Warranty Information"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Pricing & Stock
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Set product price, discount, and stock quantity.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                />
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
                  className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Original Price"
                />
                <input
                  type="number"
                  min="0"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    handleInputChange("stock", parseInt(e.target.value) || 0)
                  }
                  className="col-span-2 relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Stock Quantity"
                />
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            {/* <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Specifications
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Technical specifications and details.
                </p>
              </div>
              <div className="space-y-3">
                {formData.specifications.map((spec: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) =>
                        handleArrayChange("specifications", index, e.target.value)
                      }
                      className="flex-1 relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter specification"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("specifications", index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("specifications")}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  + Add Specification
                </button>
              </div>
            </section> */}

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Features
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Key product features and highlights.
                </p>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange("features", index, e.target.value)
                      }
                      className="flex-1 relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  + Add Feature
                </button>
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Product Images
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Upload product photos. First image will be the main image.
                </p>
              </div>
              <div className="space-y-4">
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
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-zinc-400 mb-2" />
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Click to upload images
                    </p>
                  </div>
                </button>

                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {imagePreviewUrls.map((url: string, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                  Product Status
                </h2>
                <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                  Manage product visibility and special tags.
                </p>
              </div>
              <div className="space-y-4">

                {/* <label className="flex items-center gap-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => handleInputChange("isNew", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-zinc-950 dark:text-white text-sm">
                    Mark as New Product
                  </span>
                </label>

                <label className="flex items-center gap-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) =>
                      handleInputChange("isBestSeller", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-zinc-950 dark:text-white text-sm">
                    Mark as Best Seller
                  </span>
                </label> */}
              </div>
            </section>

            <hr className="my-10 w-full border-t border-zinc-950/5 dark:border-white/5" />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                // onClick={onClose}
                className="relative inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent text-base/6 font-semibold px-3 py-2 sm:text-sm/6 text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isSubmitEnabled()}
                className="relative inline-flex items-center justify-center gap-x-2 rounded-lg text-base/6 font-semibold px-3 py-2 sm:text-sm/6 text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 dark:disabled:hover:bg-zinc-600"
              >
                {product ? "Update Product" : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              {isLoading ? (
                <>
                  <div className="flex justify-center mb-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-2">
                    {product ? "Updating Product..." : "Uploading Product..."}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Please wait while we save your product.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-2">
                    {product ? "Product Updated!" : "Product Saved!"}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Your product has been {product ? "updated" : "saved"} successfully.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleContinue}
                      className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    >
                      Continue
                    </button>
                    <button
                      onClick={handleViewProduct}
                      className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      View Product
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
