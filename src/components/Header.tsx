import { useState, useEffect } from 'react';
import { Search, User, Bell, Heart, ShoppingCart, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, LANGUAGES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import { useWishlist } from '@/hooks/useWishlist';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [user, setUser] = useState<any>(null);
  const { currentLanguage, setLanguage, t } = useTranslation();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { name: t('New Arrivals'), href: '/new-arrivals' },
    { name: t('Best Sellers'), href: '/bestsellers' },
    { name: t('Reviews'), href: '/feedback' },
    { name: t('About Us'), href: '/about' },
    { name: t('Contact'), href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setAuthModal(null);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'frosted-glass shadow-lg' : 'bg-white/95 dark:bg-gray-900/95'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="INFINIPETS Logo" 
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/api/placeholder/120/40';
                }}
              />
              <span className="font-coiny text-xl md:text-2xl gradient-text hidden sm:block">
                INFINIPETS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Category Dropdown */}
              <Select>
                <SelectTrigger className="w-48 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300">
                  <SelectValue placeholder={t('Product Categories')} />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {t(category.name as any)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium py-2 px-1 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Search className="h-5 w-5" />
                </Button>
                
                {searchOpen && (
                  <div className="absolute right-0 top-12 w-80 max-w-sm z-50 animate-in slide-in-from-top-2 duration-200">
                    <Input
                      placeholder={t('Search products...')}
                      className="rounded-lg shadow-lg border-blue-200 focus:border-blue-400 transition-all duration-300"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* User Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110">
                    {user ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-blue-600">{user.rank} Member</p>
                      </div>
                      <DropdownMenuItem>{t('Edit Profile')}</DropdownMenuItem>
                      <DropdownMenuItem>Order History</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        {t('Sign Out')}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => setAuthModal('login')}>
                        Sign In
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAuthModal('signup')}>
                        Sign Up
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 relative text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-pulse">
                  3
                </span>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="hover:bg-pink-50 dark:hover:bg-pink-900/20 relative transition-all duration-300 hover:scale-110">
                <Heart className="h-5 w-5 text-pink-500 hover:fill-current transition-all duration-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Button>

              {/* Shopping Cart */}
              <Button variant="ghost" size="icon" className="hover:bg-green-50 dark:hover:bg-green-900/20 relative transition-all duration-300 hover:scale-110">
                <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-blue-200 dark:border-blue-700 py-4 animate-in slide-in-from-top-2 duration-300">
              {/* Mobile Navigation Links */}
              <div className="space-y-1 mb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 hover:translate-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
              
              {/* Mobile Category Selector */}
              <div className="px-4 mb-4">
                <Select>
                  <SelectTrigger className="border-blue-200 dark:border-blue-800 w-full">
                    <SelectValue placeholder={t('Product Categories')} />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {t(category.name as any)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="px-4 mb-4 space-y-2">
                  <Button 
                    onClick={() => setAuthModal('login')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setAuthModal('signup')}
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Language Selector */}
              <div className="px-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</div>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center space-x-2 p-2 rounded-lg border transition-all duration-300 ${
                        currentLanguage === lang.code
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-xs font-medium">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      {authModal === 'login' && (
        <LoginPage
          onClose={() => setAuthModal(null)}
          onSwitchToSignup={() => setAuthModal('signup')}
          onLoginSuccess={handleAuthSuccess}
        />
      )}

      {authModal === 'signup' && (
        <SignupPage
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => setAuthModal('login')}
          onSignupSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}