import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Company
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              We're dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 Your Company. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;