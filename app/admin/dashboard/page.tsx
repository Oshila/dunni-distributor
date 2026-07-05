'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProducts } from '@/app/services/productService';
import { getOrders } from '@/app/services/orderService';
import { AdminSidebar } from '@/app/components/admin/AdminSidebar';
import { Package, ShoppingBag, Plus, Users, TrendingUp, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      router.push('/admin');
    }
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      const orders = await getOrders();
      
      setStats({
        products: products.success ? products.products.length : 0,
        orders: orders.success ? orders.orders.length : 0,
        revenue: orders.success ? orders.orders.reduce((sum, o) => sum + (o.total || 0), 0) : 0,
        pendingOrders: orders.success ? orders.orders.filter((o: any) => o.status === 'pending').length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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

  // Quick action cards for dashboard
  const quickActions = [
    { 
      title: 'Add Product', 
      description: 'Add a new product to your store',
      icon: Plus,
      href: '/admin-products',
      color: 'rose'
    },
    { 
      title: 'View Orders', 
      description: 'Manage and update orders',
      icon: ShoppingBag,
      href: '/admin-orders',
      color: 'blue'
    },
    { 
      title: 'All Products', 
      description: 'View and manage your products',
      icon: Package,
      href: '/admin-products/list',
      color: 'green'
    },
    { 
      title: 'Categories', 
      description: 'Manage product categories',
      icon: Package,
      href: '/admin/categories',
      color: 'purple'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>
          </div>

          {/* Stats */}
          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-100 rounded-xl"><Package size={20} className="text-rose-500" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.products}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl"><ShoppingBag size={20} className="text-blue-500" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.orders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl"><TrendingUp size={20} className="text-green-500" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-rose-500">₦{stats.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 rounded-xl"><Users size={20} className="text-yellow-500" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-500">{stats.pendingOrders}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="h-6 bg-gray-200 rounded mt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClasses = {
                rose: 'bg-rose-100 text-rose-500 hover:bg-rose-200',
                blue: 'bg-blue-100 text-blue-500 hover:bg-blue-200',
                green: 'bg-green-100 text-green-500 hover:bg-green-200',
                purple: 'bg-purple-100 text-purple-500 hover:bg-purple-200',
              };
              
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className={`p-3 rounded-xl ${colorClasses[action.color as keyof typeof colorClasses]} w-fit mb-3`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-rose-500 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              );
            })}
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Recent Orders</h2>
              <Link href="/admin-orders" className="text-sm text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="p-6 text-center text-gray-500">
              <p>Orders will appear here once customers place them</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}