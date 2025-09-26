import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 500); // Delay for smooth transition
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center gradient-primary">
      {/* Enhanced Paw Print Animation - Reduced to 2 icons */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-8 mb-8 relative">
          <span className="text-6xl loading-paw-enhanced animate-bounce-slow">🐾</span>
          <span className="text-6xl loading-paw-enhanced animate-bounce-slow-delayed">🐾</span>
          
          {/* Floating particles effect around paws */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-1"></div>
            <div className="absolute top-4 right-1/4 w-1 h-1 bg-yellow-300/40 rounded-full animate-float-2"></div>
            <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-float-3"></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-yellow-200/30 rounded-full animate-float-4"></div>
          </div>
        </div>
        
        {/* Brand Name with enhanced glow effect */}
        <h1 className="font-coiny text-4xl md:text-6xl text-white mb-8 animate-glow-pulse relative">
          INFINIPETS
          <div className="absolute inset-0 font-coiny text-4xl md:text-6xl text-white/20 animate-glow-ring"></div>
        </h1>
        
        {/* Enhanced Loading Bar with shimmer effect */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-white to-yellow-300 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-white/80 mt-4 text-lg animate-text-fade">
            {progress < 30 ? 'Preparing your pet fashion...' : 
             progress < 60 ? 'Loading premium collections...' : 
             progress < 90 ? 'Almost ready...' : 
             'Welcome to INFINIPETS!'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
          }
          50% { 
            transform: translateY(-20px) scale(1.1);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
          }
        }

        @keyframes bounce-slow-delayed {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
          }
          50% { 
            transform: translateY(-20px) scale(1.1);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
          }
        }

        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5);
            transform: scale(1.02);
          }
        }

        @keyframes glow-ring {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-15px) translateX(5px); opacity: 0.7; }
          66% { transform: translateY(-8px) translateX(-3px); opacity: 0.5; }
        }

        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          33% { transform: translateY(-20px) translateX(-8px); opacity: 0.8; }
          66% { transform: translateY(-12px) translateX(4px); opacity: 0.6; }
        }

        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          33% { transform: translateY(-10px) translateX(-5px); opacity: 0.6; }
          66% { transform: translateY(-18px) translateX(7px); opacity: 0.4; }
        }

        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-25px) translateX(3px); opacity: 0.7; }
          66% { transform: translateY(-5px) translateX(-6px); opacity: 0.5; }
        }

        @keyframes text-fade {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .loading-paw-enhanced {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .loading-paw-enhanced:nth-child(2) {
          animation: bounce-slow-delayed 2s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-bounce-slow-delayed {
          animation: bounce-slow-delayed 2s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .animate-glow-ring {
          animation: glow-ring 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-3 {
          animation: float-3 3.5s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-4 {
          animation: float-4 4.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-text-fade {
          animation: text-fade 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}