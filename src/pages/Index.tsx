import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import { ProductsSection } from '@/components/ProductsSection'; 
import FeedbackSection from '@/components/FeedbackSection';
import NewsletterSection from '@/components/NewsletterSection';
import BlogSection from '@/components/BlogSection';
import { DEMO_PRODUCTS } from '@/data/products';

interface SectionProps {
  isDark?: boolean;
}

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  // Language management
  useEffect(() => {
    const savedLanguage = localStorage.getItem('infinipets-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  // Featured products data - fallback to static data
  const featuredProducts = DEMO_PRODUCTS.filter(p => p.isBestseller || p.isNew).slice(0, 8);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} />
      <CategoriesSection isDark={isDark} />
      
      <ProductsSection 
        isDark={isDark} 
        products={featuredProducts}
        title="Featured Products" 
        subtitle="Discover our bestsellers and new arrivals"
        useAPI={false}
      />
      
      <FeedbackSection isDark={isDark} />
      <NewsletterSection language={currentLanguage} isDark={isDark} />
      <BlogSection isDark={isDark} />
      <Footer isDark={isDark} />
      <ChatBot />
    </div>
  );
}