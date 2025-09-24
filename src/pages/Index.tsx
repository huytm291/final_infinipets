import { useState } from 'react';
import EnhancedHeader from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import BlogSection from '@/components/BlogSection';
import FeedbackSection from '@/components/FeedbackSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Simulate loading
  setTimeout(() => {
    if (isLoading) setIsLoading(false);
  }, 2000);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <EnhancedHeader isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Add padding top to account for fixed header */}
      <div className="pt-20 lg:pt-32">
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <BlogSection />
        <FeedbackSection />
        <NewsletterSection />
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}