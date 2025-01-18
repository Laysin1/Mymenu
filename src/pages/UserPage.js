import React, { useState } from 'react';
import Menu from '../components/user/Menu';
import Cart from '../components/user/Cart';
import Header from '../components/user/Header';

const UserPage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, action) => {
    setCart(
      cart
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity:
                  action === 'increment'
                    ? item.quantity + 1
                    : Math.max(item.quantity - 1, 0),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = () => {
    // Send order to the backend
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableId: 'Table 1', // Replace with the actual table ID
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order placed:', data);
        setCart([]); // Clear the cart after placing the order
      })
      .catch((error) => console.error('Error placing order:', error));
  };

  const clearCart = () => {
    setCart([]); // Clear the cart
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <Menu addToCart={addToCart} />
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            placeOrder={placeOrder}
            clearCart={clearCart} // Pass the clearCart function
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;