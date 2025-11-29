import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* // In ProductCard, replace  line with: */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover" 
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} // Hide img, show fallback
        />
        <span className="hidden text-gray-500">Image not available</span>
        </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className="text-yellow-500">⭐ {product.rating}</span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;