import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

const StatCard = ({ icon, label, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp size={16} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  // Mock data for stats
  const stats = [
    {
      icon: <DollarSign size={24} className="text-blue-600" />,
      label: 'Total Revenue',
      value: '$1245.05',
      trend: '+8% from last month',
    },
    {
      icon: <ShoppingBag size={24} className="text-blue-600" />,
      label: 'Total Orders',
      value: '156',
      trend: '+12% from last month',
    },
    {
      icon: <Users size={24} className="text-blue-600" />,
      label: 'Total Customers',
      value: '89',
      trend: '+2% from last month',
    },
  ];

  // State to store orders
  const [orders, setOrders] = useState([]);

  // Fetch orders from GitHub-hosted JSON file
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Laysin1/menu-json/refs/heads/main/orders.json')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Table ID</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100">
                  <td className="py-4">{order.id}</td>
                  <td className="py-4">{order.tableId}</td>
                  <td className="py-4">
                    {order.items
                      .map((item) => `${item.name} (${item.quantity})`)
                      .join(', ')}
                  </td>
                  <td className="py-4">${order.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;