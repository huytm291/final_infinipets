import ProductCard from './ProductCard';
import { Product } from '@/lib/types';

interface ProductGridProps {
  products?: Product[];
  category?: string;
  limit?: number;
  className?: string;
}

export default function ProductGrid({ products = [], category, limit, className = '' }: ProductGridProps) {
  let displayProducts = products;
  
  if (category && category !== 'all') {
    displayProducts = products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (limit) {
    displayProducts = displayProducts.slice(0, limit);
  }

  if (displayProducts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 ${className}`}>
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}