import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { dispatch } = useCart();
  
  // Loading/Error states (basic)
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Not Found</h1>
        <Link to="/products" className="text-blue-600 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1); // For future cart

  const handleAddToCart = () => {
    
    dispatch({
        type: 'ADD_ITEM',
        payload: { product, quantity },
    });
    alert(`${quantity} x ${product.name} added to cart!`); // Keep feedback
};

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/products" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Products</Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover" 
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} // Hide img, show fallback
        />
        <span className="hidden text-gray-500">Image not available</span>
        </div>
        
        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">⭐ {product.rating}</span>
            <span className="text-sm text-gray-500 ml-2">(Based on customer reviews)</span>
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-6">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Add to Cart
          </button>
          
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">Category: {product.category}</h3>
            {/* Add more specs here if data expands */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;