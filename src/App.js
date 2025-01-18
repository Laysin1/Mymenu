import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/user/Header';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminMenu from './components/admin/AdminMenu';
import AdminOrders from './components/admin/AdminOrders';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Route */}
        <Route path="/table/:tableId" element={<UserPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;