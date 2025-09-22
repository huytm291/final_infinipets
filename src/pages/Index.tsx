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
import ProductGrid from '@/components/ProductGrid'; // New: Import ProductGrid (đặt ở thư mục components)
import { DEMO_PRODUCTS } from '@/data/products'; // New: Import data static cho featured

// Interface cho props nếu cần pass theme
interface SectionProps {
  isDark?: boolean;
}

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Theme management (giữ nguyên)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  // Language management (giữ nguyên)
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

  // New: Featured products data (static, có thể hard-code hoặc từ DEMO_PRODUCTS)
  // Lọc featured nếu DEMO_PRODUCTS có field 'isFeatured'
  const featuredProducts = DEMO_PRODUCTS.filter(p => p.isBestseller || p.isNew).slice(0, 8); // Ví dụ: Lấy 8 sản phẩm nổi bật

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection isDark={isDark} /> {/* Pass isDark nếu Hero cần theme */}
      <CategoriesSection isDark={isDark} /> {/* Pass nếu cần */}
      
      {/* ProductsSection: Tích hợp ProductGrid static */}
      <ProductsSection 
        isDark={isDark} 
        products={featuredProducts} // Pass static data cho grid
        title="Featured Products" 
        subtitle="Discover our bestsellers and new arrivals"
      />
      
      <FeedbackSection isDark={isDark} />
      <NewsletterSection language={currentLanguage} isDark={isDark} />
      <BlogSection isDark={isDark} />
      <Footer isDark={isDark} />
      <ChatBot />
    </div>
  );
}