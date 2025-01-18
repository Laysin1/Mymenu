import React, { useState, useEffect } from 'react';

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Laysin1/menu-json/refs/heads/main/menu.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Debug: Check fetched data
        setMenuItems(data.menu);
      })
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {menuItems.map((category) =>
          category.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.name}
                  </h5>
                  <h5 className="text-lg sm:text-xl font-semibold text-red-600">
                    ${item.price.toFixed(2)}
                  </h5>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {item.description}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                  className="w-full py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;