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
              className={`absolute inset-0 transition-all duration-1200 ease-out ${
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
              {/* Background Image with Enhanced Parallax Effect */}
              <div 
                className={`w-full h-full transition-all duration-1200 ease-out ${
                  isActive ? 'scale-100' : 'scale-110'
                }`}
                style={{
                  filter: isActive ? 'brightness(1) contrast(1.1)' : 'brightness(0.8) contrast(0.9)',
                }}
              >
                <img
                  src="https://i.pinimg.com/1200x/b8/51/cd/b851cdec16c09d58fde8508437763581.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Enhanced Animated Overlay with Gradient Animation */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 transition-all duration-1200 ${
                  isActive ? 'opacity-100' : 'opacity-70'
                }`}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
                }}
              />
              
              {/* Content Container with Enhanced Animations */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-8 px-4 max-w-4xl">
                  {/* Enhanced Animated Title with Multiple Effects */}
                  <h1 
                    className={`font-coiny text-hero bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transition-all duration-1200 delay-300 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                        : 'opacity-0 translate-y-12 scale-95 rotate-1'
                    }`}
                    style={{
                      backgroundSize: '300% 300%',
                      animation: isActive ? 'gradientShift 4s ease-in-out infinite, textFloat 6s ease-in-out infinite' : 'none',
                      textShadow: isActive ? '0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    {product.name}
                  </h1>
                  
                  {/* Enhanced Animated Price with Glow Effect */}
                  <p 
                    className={`text-xl md:text-2xl font-semibold transition-all duration-1200 delay-600 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      filter: isActive ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))' : 'none',
                    }}
                  >
                    <span 
                      className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                      style={{
                        backgroundSize: '200% 200%',
                        animation: isActive ? 'gradientShift 3s ease-in-out infinite' : 'none',
                      }}
                    >
                      Starting from ${product.price}
                    </span>
                  </p>
                  
                  {/* Premium Green Button with Enhanced Animations */}
                  <div 
                    className={`transition-all duration-1200 delay-900 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-6 scale-95'
                    }`}
                  >
                    <Button 
                      size="lg" 
                      className="premium-green-button text-white text-lg px-10 py-4 rounded-full transform transition-all duration-500 hover:scale-110 active:scale-95 focus-ring"
                      style={{
                        background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-dark-green) 50%, var(--accent-emerald) 100%)',
                        backgroundSize: '200% 200%',
                        boxShadow: '0 10px 40px rgba(74, 222, 128, 0.4), 0 0 0 1px rgba(74, 222, 128, 0.2)',
                        animation: isActive ? 'buttonGradientShift 4s ease-in-out infinite, buttonGlow 3s ease-in-out infinite' : 'none',
                      }}
                    >
                      <span className="relative z-10 font-semibold tracking-wide">Shop Now</span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 hover:opacity-100 transition-all duration-500" 
                           style={{ backgroundSize: '200% 200%' }} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Navigation Arrows with Green Theme */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-green-500/20 text-white border border-white/20 hover:border-green-400/40 rounded-full w-14 h-14 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-green-400/25 active:scale-95"
        onClick={prevSlide}
        disabled={isTransitioning}
        style={{
          backdropFilter: 'blur(15px)',
        }}
      >
        <ChevronLeft className="w-7 h-7" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-green-500/20 text-white border border-white/20 hover:border-green-400/40 rounded-full w-14 h-14 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-green-400/25 active:scale-95"
        onClick={nextSlide}
        disabled={isTransitioning}
        style={{
          backdropFilter: 'blur(15px)',
        }}
      >
        <ChevronRight className="w-7 h-7" />
      </Button>

      {/* Enhanced Slide Indicators with Green Theme */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
        {HERO_PRODUCTS.map((_, index) => (
          <button
            key={index}
            className={`relative transition-all duration-700 rounded-full ${
              index === currentSlide 
                ? 'w-14 h-4 bg-white shadow-xl' 
                : 'w-4 h-4 bg-white/50 hover:bg-white/70 hover:scale-125'
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            style={{
              boxShadow: index === currentSlide 
                ? '0 0 20px rgba(74, 222, 128, 0.6), 0 4px 15px rgba(0,0,0,0.2)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full opacity-90"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'indicatorPulse 3s ease-in-out infinite, gradientShift 4s ease-in-out infinite',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Bar with Green Theme */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 transition-all duration-700 ease-out"
          style={{
            width: `${((currentSlide + 1) / HERO_PRODUCTS.length) * 100}%`,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease-in-out infinite',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.6)',
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
        
        @keyframes buttonGradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes buttonGlow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(74, 222, 128, 0.4), 0 0 0 1px rgba(74, 222, 128, 0.2);
          }
          50% {
            box-shadow: 0 15px 50px rgba(74, 222, 128, 0.6), 0 0 0 1px rgba(74, 222, 128, 0.4), 0 0 30px rgba(74, 222, 128, 0.3);
          }
        }
        
        @keyframes textFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes indicatorPulse {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .premium-green-button {
          position: relative;
          overflow: hidden;
        }
        
        .premium-green-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .premium-green-button:hover::before {
          left: 100%;
        }
        
        .premium-green-button:hover {
          background: linear-gradient(135deg, var(--primary-dark-green) 0%, var(--accent-emerald) 50%, var(--accent-teal) 100%) !important;
          box-shadow: 0 15px 50px rgba(74, 222, 128, 0.6), 0 0 0 1px rgba(74, 222, 128, 0.4), 0 0 30px rgba(74, 222, 128, 0.3) !important;
          transform: translateY(-3px) scale(1.1);
        }
        
        .premium-green-button:active {
          transform: translateY(-1px) scale(1.05);
        }
      `}</style>
    </section>
  );
}