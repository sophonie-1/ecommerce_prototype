import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // For badge

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart(); // For badge

  return (
    <header className="bg-blue-800 text-white fixed top-0 left-0 w-full py-6 z-50"> {/* Fixed: w-full */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center"> {/* Matches footer: px-4, no lg:px-0 */}
        {/* Logo - No extra pl */}
        <Link to="/" className="text-2xl font-bold">
          Marz Computers
        </Link>
        
        {/* Desktop Nav - No extra pr, symmetric */}
        <nav className="hidden md:flex space-x-6 items-center"> {/* Removed redundant flex-row, space-x-4 md:space-x-6 */}
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-200 transition">Products</Link>
          <Link to="/cart" className="relative hover:text-blue-200 transition">
            Cart
            {state.totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"> {/* Tweaked position/size for better fit */}
                {state.totalItems}
              </span>
            )}
          </Link>
        </nav>
        
        {/* Mobile Menu Button - No pr */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      
      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-700 px-4 py-2 space-y-2"> {/* Matches container px-4 */}
          <Link to="/" className="block py-1 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block py-1 hover:text-blue-200 transition" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/cart" className="block py-1 hover:text-blue-200 transition relative" onClick={() => setIsMenuOpen(false)}>
            Cart
            {state.totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center ml-2"> {/* Adjusted for inline */}
                {state.totalItems}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;