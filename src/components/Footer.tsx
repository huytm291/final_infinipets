import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  CreditCard,
  Truck,
  Shield,
  Clock
} from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mt-20 ${
      isDark 
        ? 'bg-gray-900 border-t border-gray-800' 
        : 'bg-white border-t border-gray-200'
    }`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center group">
              <div className="relative">
                <img 
                  src="/images/logo.png" 
                  alt="INFINIPETS Logo" 
                  className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold gradient-text">INFINIPETS</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Premium Pet Fashion
                </p>
              </div>
            </div>
            <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your trusted partner for premium pet fashion and accessories. 
              Making your furry friends look stylish and feel comfortable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white' 
                  : 'bg-white text-gray-600 hover:bg-blue-600 hover:text-white shadow-md'
              }`}>
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-blue-400 hover:text-white' 
                  : 'bg-white text-gray-600 hover:bg-blue-400 hover:text-white shadow-md'
              }`}>
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-pink-600 hover:text-white' 
                  : 'bg-white text-gray-600 hover:bg-pink-600 hover:text-white shadow-md'
              }`}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white' 
                  : 'bg-white text-gray-600 hover:bg-red-600 hover:text-white shadow-md'
              }`}>
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Categories', 'About Us', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className={`text-sm transition-colors hover:text-green-600 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Customer Service
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Track Order', 'FAQ'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`text-sm transition-colors hover:text-green-600 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  support@infinipets.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className={`w-4 h-4 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  123 Pet Fashion Street<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${isDark ? 'bg-green-900/20' : 'bg-green-100'}`}>
                <Truck className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Free Shipping
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${isDark ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                <Shield className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Secure Payment
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  100% protected
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${isDark ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
                <Clock className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  24/7 Support
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Always here to help
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${isDark ? 'bg-red-900/20' : 'bg-red-100'}`}>
                <Heart className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Pet Approved
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Quality guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`border-t ${isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              © {currentYear} INFINIPETS. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500" /> for pets everywhere.
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                We accept:
              </span>
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <CreditCard className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}