import { useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductList = ({ searchTerm = '', categoryFilter = 'All' }) => {
  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 py-8">No products found. Try adjusting your search or filter.</p>
      )}
    </div>
  );
};

export default ProductList;