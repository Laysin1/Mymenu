import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Laysin1/menu-json/refs/heads/main/menu.json')
      .then((response) => response.json())
      .then((data) => setMenuItems(data.menu))
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  const handleDelete = (categoryIndex, itemIndex) => {
    const newMenuItems = [...menuItems];
    newMenuItems[categoryIndex].items.splice(itemIndex, 1);
    setMenuItems(newMenuItems);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Menu</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus className="inline-block w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>
      
      {menuItems.map((category, categoryIndex) => (
        <div key={category.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.items.map((item, itemIndex) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full mr-3"/>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">${item.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => setEditingItem(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(categoryIndex, itemIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMenu;