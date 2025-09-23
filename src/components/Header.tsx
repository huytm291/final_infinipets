import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Package
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCartAPI } from '@/hooks/useCartAPI';
import { useWishlist } from '@/hooks/useWishlist';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function Header({ isDark = false, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCartAPI();
  const { getWishlistCount } = useWishlist();

  const cartItemCount = getItemCount();
  const wishlistItemCount = getWishlistCount();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b ${
        isDark 
          ? 'bg-gray-900/95 border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60' 
          : 'bg-white/95 border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-white/60'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                INFINIPETS
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Home
              </a>
              <a href="#" className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Products
              </a>
              <a href="#" className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Categories
              </a>
              <a href="#" className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Blog
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="h-4 w-4" />
              </Button>

              {/* Theme Toggle */}
              {toggleTheme && (
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4" />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {user.firstName} {user.lastName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
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
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
                <a href="#" className={`block px-3 py-2 text-base font-medium ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  Home
                </a>
                <a href="#" className={`block px-3 py-2 text-base font-medium ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  Products
                </a>
                <a href="#" className={`block px-3 py-2 text-base font-medium ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  Categories
                </a>
                <a href="#" className={`block px-3 py-2 text-base font-medium ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}>
                  Blog
                </a>
                
                {!isAuthenticated && (
                  <div className="px-3 py-2 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAuthClick('login')}
                    >
                      Login
                    </Button>
                    <Button 
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