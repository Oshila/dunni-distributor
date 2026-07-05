'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-rose-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl">👗</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Dunni the Distributor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-500"
            required
          />
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Default password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span>
          </p>
        </form>
      </div>
    </div>
  );
}