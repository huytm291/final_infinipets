import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_PRODUCTS } from '@/lib/constants';

interface HeroSectionProps {
  isDark?: boolean;
}

export default function HeroSection({ isDark = false }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_PRODUCTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="relative w-full h-full">
        {HERO_PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : index === (currentSlide - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length
                ? 'opacity-0 scale-95 -translate-x-full'
                : 'opacity-0 scale-95 translate-x-full'
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4 px-4">
                <h1 className="font-coiny text-hero gradient-text bg-white bg-clip-text">
                  {product.name}
                </h1>
                <p className="text-xl md:text-2xl">Starting from ${product.price}</p>
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {HERO_PRODUCTS.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}