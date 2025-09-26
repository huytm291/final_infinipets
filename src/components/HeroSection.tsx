import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_PRODUCTS } from '@/lib/constants';

interface HeroSectionProps {
  isDark?: boolean;
}

export default function HeroSection({ isDark = false }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance hero slider with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

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

  const currentProduct = HERO_PRODUCTS[currentSlide];

  return (
    <section 
      className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-brand-cyan/20 to-brand-green/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

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
              {/* Enhanced Background Image with Parallax Effect */}
              <div 
                className={`w-full h-full transition-all duration-1200 ease-out ${
                  isActive ? 'scale-100' : 'scale-110'
                }`}
                style={{
                  filter: isActive ? 'brightness(1) contrast(1.1)' : 'brightness(0.8) contrast(0.9)',
                }}
              >
                <img
                  src="https://i.pinimg.com/736x/e8/5b/fb/e85bfbb938c68e4e036aa51f08fca49b.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Dynamic Gradient Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-60 transition-all duration-1200 ${
                  isActive ? 'opacity-60' : 'opacity-80'
                }`}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)`
                    : `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)`,
                }}
              />
              
              {/* Main Content Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-8 px-4 max-w-6xl">
                  
                  {/* Category Badge */}
                  <div 
                    className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 transition-all duration-1200 delay-100 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></span>
                    <span className="text-white/90 text-sm font-medium capitalize">
                      {HERO_PRODUCTS.find(p => p.category === product.category)?.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Enhanced Product Title */}
                  <h1 
                    className={`font-coiny text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1200 delay-300 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                        : 'opacity-0 translate-y-12 scale-95 rotate-1'
                    }`}
                    style={{
                      background: 'linear-gradient(45deg, #ffffff, #00B8D9, #ffffff)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: isActive ? 'gradientShift 4s ease-in-out infinite, textFloat 6s ease-in-out infinite' : 'none',
                      textShadow: isActive ? '0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    {product.name}
                  </h1>

                  {/* Product Features */}
                  <div 
                    className={`flex flex-wrap justify-center gap-3 transition-all duration-1200 delay-400 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    {product.features?.map((feature, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <span className="text-white/90 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Product Description */}
                  <div 
                    className={`max-w-2xl mx-auto transition-all duration-1200 delay-500 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  >
                    <p className="text-white/80 text-lg leading-relaxed">
                      Discover premium high-quality fashion products for your beloved pets
                    </p>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div 
                    className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1200 delay-700 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-6 scale-95'
                    }`}
                  >
                    <Button 
                      size="lg" 
                      className="group gradient-primary hover:opacity-90 text-white text-lg px-10 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-110 active:scale-95 focus-ring shadow-xl hover:shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #0077C2 0%, #00B8D9 50%, #00C853 100%)',
                        backgroundSize: '200% 200%',
                        boxShadow: '0 10px 40px rgba(0, 119, 194, 0.4), 0 0 0 1px rgba(0, 119, 194, 0.2)',
                        animation: isActive ? 'buttonGradientShift 4s ease-in-out infinite, buttonGlow 3s ease-in-out infinite' : 'none',
                      }}
                    >
                      <span className="relative z-10 font-semibold tracking-wide">Explore Now</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white text-lg px-10 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105"
                    >
                      <Eye className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      <span>View Details</span>
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
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-brand-cyan/20 text-white border border-white/20 hover:border-brand-cyan/40 rounded-full w-16 h-16 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-brand-cyan/25 active:scale-95 z-30"
        onClick={prevSlide}
        disabled={isTransitioning}
        style={{
          backdropFilter: 'blur(15px)',
        }}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-brand-cyan/20 text-white border border-white/20 hover:border-brand-cyan/40 rounded-full w-16 h-16 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-brand-cyan/25 active:scale-95 z-30"
        onClick={nextSlide}
        disabled={isTransitioning}
        style={{
          backdropFilter: 'blur(15px)',
        }}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
        {HERO_PRODUCTS.map((_, index) => (
          <button
            key={index}
            className={`relative transition-all duration-700 rounded-full ${
              index === currentSlide 
                ? 'w-16 h-4 bg-white shadow-xl' 
                : 'w-4 h-4 bg-white/50 hover:bg-white/70 hover:scale-125'
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            style={{
              boxShadow: index === currentSlide 
                ? '0 0 20px rgba(0, 184, 217, 0.6), 0 4px 15px rgba(0,0,0,0.2)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green rounded-full opacity-90"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'indicatorPulse 3s ease-in-out infinite, gradientShift 4s ease-in-out infinite',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 backdrop-blur-sm z-30">
        <div 
          className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green transition-all duration-700 ease-out"
          style={{
            width: `${((currentSlide + 1) / HERO_PRODUCTS.length) * 100}%`,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease-in-out infinite',
            boxShadow: '0 0 15px rgba(0, 184, 217, 0.6)',
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/20 rounded-full animate-ping pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/50 rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/50 rounded-full animate-pulse delay-1000 pointer-events-none"></div>

      <style jsx>{`
        :root {
          --brand-blue: #0077C2;
          --brand-cyan: #00B8D9;
          --brand-green: #00C853;
        }
        
        .bg-brand-blue\\/20 {
          background-color: rgb(0 119 194 / 0.2);
        }
        
        .bg-brand-cyan\\/20 {
          background-color: rgb(0 184 217 / 0.2);
        }
        
        .bg-brand-green\\/20 {
          background-color: rgb(0 200 83 / 0.2);
        }
        
        .bg-brand-blue\\/10 {
          background-color: rgb(0 119 194 / 0.1);
        }
        
        .bg-brand-cyan\\/10 {
          background-color: rgb(0 184 217 / 0.1);
        }
        
        .bg-brand-cyan {
          background-color: var(--brand-cyan);
        }
        
        .hover\\:bg-brand-cyan\\/20:hover {
          background-color: rgb(0 184 217 / 0.2);
        }
        
        .hover\\:border-brand-cyan\\/40:hover {
          border-color: rgb(0 184 217 / 0.4);
        }
        
        .hover\\:shadow-brand-cyan\\/25:hover {
          --tw-shadow-color: rgb(0 184 217 / 0.25);
          --tw-shadow: var(--tw-shadow-colored);
        }
        
        .from-brand-blue {
          --tw-gradient-from: var(--brand-blue);
          --tw-gradient-to: rgb(0 119 194 / 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
        
        .via-brand-cyan {
          --tw-gradient-to: rgb(0 184 217 / 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--brand-cyan), var(--tw-gradient-to);
        }
        
        .to-brand-green {
          --tw-gradient-to: var(--brand-green);
        }
        
        .gradient-primary {
          background: linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-cyan) 50%, var(--brand-green) 100%);
        }
        
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
            box-shadow: 0 10px 40px rgba(0, 119, 194, 0.4), 0 0 0 1px rgba(0, 119, 194, 0.2);
          }
          50% {
            box-shadow: 0 15px 50px rgba(0, 119, 194, 0.6), 0 0 0 1px rgba(0, 119, 194, 0.4), 0 0 30px rgba(0, 119, 194, 0.3);
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}