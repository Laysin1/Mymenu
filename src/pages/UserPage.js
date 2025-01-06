import React, { useState, useEffect } from 'react';
import Header from '../components/user/Header';
import Menu from '../components/user/Menu';
import Cart from '../components/user/Cart';

const UserPage = () => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch menu data
    fetch('https://raw.githubusercontent.com/Laysin1/menu-json/refs/heads/main/menu.json')
      .then((response) => response.json())
      .then((data) => setMenuItems(data.menu))
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const updateQuantity = (itemId, action) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: action === 'increment' ? item.quantity + 1 : 
                    action === 'decrement' && item.quantity > 1 ? item.quantity - 1 : 1
        };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search menu..."
          className="w-full max-w-md mx-auto mb-8 p-2 rounded border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-6">
          <Menu 
            menuItems={menuItems} 
            addToCart={addToCart}
            searchQuery={searchQuery}
          />
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;