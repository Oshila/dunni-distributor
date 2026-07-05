'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Plus, 
  List, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface AdminSidebarProps {
  onLogout: () => void;
}

export const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin-products', label: 'Add Product', icon: Plus },
    { href: '/admin-products/list', label: 'All Products', icon: List },
    { href: '/admin-orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/categories', label: 'Categories', icon: Package },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-xl shadow-md border border-gray-200"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 pt-20 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.href)
                  ? 'bg-rose-50 text-rose-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};