'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/app/components/admin/AdminSidebar';
import { addProduct } from '@/app/services/productService';
import { uploadImage } from '@/app/services/uploadService';
import { Plus, X, Upload, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    sizes: [] as string[],
    colors: [] as string[],
    inStock: true,
    featured: false
  });
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleUploadImage = async () => {
  if (!imageFile) {
    alert('Please select an image first');
    return;
  }
  
  setUploadingImage(true);
  console.log('Starting image upload...');
  console.log('File:', imageFile.name, imageFile.type, imageFile.size);
  
  try {
    const url = await uploadImage(imageFile);
    console.log('Upload successful, URL:', url);
    
    setFormData({ ...formData, image: url });
    setImageFile(null);
    setImagePreview('');
    alert('✅ Image uploaded successfully!');
  } catch (error: any) {
    console.error('Upload error:', error);
    alert(`❌ Upload failed: ${error.message || 'Unknown error'}`);
  }
  
  setUploadingImage(false);
};

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
      setNewSize('');
    }
  };

  const handleRemoveSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setNewColor('');
    }
  };

  const handleRemoveColor = (color: string) => {
    setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      alert('⚠️ Please fill in all required fields');
      return;
    }

    if (!formData.image) {
      alert('⚠️ Please upload a product image first.');
      return;
    }

    setLoading(true);
    
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        description: formData.description,
        image: formData.image,
        sizes: formData.sizes,
        colors: formData.colors,
        inStock: formData.inStock,
        featured: formData.featured
      };

      console.log('Saving product:', productData);
      
      const result = await addProduct(productData);
      
      if (result.success) {
        alert('✅ Product added successfully!');
        // Reset form
        setFormData({
          name: '',
          category: '',
          price: '',
          description: '',
          image: '',
          sizes: [],
          colors: [],
          inStock: true,
          featured: false
        });
        setImagePreview('');
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert(`❌ Failed to add product: ${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      alert(`❌ Error: ${error.message || 'Unknown error'}`);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
              <p className="text-gray-500">Fill in the details to add a new product</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
                placeholder="e.g., Floral Print Maxi Dress"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700"
                required
              >
                <option value="">Select category</option>
                <option value="Dresses">Dresses</option>
                <option value="Bags">Bags</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Jewelry">Jewelry</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₦) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
                placeholder="e.g., 25000"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500 resize-none"
                placeholder="Describe your product..."
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image *
              </label>
              
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Product"
                    className="w-full h-48 object-contain rounded-xl border border-gray-200 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors">
                  {imagePreview ? (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-contain mb-4"
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleUploadImage}
                          disabled={uploadingImage}
                          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
                        >
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-8 flex flex-col items-center gap-2"
                      >
                        <Upload size={48} className="text-gray-400" />
                        <span className="text-gray-500">Click to select an image</span>
                        <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sizes
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="e.g., M"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sizes.map((size) => (
                  <span key={size} className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="hover:text-rose-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colors
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="e.g., Red"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.colors.map((color) => (
                  <span key={color} className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="hover:text-rose-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Toggle Options */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}