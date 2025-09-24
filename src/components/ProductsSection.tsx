import { FC, useEffect, useState } from 'react';
import ProductGrid from './ProductGrid'; 
import { Button } from '@/components/ui/button'; 
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { useProducts } from '@/hooks/useProducts';
import { DEMO_PRODUCTS } from '@/data/products';

interface ProductsSectionProps {
  products?: Product[];
  title: string;
  subtitle: string;
  isDark?: boolean;
  useAPI?: boolean; // Flag to use API or static data
}

const ProductsSection: FC<ProductsSectionProps> = ({ 
  products: staticProducts,
  title, 
  subtitle, 
  isDark = false,
  useAPI = false
}) => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  
  // Use API hook conditionally
  const { products: apiProducts, isLoading, error } = useProducts(
    useAPI ? { isBestseller: true, isNew: true } : undefined,
    1,
    8
  );

  useEffect(() => {
    if (useAPI) {
      if (apiProducts && apiProducts.length > 0) {
        setDisplayProducts(apiProducts);
      } else if (!isLoading && !error) {
        // Fallback to static data if API returns no results
        const featuredProducts = DEMO_PRODUCTS.filter(p => p.isBestseller || p.isNew).slice(0, 8);
        setDisplayProducts(featuredProducts);
      }
    } else {
      // Use static products passed as props
      setDisplayProducts(staticProducts || []);
    }
  }, [useAPI, apiProducts, staticProducts, isLoading, error]);

  if (isLoading && useAPI) {
    return (
      <section className={`py-16 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Error State */}
        {error && useAPI && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Failed to load products from API</p>
            <p className="text-gray-600">Showing cached products instead</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="mb-12">
          <ProductGrid 
            products={displayProducts}
            limit={8}
            className="mb-8"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
            onClick={() => {
              // Navigate to category page
              window.location.href = '/products';
            }}
          >
            View All Products <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;