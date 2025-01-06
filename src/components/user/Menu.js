import React from 'react';

const Menu = ({ menuItems, addToCart, searchQuery }) => {
  const filteredMenuItems = menuItems.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="flex-grow">
      {filteredMenuItems.map(category => (
        <div key={category.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-4"/>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold">${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;