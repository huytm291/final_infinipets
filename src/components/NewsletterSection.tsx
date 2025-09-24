import { useState } from 'react';
import { Mail, Sparkles, Heart, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface NewsletterSectionProps {
  isDark?: boolean;
}

export default function NewsletterSection({ isDark = false }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createFlyingEmail = (startX: number, startY: number, delay: number = 0) => {
    setTimeout(() => {
      const emailIcon = document.createElement('div');
      emailIcon.innerHTML = '✉️';
      emailIcon.className = 'fixed text-3xl pointer-events-none z-50 transition-all duration-1500 ease-out';
      emailIcon.style.left = `${startX}px`;
      emailIcon.style.top = `${startY}px`;
      emailIcon.style.transform = 'scale(1) rotate(0deg)';
      emailIcon.style.opacity = '1';
      
      document.body.appendChild(emailIcon);

      // Animate the email flying up
      requestAnimationFrame(() => {
        const targetX = startX + (Math.random() - 0.5) * 200; // Random horizontal movement
        const targetY = startY - 300 - Math.random() * 100; // Fly up with some randomness
        const rotation = (Math.random() - 0.5) * 720; // Random rotation
        
        emailIcon.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.3) rotate(${rotation}deg)`;
        emailIcon.style.opacity = '0';
      });

      // Remove the element after animation
      setTimeout(() => {
        if (document.body.contains(emailIcon)) {
          emailIcon.remove();
        }
      }, 1500);
    }, delay);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // Get button position for animation
    const form = e.target as HTMLFormElement;
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    
    // Create multiple flying emails with staggered timing
    const emailCount = 8;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < emailCount; i++) {
      const angle = (i / emailCount) * 2 * Math.PI;
      const radius = 30;
      const startX = centerX + Math.cos(angle) * radius;
      const startY = centerY + Math.sin(angle) * radius;
      
      createFlyingEmail(startX, startY, i * 150);
    }

    // Add some extra emails for more dramatic effect
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        const randomX = centerX + (Math.random() - 0.5) * 100;
        const randomY = centerY + (Math.random() - 0.5) * 50;
        createFlyingEmail(randomX, randomY, i * 100);
      }
    }, 500);

    // Simulate API call
    setTimeout(() => {
      toast.success('Welcome to INFINIPETS family! 🐾', {
        description: 'Thank you for joining our premium pet fashion community!',
        duration: 4000,
      });
      setEmail('');
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset submission state after 30 seconds to prevent spam
      setTimeout(() => {
        setIsSubmitted(false);
      }, 30000);
    }, 1200);
  };

  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Exclusive Collections',
      description: 'First access to new premium designs'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Special Discounts',
      description: 'Member-only deals and promotions'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Pet Care Tips',
      description: 'Expert advice for your furry friends'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Background with INFINIPETS brand gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95"></div>
      
      {/* Decorative Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-4 md:mb-6 backdrop-blur-sm border border-white/30">
            <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h2 className="font-coiny text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 leading-tight px-4 text-white">
            Join the INFINIPETS Family! 🐾
          </h2>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4 text-white/90">
            Become part of our exclusive community and discover the finest in pet fashion.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 px-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="backdrop-blur-sm rounded-2xl p-6 md:p-8 border transition-all duration-300 transform hover:scale-105 bg-white/10 border-white/20 hover:bg-white/15"
            >
              <div className="text-white mb-4 md:mb-6 flex justify-center">
                <div className="p-3 bg-white/20 rounded-full">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-coiny text-lg md:text-xl text-white mb-2 md:mb-3">
                {benefit.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Email Form */}
        <div className="max-w-lg mx-auto mb-8 md:mb-12 px-4">
          <div className="backdrop-blur-sm rounded-3xl p-6 md:p-8 border bg-white/10 border-white/20">
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce">✅</div>
                <h3 className="text-xl font-coiny text-white">Thank You!</h3>
                <p className="text-white/80">You've successfully joined the INFINIPETS family!</p>
                <p className="text-white/60 text-sm">You can subscribe again in 30 seconds.</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4 md:space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-12 md:h-16 px-4 md:px-6 backdrop-blur-sm border rounded-2xl text-white placeholder:text-white/70 text-base md:text-lg bg-white/20 border-white/30 focus:bg-white/30 focus:border-white/50"
                    required
                    disabled={isSubmitting}
                  />
                  <Mail className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full h-12 md:h-16 rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-white text-green-600 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                      <span>Joining the Family...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      <span>Join INFINIPETS Family</span>
                      <Heart className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  )}
                </Button>
              </form>
            )}
            
            <p className="text-white/70 text-xs md:text-sm mt-4 md:mt-6 text-center">
              🔒 No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Trust Indicators & Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">50K+</div>
            <div className="text-white/80 text-xs md:text-sm flex items-center justify-center space-x-1">
              <Heart className="w-3 h-3 md:w-4 md:h-4" />
              <span>Happy Pets</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">25K+</div>
            <div className="text-white/80 text-xs md:text-sm flex items-center justify-center space-x-1">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span>Pet Parents</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">1000+</div>
            <div className="text-white/80 text-xs md:text-sm flex items-center justify-center space-x-1">
              <Gift className="w-3 h-3 md:w-4 md:h-4" />
              <span>Unique Designs</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">4.9★</div>
            <div className="text-white/80 text-xs md:text-sm">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}