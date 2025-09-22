import ProductCard from './ProductCard';
import { DEMO_PRODUCTS } from '@/data/products';

interface ProductGridProps {
  category?: string;
  limit?: number;
}

export default function ProductGrid({ category, limit }: ProductGridProps) {
  let filteredProducts = DEMO_PRODUCTS;
  
  if (category && category !== 'all') {
    filteredProducts = DEMO_PRODUCTS.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}