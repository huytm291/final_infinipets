import { FC } from 'react';
import ProductGrid from './ProductGrid'; 
import { Button } from '@/components/ui/button'; 
import { ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  products: any[]; // Array Product từ DEMO_PRODUCTS hoặc Supabase
  title: string;
  subtitle: string;
  isDark?: boolean; // Theme prop
}

export const ProductsSection: FC<ProductsSectionProps> = ({ 
  products, 
  title, 
  subtitle, 
  isDark = false 
}) => {
  return (
    <section className={`py-16 px-4 md:px-8 lg:px-16 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Product Grid: Static với limit=8, dùng products prop */}
        <div className="mb-12">
          <ProductGrid 
            products={products} // Pass static featured
            limit={8} // Giới hạn 8 cho homepage
            className="mb-8" // Custom class nếu cần
          />
        </div>

        {/* Call to Action: "Xem thêm" button, link đến category (static, không fetch) */}
        <div className="text-center">
          <Button 
            size="lg" 
            className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
            onClick={() => {
              // Navigate đến category page (dùng Next.js router nếu có)
              // Ví dụ: window.location.href = '/category/all';
              alert('Redirect to categories - implement navigation here!'); // Để test
            }}
          >
            View All Products <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};