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
      {/* Paw Print Animation */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-2 mb-8">
          <span className="text-6xl loading-paw">🐾</span>
          <span className="text-6xl loading-paw">🐾</span>
          <span className="text-6xl loading-paw">🐾</span>
          <span className="text-6xl loading-paw">🐾</span>
        </div>
        
        {/* Brand Name */}
        <h1 className="font-coiny text-4xl md:text-6xl text-white mb-8 animate-pulse">
          INFINIPETS
        </h1>
        
        {/* Loading Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white to-yellow-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 mt-4 text-lg">
            {progress < 30 ? 'Preparing your pet fashion...' : 
             progress < 60 ? 'Loading premium collections...' : 
             progress < 90 ? 'Almost ready...' : 
             'Welcome to INFINIPETS!'}
          </p>
        </div>
      </div>
    </div>
  );
}