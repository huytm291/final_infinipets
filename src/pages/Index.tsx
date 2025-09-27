import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import FeedbackSection from '@/components/FeedbackSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and then show the main content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Updated layout order as requested: Header → HeroSection → CategoriesSection → ProductsSection → FeedbackSection → BlogSection → NewsletterSection → Footer
  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <EnhancedHeader isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} />
      <CategoriesSection isDark={isDark} />
      <ProductsSection 
        title="Featured Products" 
        subtitle="Discover our handpicked collection of premium pet fashion and accessories"
        isDark={isDark} 
      />
      <FeedbackSection isDark={isDark} />
      <BlogSection isDark={isDark} />
      <NewsletterSection isDark={isDark} />
      <Footer isDark={isDark} />
      <ChatBot />
    </div>
  );
}