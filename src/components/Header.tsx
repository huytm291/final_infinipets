import React, { useState } from 'react';
import { Moon, Sun, Menu, X, ShoppingCart, User, Search } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  language,
  setLanguage,
  selectedCategory,
  setSelectedCategory
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { value: 'all', label: language === 'vi' ? 'Tất cả' : 'All' },
    { value: 'electronics', label: language === 'vi' ? 'Điện tử' : 'Electronics' },
    { value: 'clothing', label: language === 'vi' ? 'Thời trang' : 'Clothing' },
    { value: 'home', label: language === 'vi' ? 'Gia dụng' : 'Home & Garden' },
    { value: 'books', label: language === 'vi' ? 'Sách' : 'Books' },
    { value: 'sports', label: language === 'vi' ? 'Thể thao' : 'Sports' }
  ];

  const navItems = [
    { key: 'home', label: language === 'vi' ? 'Trang chủ' : 'Home' },
    { key: 'products', label: language === 'vi' ? 'Sản phẩm' : 'Products' },
    { key: 'about', label: language === 'vi' ? 'Giới thiệu' : 'About' },
    { key: 'contact', label: language === 'vi' ? 'Liên hệ' : 'Contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    } backdrop-blur-sm border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'vi' ? 'Cửa hàng' : 'Store'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`transition-colors duration-200 hover:text-blue-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Category Filter */}
          <div className="hidden md:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-2 py-1 rounded border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="en">EN</option>
              <option value="vi">VI</option>
            </select>

            {/* Search Icon */}
            <button className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <Search size={20} />
            </button>

            {/* Cart Icon */}
            <button className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <ShoppingCart size={20} />
            </button>

            {/* User Icon */}
            <button className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <User size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className={`px-4 py-2 rounded transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile Category Filter */}
            <div className="mt-4 px-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {language === 'vi' ? 'Danh mục' : 'Category'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;