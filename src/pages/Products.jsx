import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import { products } from '../data/products';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true); // New: Loading state

  // Debounce + Load delay
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Mock API delay
    const loadDelay = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(loadDelay);
  }, []);

  // Categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products (e.g., 'laptop' or 'i7')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:min-w-0" // Mobile width fix
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]" // Mobile min-width
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Results Count */}
        <p className="text-sm text-gray-500 mt-2">
          Showing {debouncedSearch || categoryFilter !== 'All' ? 'filtered ' : ''}{products.length} results
        </p>
      </div>
      
      {/* Product Grid */}
      <ProductList searchTerm={debouncedSearch} categoryFilter={categoryFilter} />
    </div>
  );
};

export default Products;