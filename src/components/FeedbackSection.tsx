import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_FEEDBACK } from '@/lib/constants';

export default function FeedbackSection() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced title with animations */}
        <div className="text-center mb-16">
          <h2 className="font-coiny text-section-title mb-4 gradient-text animate-title-glow">
            Customer Feedback ⭐
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse-slow"></div>
        </div>

        {/* Enhanced feedback cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_FEEDBACK.map((feedback, index) => (
            <div
              key={feedback.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 relative overflow-hidden">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating sparkles on hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce-sparkle"></div>
                </div>
                <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce-sparkle-delayed"></div>
                </div>

                <CardContent className="p-6 relative z-10">
                  {/* Enhanced user info section */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={feedback.avatar}
                        alt={feedback.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white/50 shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {feedback.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: feedback.rating }, (_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-star-twinkle group-hover:scale-110 transition-transform duration-300" 
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced comment section */}
                  <div className="relative mb-4">
                    <div className="absolute -left-2 -top-2 text-4xl text-purple-300/30 font-serif">"</div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed pl-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {feedback.comment}
                    </p>
                    <div className="absolute -right-2 -bottom-2 text-4xl text-purple-300/30 font-serif">"</div>
                  </div>

                  {/* Enhanced product info */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300 font-medium">
                      Product: {feedback.product}
                    </p>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced bottom decoration */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-wave"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes title-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.1); }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes bounce-sparkle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-10px) scale(1.3); opacity: 1; }
        }
        
        @keyframes bounce-sparkle-delayed {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-star-twinkle {
          animation: star-twinkle 2s ease-in-out infinite;
        }
        
        .animate-bounce-sparkle {
          animation: bounce-sparkle 1.5s ease-in-out infinite;
        }
        
        .animate-bounce-sparkle-delayed {
          animation: bounce-sparkle-delayed 1.8s ease-in-out infinite 0.3s;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}