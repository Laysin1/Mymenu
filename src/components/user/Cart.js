import React from 'react';

const Cart = ({ cart, updateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="md:w-80">
      <div className="bg-white p-4 rounded-lg shadow sticky top-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                <div className="flex-grow">
                  <h3 className="font-bold">{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, 'decrement')}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 'increment')}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="font-bold text-lg">
                Total: ${total.toFixed(2)}
              </p>
              <button
                className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;