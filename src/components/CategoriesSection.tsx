import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

export default function CategoriesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for cards appearing
    CATEGORIES.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements matching FeedbackSection */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-24 h-24 bg-gradient-to-br from-green-200/15 to-emerald-200/15 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-24 w-20 h-20 bg-gradient-to-br from-teal-200/15 to-cyan-200/15 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-gradient-to-br from-lime-200/15 to-green-200/15 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-16 right-1/4 w-28 h-28 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 left-8 w-12 h-12 bg-gradient-to-br from-green-300/10 to-emerald-300/10 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced title matching FeedbackSection style */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-coiny text-section-title gradient-text animate-text-glow relative">
            Shop by Category 🛍️
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto mt-4 rounded-full animate-expand"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 animate-fade-in-up-delayed">
            Discover amazing products tailored for your furry friends
          </p>
        </div>

        {/* Enhanced categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={`transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={`group cursor-pointer overflow-hidden border-0 shadow-lg relative transform transition-all duration-300 ${
                hoveredCard === index 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}>
                {/* Card glow effect matching FeedbackSection */}
                <div className={`absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Animated border matching FeedbackSection */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-glow"></div>
                <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="relative overflow-hidden">
                    <img
                      src="https://i.pinimg.com/1200x/71/48/ba/7148ba467a53bb6d3fa6aafc8bec2ba4.jpg"
                      alt={category.name}
                      className={`w-full h-40 object-cover transition-all duration-500 ${
                        hoveredCard === index 
                          ? 'scale-110 brightness-110' 
                          : 'group-hover:scale-105'
                      }`}
                    />
                    
                    {/* Enhanced gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
                      hoveredCard === index
                        ? 'from-black/70 via-black/20 to-transparent'
                        : 'from-black/60 to-transparent'
                    }`} />
                    
                    {/* Floating action buttons on hover */}
                    {hoveredCard === index && (
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 animate-fade-in-up">
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-green-50 hover:text-green-600 transition-all duration-300 animate-bounce-in">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300 animate-bounce-in-delayed">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-green-50 hover:text-green-600 transition-all duration-300 animate-bounce-in-delayed-2">
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Enhanced category name with animation */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`font-coiny text-white text-sm md:text-base text-center transition-all duration-300 ${
                        hoveredCard === index 
                          ? 'transform -translate-y-1 text-shadow-glow' 
                          : ''
                      }`}>
                        {category.name}
                      </h3>
                      
                      {/* Animated underline on hover */}
                      {hoveredCard === index && (
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mt-2 animate-slide-in"></div>
                      )}
                    </div>

                    {/* Sparkle effects on hover */}
                    {hoveredCard === index && (
                      <>
                        <div className="absolute top-6 left-6 w-2 h-2 bg-green-400 rounded-full animate-sparkle-1"></div>
                        <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-sparkle-2"></div>
                        <div className="absolute bottom-16 left-8 w-1 h-1 bg-teal-400 rounded-full animate-sparkle-3"></div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced bottom decoration matching FeedbackSection */}
        <div className="text-center mt-12 animate-fade-in-up-delayed">
          <div className="flex justify-center space-x-3 mb-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse-wave"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Everything your pet needs, all in one place! 🐾
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(90deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 40px rgba(16, 185, 129, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes expand {
          0% { width: 0; }
          100% { width: 6rem; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes slide-in {
          0% { width: 0; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(10px); }
          50% { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes sparkle-3 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(-180deg); }
        }
        
        @keyframes pulse-wave {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite 1s;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 1s ease-out 1.5s both;
        }
        
        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out;
        }
        
        .animate-bounce-in-delayed {
          animation: bounce-in 0.4s ease-out 0.1s both;
        }
        
        .animate-bounce-in-delayed-2 {
          animation: bounce-in 0.4s ease-out 0.2s both;
        }
        
        .animate-sparkle-1 {
          animation: sparkle-1 1.5s ease-in-out infinite;
        }
        
        .animate-sparkle-2 {
          animation: sparkle-2 1.8s ease-in-out infinite 0.3s;
        }
        
        .animate-sparkle-3 {
          animation: sparkle-3 2s ease-in-out infinite 0.6s;
        }
        
        .animate-pulse-wave {
          animation: pulse-wave 2s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(34, 197, 94, 0.4);
        }
      `}</style>
    </section>
  );
}