import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const supportLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Chính sách vận chuyển', href: '/shipping' },
    { name: 'Chính sách đổi trả', href: '/returns' },
    { name: 'Hướng dẫn chọn size', href: '/size-guide' },
    { name: 'Chăm sóc khách hàng', href: '/support' }
  ];

  const categories = [
    { name: 'Áo thun', slug: 'ao-thun' },
    { name: 'Váy đầm', slug: 'vay-dam' },
    { name: 'Phụ kiện', slug: 'phu-kien' },
    { name: 'Giày dép', slug: 'giay-dep' },
    { name: 'Đồ ngủ', slug: 'do-ngu' },
    { name: 'Trang phục lễ hội', slug: 'trang-phuc-le-hoi' }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg' },
    { name: 'Mastercard', logo: 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg' },
    { name: 'PayPal', logo: 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg' },
    { name: 'Apple Pay', logo: 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg' },
    { name: 'Google Pay', logo: 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://www.facebook.com/petfashion',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/petfashion',
      color: 'hover:text-pink-500'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://www.twitter.com/petfashion',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://www.youtube.com/c/petfashion',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* INFINIPETS Info - Updated to match header style */}
          <div className="space-y-4">
            <div className="flex items-center group">
              <div className="relative">
                <img 
                  src="/assets/logo.png" 
                  alt="INFINIPETS Logo" 
                  className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.pinimg.com/736x/ce/d9/08/ced908180fea56ccb7389639d26be25f.jpg';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-coiny gradient-text transition-all duration-300 group-hover:scale-105">
                  INFINIPETS
                </h1>
                <p className="text-xs text-gray-400 font-medium">
                  Premium Pet Fashion
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              INFINIPETS - Thương hiệu thời trang thú cưng hàng đầu, mang đến những bộ trang phục 
              độc đáo và chất lượng cao cho những người bạn bốn chân yêu quý của bạn.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors hover:scale-110 transform duration-200`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h3 className="font-coiny text-lg gradient-text">Shop</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <a 
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/new-arrivals" className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Sản phẩm mới
                </a>
              </li>
              <li>
                <a href="/bestsellers" className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block">
                  Bán chạy nhất
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-coiny text-lg gradient-text">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment */}
          <div className="space-y-4">
            <h3 className="font-coiny text-lg gradient-text">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300 hover:text-green-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@infinipets.com" className="hover:text-green-400 transition-colors">
                  support@infinipets.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300 hover:text-green-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-green-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-400" />
                <span>123 Pet Fashion St, NY 10001</span>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold gradient-text mb-2">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <img
                    key={method.name}
                    src={method.logo}
                    alt={method.name}
                    className="h-6 w-auto bg-white rounded px-1 hover:scale-105 transition-transform duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 <span className="gradient-text font-coiny">INFINIPETS</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}