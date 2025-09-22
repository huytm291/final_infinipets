import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, SAMPLE_PRODUCTS } from '@/lib/constants';

export default function ProductsSection() {
  return (
    <>
      {Object.entries(SAMPLE_PRODUCTS).map(([categoryKey, products]) => {
        const category = CATEGORIES.find(c => c.id === categoryKey);
        return (
          <section key={categoryKey} className="py-12 px-4">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-coiny text-section-title gradient-text">
                  {category?.name}
                </h2>
                <Button variant="outline" className="group">
                  Xem thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}