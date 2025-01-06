import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminMenu from '../components/admin/AdminMenu';
import AdminOrders from '../components/admin/AdminOrders';
import { Menu as MenuIcon, ShoppingCart } from 'lucide-react';
const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/menu" element={<AdminMenu />} />
        <Route path="/orders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
};

export default AdminPage;