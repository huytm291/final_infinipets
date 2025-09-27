import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import CategoriesSection from '@/components/CategoriesSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/NewsletterSection';
import FeedbackSection from '@/components/FeedbackSection';
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

  // Remove loading screen - show content directly
  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <EnhancedHeader isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection />
      <ProductsSection />
      <CategoriesSection />
      <BlogSection />
      <NewsletterSection />
      <FeedbackSection />
      <Footer isDark={isDark} />
      <ChatBot />
    </div>
  );
}