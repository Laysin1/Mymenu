import React from 'react';

const Cart = ({ cart, updateQuantity, placeOrder, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 sticky top-4">
      <h2 className="text-2xl font-semibold text-red-600 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, 'decrement')}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 'increment')}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="text-xl font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </p>
            <div className="flex gap-6 mt-6"> {/* Increased gap between buttons */}
              <button
                onClick={clearCart}
                style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                className="w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  placeOrder(); // Place the order
                  clearCart(); // Clear the cart after placing the order
                }}
                style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;