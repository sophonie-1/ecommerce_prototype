import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    payment: 'credit',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.address) newErrors.address = 'Address required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Mock payment success
    alert(`Order placed successfully for $${state.totalPrice.toFixed(2)}! Check your email for confirmation.`);
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <p className="text-gray-600 mb-4">Your cart is empty. Nothing to checkout.</p>
        <Link to="/products" className="text-blue-600 hover:underline">Continue Shopping →</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <Link to="/cart" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Cart</Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} (x{item.quantity})</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="text-right">
            <p className="text-lg font-bold">Total: ${state.totalPrice.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.address ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            {/* City & ZIP */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            
            {/* Payment */}
            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={formData.payment === 'credit'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="debit"
                    checked={formData.payment === 'debit'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={formData.payment === 'paypal'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  PayPal
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;