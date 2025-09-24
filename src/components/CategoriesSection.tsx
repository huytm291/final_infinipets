import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/constants';

export default function CategoriesSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="font-coiny text-section-title text-center mb-12 gradient-text">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <Card key={category.id} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://i.pinimg.com/1200x/71/48/ba/7148ba467a53bb6d3fa6aafc8bec2ba4.jpg"
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-coiny text-white text-sm md:text-base text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}