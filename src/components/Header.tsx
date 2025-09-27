import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon,
  LogOut,
  Settings,
  Package,
  ChevronDown,
  Home,
  ShoppingBag,
  BookOpen,
  Phone,
  Star,
  Sparkles,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { CATEGORIES, LANGUAGES } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

interface EnhancedHeaderProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function EnhancedHeader({ isDark = false, toggleTheme }: EnhancedHeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const { getWishlistCount } = useWishlist();

  // Memoize counts to prevent unnecessary re-renders
  const cartItemCount = useMemo(() => getItemCount(), [getItemCount]);
  const wishlistItemCount = useMemo(() => getWishlistCount(), [getWishlistCount]);

  // Search suggestions
  const searchSuggestions = useMemo(() => [
    'Dog sweaters', 'Cat accessories', 'Winter coats', 
    'Pet shoes', 'Holiday costumes', 'Small dog clothes'
  ], []);

  // Navigation items
  const navigationItems = useMemo(() => [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '#products', icon: ShoppingBag },
    { name: 'Blog', href: '#blog', icon: BookOpen },
    { name: 'Contact Us', href: '#contact', icon: Phone },
  ], []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLanguageMenu(false);
      setShowUserMenu(false);
      setShowCategories(false);
      setShowSearchSuggestions(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAuthClick = useCallback((mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setShowUserMenu(false);
  }, [logout]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSearchSuggestions(false);
    }, 200);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  }, []);

  const handleLanguageSelect = useCallback((lang: typeof LANGUAGES[0]) => {
    setSelectedLanguage(lang);
    setShowLanguageMenu(false);
  }, []);

  const handleCartClick = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const handleWishlistClick = useCallback(() => {
    navigate('/wishlist');
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? isDark 
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl' 
            : 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl'
          : isDark 
            ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50' 
            : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="hidden lg:flex items-center justify-between py-2 text-xs border-b border-gray-200/20">
            <div className="flex items-center space-x-4">
              <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Sparkles className="w-3 h-3 mr-1" />
                Free shipping on orders over $50
              </span>
              <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Star className="w-3 h-3 mr-1" />
                Trusted by 50,000+ pet parents
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Simple Language Selector */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLanguageMenu(!showLanguageMenu);
                  }}
                  className={`h-8 px-3 text-xs ${
                    isDark 
                      ? 'bg-gray-800 text-white border-gray-600' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <Globe className="w-3 h-3 mr-1.5" />
                  <span className="font-medium">
                    {selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${
                    showLanguageMenu ? 'rotate-180' : ''
                  }`} />
                </Button>
                
                {showLanguageMenu && (
                  <div className={`absolute top-full right-0 mt-2 w-56 p-2 rounded-lg shadow-lg border z-50 ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedLanguage.code === lang.code 
                            ? 'bg-green-100 text-green-700' 
                            : isDark 
                              ? 'text-white hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex items-center">
                          <span className="text-lg mr-3">{lang.flag}</span>
                          <div className="flex flex-col text-left">
                            <span className="font-medium text-sm">{lang.nativeName}</span>
                            <span className="text-xs text-gray-500">{lang.name}</span>
                          </div>
                        </span>
                        {selectedLanguage.code === lang.code && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📞 +1 (555) 123-4567
              </span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer" onClick={handleLogoClick}>
              <div className="ml-4">
                <h1 className="text-2xl font-coiny gradient-text">
                  INFINIPETS
                </h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                  Premium Pet Fashion
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Simple */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === '/') {
                      e.preventDefault();
                      navigate('/');
                    }
                  }}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-green-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </a>
              ))}
              
              {/* Categories - Simple Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategories(!showCategories);
                  }}
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    isDark 
                      ? 'text-white bg-gray-800 border-gray-600 hover:bg-gray-700' 
                      : 'text-gray-900 bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Categories
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                    showCategories ? 'rotate-180' : ''
                  }`} />
                </Button>
                
                {showCategories && (
                  <div className={`absolute top-full left-0 mt-2 w-80 p-4 rounded-lg shadow-lg border z-50 ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <h3 className="font-semibold text-lg mb-4 gradient-text">Shop by Category</h3>
                    <div className="grid gap-2">
                      {CATEGORIES.map((category) => (
                        <a
                          key={category.id}
                          href={`#category-${category.slug}`}
                          onClick={() => setShowCategories(false)}
                          className={`block p-3 rounded-lg transition-colors ${
                            isDark 
                              ? 'hover:bg-green-800/20 hover:text-white' 
                              : 'hover:bg-green-100 hover:text-gray-900'
                          }`}
                        >
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {category.name}
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {category.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center mx-8 relative flex-1 max-w-md">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for pet fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className={`w-full rounded-full pl-10 pr-4 py-2 text-sm ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                />
              </form>
              
              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <div className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-xl shadow-lg border z-50 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    🔥 Popular searches
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`text-left p-2 text-sm rounded-lg transition-colors ${
                          isDark 
                            ? 'text-white hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        <Search className="w-3 h-3 mr-2 inline opacity-60" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              {toggleTheme && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="hover:scale-110 transition-transform"
                >
                  {isDark ? 
                    <Sun className="h-4 w-4 text-yellow-500" /> : 
                    <Moon className="h-4 w-4 text-green-600" />
                  }
                </Button>
              )}

              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleWishlistClick}
                className="relative hover:scale-110 transition-transform"
              >
                <Heart className={`h-4 w-4 ${
                  wishlistItemCount > 0 
                    ? 'text-red-500 fill-current' 
                    : isDark ? 'text-white' : 'text-gray-900'
                }`} />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white">
                    {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCartClick}
                className="relative hover:scale-110 transition-transform"
              >
                <ShoppingCart className={`h-4 w-4 ${
                  cartItemCount > 0 
                    ? 'text-green-500' 
                    : isDark ? 'text-white' : 'text-gray-900'
                }`} />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-green-500 text-white">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu - Simple */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="relative"
                  >
                    <div className="w-8 h-8 rounded-full gradient-primary p-0.5">
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  </Button>
                  
                  {showUserMenu && (
                    <div className={`absolute top-full right-0 mt-2 w-56 p-2 rounded-lg shadow-lg border z-50 ${
                      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                      <div className="px-3 py-2 border-b border-gray-200/20">
                        <p className="font-semibold">{user.firstName} {user.lastName}</p>
                      </div>
                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </button>
                      <button
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </button>
                      <div className="border-t border-gray-200/20 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAuthClick('login')}
                    className={isDark ? 'text-white' : 'text-gray-900'}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                    className={isDark ? 'text-white' : 'text-gray-900'}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200/20">
              <div className="px-2 pt-4 pb-6 space-y-3">
                {/* Mobile Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-full rounded-full ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                    />
                  </form>
                </div>

                {/* Navigation Links */}
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '/') {
                        e.preventDefault();
                        navigate('/');
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`flex items-center px-3 py-3 text-base font-medium rounded-lg ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-green-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                ))}

                {!isAuthenticated && (
                  <div className="px-3 pt-4 space-y-3 border-t border-gray-200/20">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAuthClick('login')}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAuthClick('signup')}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}