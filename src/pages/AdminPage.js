import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminPage = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/menu', label: 'Manage Menu' },
    { path: '/admin/orders', label: 'Orders' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block p-3 rounded-lg mb-2 ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;