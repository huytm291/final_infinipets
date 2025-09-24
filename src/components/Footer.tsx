import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  language: string;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, language }) => {
  const footerSections = {
    company: {
      title: language === 'vi' ? 'Công ty' : 'Company',
      links: [
        { label: language === 'vi' ? 'Giới thiệu' : 'About Us', href: '#about' },
        { label: language === 'vi' ? 'Nghề nghiệp' : 'Careers', href: '#careers' },
        { label: language === 'vi' ? 'Tin tức' : 'News', href: '#news' },
        { label: language === 'vi' ? 'Liên hệ' : 'Contact', href: '#contact' }
      ]
    },
    support: {
      title: language === 'vi' ? 'Hỗ trợ' : 'Support',
      links: [
        { label: language === 'vi' ? 'Trung tâm trợ giúp' : 'Help Center', href: '#help' },
        { label: language === 'vi' ? 'Chính sách bảo hành' : 'Warranty Policy', href: '#warranty' },
        { label: language === 'vi' ? 'Chính sách đổi trả' : 'Return Policy', href: '#returns' },
        { label: language === 'vi' ? 'Hướng dẫn mua hàng' : 'Shopping Guide', href: '#guide' }
      ]
    },
    legal: {
      title: language === 'vi' ? 'Pháp lý' : 'Legal',
      links: [
        { label: language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service', href: '#terms' },
        { label: language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy', href: '#privacy' },
        { label: language === 'vi' ? 'Chính sách cookie' : 'Cookie Policy', href: '#cookies' },
        { label: language === 'vi' ? 'Khiếu nại' : 'Complaints', href: '#complaints' }
      ]
    }
  };

  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-300 border-gray-700' 
        : 'bg-gray-50 text-gray-700 border-gray-200'
    } border-t`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
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
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'vi' 
                ? 'Chúng tôi cung cấp các sản phẩm chất lượng cao với dịch vụ khách hàng tuyệt vời.'
                : 'We provide high-quality products with excellent customer service.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone size={16} />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail size={16} />
                <span>contact@store.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} />
                <span>{language === 'vi' ? 'Hà Nội, Việt Nam' : 'Hanoi, Vietnam'}</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors duration-200 hover:text-blue-500 ${
                        isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {language === 'vi' ? 'Theo dõi chúng tôi:' : 'Follow us:'}
              </span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-pink-600 hover:bg-gray-100'
                  }`}
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2024 {language === 'vi' ? 'Cửa hàng' : 'Store'}. {language === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;