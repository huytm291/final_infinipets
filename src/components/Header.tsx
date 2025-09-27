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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
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
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const { getWishlistCount } = useWishlist();

  // Memoize counts to prevent unnecessary re-renders - FIX FOR INFINITE LOOP
  const cartItemCount = useMemo(() => getItemCount(), [getItemCount]);
  const wishlistItemCount = useMemo(() => getWishlistCount(), [getWishlistCount]);

  // Search suggestions - Giảm xuống còn 6 suggestions
  const searchSuggestions = useMemo(() => [
    'Dog sweaters', 'Cat accessories', 'Winter coats', 
    'Pet shoes', 'Holiday costumes', 'Small dog clothes'
  ], []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Remove the problematic forceUpdate that causes infinite loop
  // Original code was causing infinite re-renders
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'infinipets-cart' || e.key === 'infinipets-wishlist') {
        // Just log the change instead of forcing re-render
        console.log('Storage changed:', e.key);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAuthClick = useCallback((mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
      // Implement search functionality
    }
  }, [searchQuery]);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicking
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
    setIsLanguageOpen(false);
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

  const navigationItems = useMemo(() => [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '#products', icon: ShoppingBag },
    { name: 'Blog', href: '#blog', icon: BookOpen },
    { name: 'Contact Us', href: '#contact', icon: Phone },
  ], []);

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
              {/* Enhanced Language Selector */}
              <DropdownMenu open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`relative h-8 px-3 text-xs transition-all duration-300 ease-in-out transform hover:scale-105 group overflow-hidden ${
                      isDark 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 border-gray-600 hover:border-green-400' 
                        : 'bg-gradient-to-r from-white to-gray-50 text-gray-700 hover:from-gray-50 hover:to-white border-gray-300 hover:border-green-400'
                    } ${isLanguageOpen ? 'ring-2 ring-green-400/50 shadow-lg' : ''}`}
                  >
                    {/* Animated background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                      isLanguageOpen ? 'scale-x-100' : ''
                    }`}></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative flex items-center z-10">
                      <Globe className={`w-3 h-3 mr-1.5 transition-all duration-300 ${
                        isLanguageOpen ? 'text-green-400 animate-pulse' : ''
                      } group-hover:text-green-400 group-hover:rotate-12`} />
                      <span className="font-medium transition-all duration-300 group-hover:text-green-600">
                        {selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}
                      </span>
                      <ChevronDown className={`w-3 h-3 ml-1 transition-all duration-300 ${
                        isLanguageOpen ? 'rotate-180 text-green-400' : ''
                      } group-hover:text-green-400`} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className={`w-56 p-2 border-2 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300 ${
                    isDark 
                      ? 'bg-gray-800/95 border-gray-700 shadow-2xl' 
                      : 'bg-white/95 border-gray-200 shadow-2xl'
                  }`}
                >
                  <div className={`text-xs font-medium mb-2 px-2 py-1 rounded-md ${
                    isDark ? 'text-gray-300 bg-gray-700/50' : 'text-gray-600 bg-gray-100/50'
                  }`}>
                    🌍 Choose Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`group relative flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                        isDark 
                          ? 'text-white hover:bg-gradient-to-r hover:from-green-800/30 hover:to-emerald-800/30 hover:text-white focus:text-white' 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700'
                      } ${selectedLanguage.code === lang.code ? 
                        isDark 
                          ? 'bg-gradient-to-r from-green-800/40 to-emerald-800/40 text-green-300' 
                          : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                        : ''
                      }`}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      
                      <span className="relative flex items-center z-10">
                        <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-110">
                          {lang.flag}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm transition-colors duration-300">
                            {lang.nativeName}
                          </span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
                          }`}>
                            {lang.name}
                          </span>
                        </div>
                      </span>
                      
                      {selectedLanguage.code === lang.code && (
                        <div className="relative flex items-center z-10">
                          <Star className="w-4 h-4 text-yellow-500 animate-pulse fill-current" />
                          <div className="absolute inset-0 w-4 h-4">
                            <div className="absolute inset-0 w-4 h-4 bg-yellow-400/30 rounded-full animate-ping"></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Selection indicator line */}
                      {selectedLanguage.code === lang.code && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-400 rounded-r-full"></div>
                      )}
                    </DropdownMenuItem>
                  ))}
                  
                  {/* Premium footer */}
                  <div className={`mt-2 pt-2 border-t text-center ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className={`text-xs flex items-center justify-center ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium Experience
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📞 +1 (555) 123-4567
              </span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo - Made larger */}
            <div className="flex items-center group cursor-pointer" onClick={handleLogoClick}>
              <div className="relative">
                <img 
                  src="/images/logo.png" 
                  alt="INFINIPETS Logo" 
                  className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              <div className="ml-4">
                <h1 className={`text-2xl font-coiny gradient-text transition-all duration-300 group-hover:scale-105`}>
                  INFINIPETS
                </h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                  Premium Pet Fashion
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (item.href === '/') {
                            e.preventDefault();
                            navigate('/');
                          }
                        }}
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-green-100'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        {item.name}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                {/* Categories Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 border ${
                      isDark 
                        ? 'text-white bg-gray-800 border-gray-600 hover:bg-gray-700' 
                        : 'text-gray-900 bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className={`grid w-[600px] gap-3 p-6 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <div className="row-span-3">
                        <h3 className="font-semibold text-lg mb-4 gradient-text">
                          Shop by Category
                        </h3>
                        <div className="grid gap-3">
                          {CATEGORIES.map((category) => (
                            <a
                              key={category.id}
                              href={`#category-${category.slug}`}
                              className={`group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:scale-105 ${
                                isDark 
                                  ? 'hover:bg-green-800/20 hover:text-white' 
                                  : 'hover:bg-green-100 hover:text-gray-900'
                              }`}
                            >
                              <div className={`text-sm font-medium leading-none group-hover:text-green-600 transition-colors ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {category.name}
                              </div>
                              <p className={`line-clamp-2 text-xs leading-snug ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              } group-hover:text-gray-500`}>
                                {category.description}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Enhanced Search Bar */}
            <div className={`hidden md:flex items-center mx-8 relative transition-all duration-500 ease-in-out ${
              isSearchFocused 
                ? 'flex-1 max-w-2xl z-50' 
                : 'flex-1 max-w-md'
            }`}>
              <form onSubmit={handleSearch} className="relative w-full">
                <div className={`relative transition-all duration-500 ease-in-out ${
                  isSearchFocused ? 'scale-105 transform' : ''
                }`}>
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                    isSearchFocused 
                      ? 'w-5 h-5 text-green-500' 
                      : 'w-4 h-4'
                  } ${
                    isSearchFocused 
                      ? 'text-green-500' 
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    type="text"
                    placeholder={isSearchFocused ? "What are you looking for? Search pet fashion, accessories, toys..." : "Search for pet fashion..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className={`w-full rounded-full border-2 transition-all duration-500 ease-in-out ${
                      isSearchFocused
                        ? 'pl-12 pr-6 py-3 text-base border-green-500 shadow-xl ring-2 ring-green-500/20'
                        : 'pl-10 pr-4 py-2 text-sm'
                    } ${
                      isSearchFocused
                        ? isDark 
                          ? 'border-green-500 placeholder:text-gray-300 bg-gray-700 text-white' 
                          : 'border-green-500 placeholder:text-gray-500 bg-white text-gray-900'
                        : isDark 
                          ? 'border-gray-600 placeholder:text-gray-400 bg-gray-700 text-white' 
                          : 'border-gray-300 placeholder:text-gray-500 bg-white text-gray-900'
                    }`}
                  />
                </div>
              </form>
              
              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-4 rounded-xl shadow-lg border z-50 backdrop-blur-md w-96 ${
                  isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                }`}>
                  <div className="space-y-3">
                    {/* Popular searches section */}
                    <div>
                      <p className={`text-sm font-medium mb-3 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        🔥 Popular searches
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`text-left p-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 border ${
                              isDark 
                                ? 'text-white hover:bg-gray-700 hover:text-white border-gray-600 hover:border-green-500' 
                                : 'text-gray-700 hover:bg-green-50 hover:text-green-700 border-gray-200 hover:border-green-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <Search className="w-3 h-3 mr-2 opacity-60" />
                              <span className="font-medium text-xs">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Search tips section */}
                    <div className="border-t border-gray-200/20 pt-3">
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        💡 Try searching by pet size, season, or occasion
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search */}
              <Button variant="ghost" size="sm" className="md:hidden hover:scale-110 transition-transform">
                <Search className={`h-4 w-4 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </Button>

              {/* Theme Toggle */}
              {toggleTheme && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="hover:scale-110 transition-all duration-300 hover:rotate-180"
                >
                  {isDark ? 
                    <Sun className="h-4 w-4 text-yellow-500" /> : 
                    <Moon className="h-4 w-4 text-green-600" />
                  }
                </Button>
              )}

              {/* Wishlist - Enhanced with better visual feedback */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleWishlistClick}
                className="relative hover:scale-110 transition-all duration-300 group"
              >
                <Heart className={`h-4 w-4 transition-all duration-300 ${
                  wishlistItemCount > 0 
                    ? 'text-red-500 fill-current animate-pulse' 
                    : isDark 
                      ? 'text-white group-hover:text-red-400' 
                      : 'text-gray-900 group-hover:text-red-500'
                }`} />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold animate-pulse shadow-lg">
                    {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                  </Badge>
                )}
                {/* Glow effect when items in wishlist */}
                {wishlistItemCount > 0 && (
                  <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping"></div>
                )}
              </Button>

              {/* Cart - Enhanced with better visual feedback */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCartClick}
                className="relative hover:scale-110 transition-all duration-300 group"
              >
                <ShoppingCart className={`h-4 w-4 transition-all duration-300 ${
                  cartItemCount > 0 
                    ? 'text-green-500 animate-bounce' 
                    : isDark 
                      ? 'text-white group-hover:text-green-400' 
                      : 'text-gray-900 group-hover:text-green-500'
                }`} />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold animate-bounce shadow-lg">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
                {/* Glow effect when items in cart */}
                {cartItemCount > 0 && (
                  <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping"></div>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-transform">
                      <div className="w-8 h-8 rounded-full gradient-primary p-0.5">
                        <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-semibold">
                      {user.firstName} {user.lastName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-green-50 dark:hover:bg-green-900/20">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50 dark:hover:bg-green-900/20">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAuthClick('login')}
                    className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'
                    }`}
                  >
                    <span className="relative z-10 transition-colors duration-300">Login</span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      isDark ? 'opacity-50' : ''
                    }`}></div>
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                    className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'
                    }`}
                  >
                    <span className="relative z-10 transition-colors duration-300">Sign Up</span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      isDark ? 'opacity-50' : ''
                    }`}></div>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:scale-110 transition-transform"
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
                          ? 'border-gray-600 placeholder:text-gray-400 bg-gray-700 text-white' 
                          : 'border-gray-300 placeholder:text-gray-500 bg-white text-gray-900'
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
                    className={`flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-green-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                ))}

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className={`px-3 text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Categories
                  </h3>
                  {CATEGORIES.map((category) => (
                    <a
                      key={category.id}
                      href={`#category-${category.slug}`}
                      className={`block px-6 py-2 text-sm transition-colors hover:scale-105 ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-green-100'
                      }`}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
                
                {!isAuthenticated && (
                  <div className="px-3 pt-4 space-y-3 border-t border-gray-200/20">
                    <Button 
                      variant="outline" 
                      className={`w-full hover:scale-105 transition-transform ${
                        isDark 
                          ? 'text-white border-white hover:bg-gray-800' 
                          : 'text-gray-900 border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => handleAuthClick('login')}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="outline"
                      className={`w-full hover:opacity-90 hover:scale-105 transition-all duration-300 ${
                        isDark 
                          ? 'text-white border-white hover:bg-gray-800' 
                          : 'text-gray-900 border-gray-300 hover:bg-gray-100'
                      }`}
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