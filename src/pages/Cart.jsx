import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState, useEffect } from 'react';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(true);
    // Loading state (if needed in future)
  useEffect(() => { const loadDelay = setTimeout(() => setIsLoading(false), 800); 
    return () => clearTimeout(loadDelay); }, []);

  
  if (isLoading) return 
  <div className="container mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Shopping Cart
    </h1>
        <LoadingSpinner />
  </div>;


  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-blue-600 hover:underline">Continue Shopping →</Link>
      </div>
    );
  }

  const updateQuantity = (id, newQty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQty } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="space-y-4 mb-8">
        {state.items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
              />
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <p className="font-semibold ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="text-right">
        <p className="text-xl">Total: ${state.totalPrice.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="block mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 inline-block"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;