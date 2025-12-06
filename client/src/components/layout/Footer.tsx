// client/src/components/layout/Footer.tsx
import Link from 'next/link';
import { NewsletterSignup } from '@/components/marketing/NewsletterSignup';
import { SocialLinks } from '@/components/marketing/SocialLinks';

export const Footer = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Wigs', href: '/shop' },
        { name: 'Bone Straight', href: '/shop/bone-straight' },
        { name: 'Curly Wigs', href: '/shop/curly' },
        { name: 'Colored Wigs', href: '/shop/colored' },
        { name: 'Closure Wigs', href: '/shop/closure' },
        { name: 'Frontal Wigs', href: '/shop/frontal' },
        { name: 'Accessories', href: '/shop/accessories' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Wig Washing', href: '/services/washing' },
        { name: 'Color Refresh', href: '/services/coloring' },
        { name: 'Full Revamp', href: '/services/revamping' },
        { name: 'Lace Repair', href: '/services/repair' },
        { name: 'Book Service', href: '/services/book' },
        { name: 'Service Pricing', href: '/services#pricing' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Return Policy', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Wig Care Guide', href: '/blog/wig-care' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/about#story' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Wholesale', href: '/wholesale' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const contactInfo = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: '16 Lagos Street, Mainland Yaba, Lagos, Nigeria',
      subtext: 'Nationwide Delivery'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: 'hello@shopjifywigs.com.ng',
      href: 'mailto:hello@shopjifywigs.com.ng'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: '+234 904 935 5400',
      href: 'tel:+2349049355400'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Mon - Fri: 9AM - 6PM',
      subtext: 'Sat: 10AM - 4PM'
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/footer-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Gradient Overlay - Light at top to dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60"></div>
        {/* Additional overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
      </div>

      <div className="relative z-10 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Top Section - Newsletter & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 lg:mb-16">
            {/* Left - Brand & Newsletter */}
            <div className="order-2 lg:order-1">
  <div className="flex items-center mb-6">
    
    <div className="ml-4 relative">
      {/* Logo with TM */}
      <div className="relative inline-flex items-center">
        <span className="text-white font-bold text-3xl tracking-tight relative">
          JifyWigs
          {/* TM positioned above and to the right */}
          <span className="absolute -top-1 -right-3 text-[8px] font-bold text-gray-300 leading-none">
            TM
          </span>
        </span>
      </div>
      <p className="text-gray-300 text-sm">Premium Wigs & Professional Care</p>
    </div>
  </div>
  
  <p className="text-gray-300 mb-8 max-w-lg text-lg">
    Your trusted partner for premium human hair wigs and expert wig care services in Nigeria.
  </p>
  
  {/* Follow Us & Social Links - Mobile Only (moves to top on mobile) */}
  <div className="lg:hidden mb-8">
    <h4 className="font-semibold text-jify-primary-300 mb-4 text-center lg:text-left">Follow Us</h4>
    <div className="flex justify-center lg:justify-start">
      <SocialLinks />
    </div>
  </div>
  
  {/* Newsletter Signup */}
  <div className="mt-8">
    <NewsletterSignup />
  </div>
</div>
            
            {/* Right - Contact Info */}
            <div className="order-1 lg:order-2">
              <h3 className="text-xl text-jify-primary-300 font-semibold mb-6">Get In Touch</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      {item.href ? (
                        <Link 
                          href={item.href} 
                          className="text-white hover:text-jify-primary-300 transition-colors block"
                        >
                          <div className="font-medium">{item.text}</div>
                        </Link>
                      ) : (
                        <div className="font-medium">{item.text}</div>
                      )}
                      {item.subtext && (
                        <div className="text-sm text-gray-400 mt-1">{item.subtext}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Follow Us & Social Links - Desktop Only */}
              <div className="hidden lg:block mt-12 pt-8 border-t border-white/20">
                <h4 className="font-semibold text-jify-primary-300 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Section - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-jify-primary-300 mb-4 pb-2 border-b border-white/20">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 group flex items-center"
                      >
                        <svg 
                          className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="truncate">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} JifyWigs. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Premium human hair • Professional wig care • Nationwide delivery
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm whitespace-nowrap">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm whitespace-nowrap">
                    Terms of Service
                  </Link>
                  <Link href="/returns" className="text-gray-400 hover:text-white text-sm whitespace-nowrap">
                    Return Policy
                  </Link>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Made with love in Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};