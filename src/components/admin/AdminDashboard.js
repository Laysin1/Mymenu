import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, ShoppingCart } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/menu" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <MenuIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-xl font-bold">Manage Menu</h2>
              <p className="text-gray-600">Add, edit, or remove menu items</p>
            </div>
          </div>
        </Link>
        <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <ShoppingCart className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-xl font-bold">View Orders</h2>
              <p className="text-gray-600">Manage and track customer orders</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;