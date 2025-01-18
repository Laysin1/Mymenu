import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Laysin1/menu-json/refs/heads/main/menu.json')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.menu);
      })
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newMenuItems = menuItems.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.id !== itemId),
      }));
      setMenuItems(newMenuItems);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (updatedItem) => {
    const newMenuItems = menuItems.map((category) => ({
      ...category,
      items: category.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
    setMenuItems(newMenuItems);
    setEditingItem(null);
  };

  const handleAddNewItem = () => {
    // TODO: Open a modal or form to add a new item
    console.log('Add new item');
  };

  if (menuItems.length === 0) {
    return <div className="p-6">No menu items found.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Menu</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddNewItem}
        >
          <Plus className="inline-block w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>

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
            {menuItems.map((category) =>
              category.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full mr-3" />
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">${item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

const EditItemModal = ({ item, onSave, onClose }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    onSave({ ...item, name, price, description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Item Name"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Price"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;