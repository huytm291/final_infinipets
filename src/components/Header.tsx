import { useState, useEffect } from 'react';
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
import AuthModal from './auth/AuthModal';

interface EnhancedHeaderProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function EnhancedHeader({ isDark = false, toggleTheme }: EnhancedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const cartItemCount = getItemCount();
  const wishlistItemCount = getWishlistCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const navigationItems = [
    { name: 'Home', href: '#', icon: Home },
    { name: 'Products', href: '#products', icon: ShoppingBag },
    { name: 'Blog', href: '#blog', icon: BookOpen },
    { name: 'Contact Us', href: '#contact', icon: Phone },
  ];

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
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Globe className="w-3 h-3 mr-1" />
                    {selectedLanguage.flag} {selectedLanguage.code.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang)}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        {lang.nativeName}
                      </span>
                      {selectedLanguage.code === lang.code && (
                        <Star className="w-3 h-3 text-yellow-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📞 +1 (555) 123-4567
              </span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center group">
              <div className="relative">
                <img 
                  src="/images/logo.png" 
                  alt="INFINIPETS Logo" 
                  className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="ml-3">
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
                  <NavigationMenuTrigger className={`h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-green-800/20' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-green-100'
                  }`}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6">
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
                              <div className="text-sm font-medium leading-none group-hover:text-green-600 transition-colors">
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

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className={`relative transition-all duration-300 ${
                  isSearchFocused ? 'scale-105' : ''
                }`}>
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                    isSearchFocused 
                      ? 'text-green-500' 
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    type="text"
                    placeholder="Search for pet fashion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-10 pr-4 py-2 w-full rounded-full border-2 transition-all duration-300 ${
                      isSearchFocused
                        ? 'border-green-500 shadow-lg ring-4 ring-green-500/20'
                        : isDark 
                          ? 'border-gray-700 bg-gray-800 text-white' 
                          : 'border-gray-300 bg-white'
                    }`}
                  />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search */}
              <Button variant="ghost" size="sm" className="md:hidden hover:scale-110 transition-transform">
                <Search className="h-4 w-4" />
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

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-transform group">
                <Heart className={`h-4 w-4 transition-colors group-hover:text-red-500 ${
                  wishlistItemCount > 0 ? 'text-red-500 fill-current' : ''
                }`} />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-transform group">
                <ShoppingCart className={`h-4 w-4 transition-colors group-hover:text-green-500 ${
                  cartItemCount > 0 ? 'text-green-500' : ''
                }`} />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs gradient-primary animate-bounce">
                    {cartItemCount}
                  </Badge>
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
                    className="hover:scale-105 transition-transform"
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                    className="gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
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
                      className="pl-10 pr-4 py-2 w-full rounded-full"
                    />
                  </form>
                </div>

                {/* Navigation Links */}
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
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
                      className="w-full hover:scale-105 transition-transform"
                      onClick={() => handleAuthClick('login')}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300"
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