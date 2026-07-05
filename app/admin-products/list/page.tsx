'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminSidebar } from '@/app/components/admin/AdminSidebar';
import { getProducts, deleteProduct } from '@/app/services/productService';
import { Package, Trash2, Edit, Eye, Plus } from 'lucide-react';

export default function AdminProductList() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      router.push('/admin');
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts();
    if (result.success) {
      setProducts(result.products);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(id);
      if (result.success) {
        alert('✅ Product deleted!');
        fetchProducts();
      }
    }
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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📦 All Products</h1>
              <p className="text-gray-500">Manage your product catalog</p>
            </div>
            <Link
              href="/admin-products"
              className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Add Product
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12"><p className="text-gray-500">Loading products...</p></div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-rose-100">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products yet</p>
              <Link href="/admin-products" className="mt-2 text-rose-500 hover:text-rose-600 font-medium inline-block">
                Add your first product →
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image || '/images/placeholder.jpg'} 
                              alt={product.name} 
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                              onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg'; }}
                            />
                            <div>
                              <p className="font-medium text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                            {product.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">₦{product.price?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-500">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-yellow-50 rounded-lg text-gray-400 hover:text-yellow-500">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}