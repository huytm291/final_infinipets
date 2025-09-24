import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_PRODUCTS } from '@/lib/constants';

interface HeroSectionProps {
  isDark?: boolean;
}

export default function HeroSection({ isDark = false }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_PRODUCTS.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="relative w-full h-full">
        {HERO_PRODUCTS.map((product, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
          const isNext = index === (currentSlide + 1) % HERO_PRODUCTS.length;
          
          return (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 translate-x-0 z-20'
                  : isPrev
                  ? 'opacity-0 scale-105 -translate-x-full z-10'
                  : isNext
                  ? 'opacity-0 scale-105 translate-x-full z-10'
                  : 'opacity-0 scale-110 translate-x-0 z-0'
              }`}
              style={{
                transform: `translateX(${
                  isActive ? '0%' : isPrev ? '-100%' : isNext ? '100%' : '0%'
                }) scale(${isActive ? 1 : 1.05})`,
              }}
            >
              {/* Background Image with Parallax Effect */}
              <div 
                className={`w-full h-full transition-transform duration-1000 ease-out ${
                  isActive ? 'scale-100' : 'scale-110'
                }`}
              >
                <img
                  src="https://i.pinimg.com/1200x/b8/51/cd/b851cdec16c09d58fde8508437763581.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Animated Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50 transition-opacity duration-1000 ${
                  isActive ? 'opacity-100' : 'opacity-70'
                }`} 
              />
              
              {/* Content Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-6 px-4 max-w-4xl">
                  {/* Animated Title */}
                  <h1 
                    className={`font-coiny text-hero bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transition-all duration-1000 delay-300 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      backgroundSize: '200% 200%',
                      animation: isActive ? 'gradientShift 3s ease-in-out infinite' : 'none',
                    }}
                  >
                    {product.name}
                  </h1>
                  
                  {/* Animated Price */}
                  <p 
                    className={`text-xl md:text-2xl font-semibold transition-all duration-1000 delay-500 ${
                      isActive 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Starting from ${product.price}
                    </span>
                  </p>
                  
                  {/* Animated Button */}
                  <div 
                    className={`transition-all duration-1000 delay-700 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95'
                    }`}
                  >
                    <Button 
                      size="lg" 
                      className="gradient-primary text-white hover:opacity-90 text-lg px-8 py-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                      }}
                    >
                      <span className="relative z-10">Shop Now</span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/25 active:scale-95"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/25 active:scale-95"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {HERO_PRODUCTS.map((_, index) => (
          <button
            key={index}
            className={`relative transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-12 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70 hover:scale-125'
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-80"
                style={{
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / HERO_PRODUCTS.length) * 100}%`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .gradient-primary {
          position: relative;
          overflow: hidden;
        }
        
        .gradient-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .gradient-primary:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  );
}