'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const searchOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter an order number or email');
      return;
    }
    
    setError('');
    setLoading(true);
    setSearched(true);
    
    try {
      const searchLower = searchTerm.trim().toLowerCase();
      let ordersList: any[] = [];
      
      // Fetch all orders and filter (case insensitive)
      const querySnapshot = await getDocs(collection(db, 'orders'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const orderNumber = data.orderNumber || '';
        const email = data.customer?.email || '';
        const phone = data.customer?.phone || '';
        
        if (
          orderNumber.toLowerCase() === searchLower ||
          email.toLowerCase() === searchLower ||
          phone === searchTerm.trim()
        ) {
          ordersList.push({ id: doc.id, ...data });
        }
      });
      
      setOrders(ordersList);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to search orders. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
          
          <div className="bg-white rounded-3xl p-6 shadow-md border border-rose-100 mb-6">
            <p className="text-gray-700 font-medium mb-4">Find your orders:</p>
            <form onSubmit={searchOrders} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter order number (JOI-XXXX) or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors whitespace-nowrap"
              >
                Find Orders
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              💡 Search by Order Number (e.g., JOI-1234) or your email address
            </p>
          </div>

          {searched && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-rose-100">
              <h2 className="font-semibold text-gray-700 mb-4">
                {loading ? 'Searching...' : `${orders.length} order(s) found`}
              </h2>
              
              {loading ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No orders found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Check your order number or email and try again
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <Link href={`/order/${order.orderNumber}`} className="font-bold text-rose-500 hover:underline">
                            {order.orderNumber}
                          </Link>
                          <p className="text-sm text-gray-500">
                            {order.createdAt?.toDate?.() ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₦{(order.total || 0).toLocaleString()}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/order/${order.orderNumber}`}
                        className="inline-block mt-3 text-sm text-rose-500 hover:text-rose-600 transition-colors font-medium"
                      >
                        🔍 View Order →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}