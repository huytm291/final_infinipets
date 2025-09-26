import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_FEEDBACK } from '@/lib/constants';
import { useState, useEffect } from 'react';

export default function FeedbackSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Staggered animation for cards appearing
    CUSTOMER_FEEDBACK.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-lime-200/20 to-green-200/20 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full animate-float-slow"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced title with original gradient-text */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-coiny text-section-title gradient-text animate-text-glow relative">
            Customer Feedback ⭐
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mx-auto mt-4 rounded-full animate-expand"></div>
        </div>

        {/* Enhanced feedback cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_FEEDBACK.map((feedback, index) => (
            <div
              key={feedback.id}
              className={`transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={`border-0 shadow-lg relative overflow-hidden group cursor-pointer transform transition-all duration-300 ${
                hoveredCard === index 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:scale-102 hover:shadow-xl'
              }`}>
                {/* Card glow effect with green theme */}
                <div className={`absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Animated border with green theme */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-glow"></div>
                <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg"></div>

                <CardContent className="p-6 relative z-10">
                  {/* Enhanced user info section */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={feedback.avatar}
                        alt={feedback.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 border-transparent transition-all duration-300 ${
                          hoveredCard === index 
                            ? 'border-green-400 scale-110' 
                            : ''
                        }`}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                        {feedback.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: feedback.rating }, (_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-300 ${
                              hoveredCard === index ? 'animate-star-twinkle' : ''
                            }`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced comment */}
                  <div className="relative mb-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="text-green-400 text-lg">"</span>
                      {feedback.comment}
                      <span className="text-green-400 text-lg">"</span>
                    </p>
                    {hoveredCard === index && (
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-400 animate-slide-in"></div>
                    )}
                  </div>

                  {/* Enhanced product info - removed the green dot */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                      Product: <span className="font-medium text-green-600 dark:text-green-400">{feedback.product}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced bottom decoration */}
        <div className="text-center mt-12 animate-fade-in-up-delayed">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-star-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Join thousands of happy pet parents! 🐾
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
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes star-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-in {
          0% { height: 0; }
          100% { height: 100%; }
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
        
        .animate-star-twinkle {
          animation: star-twinkle 0.6s ease-in-out;
        }
        
        .animate-star-float {
          animation: star-float 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}