// client/app/(marketing)/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRightIcon, 
  SparklesIcon, 
  ShoppingBagIcon,
  ScissorsIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon as StarOutlineIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/shop/ProductCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { TrustBadge } from '@/components/marketing/TrustBadge';
import { CategoryCard } from '@/components/shop/CategoryCard';
import { IService } from '@jifywigs/shared/types';
import { TestimonialCard } from '@/components/marketing/TestimonialCard';
import { ProductType, WigLength, WigLaceType } from '@jifywigs/shared/enums';




const heroSlides = [
  {
    id: 1,
    image: '/images/hero-bone-straight.jpg',
    title: 'Premium Bone Straight Collection',
    subtitle: '180% Density • Glossy Finish • Tangle-Free',
    cta: 'Shop Collection',
    ctaLink: '/shop?category=bone-straight',
    badge: 'NEW ARRIVAL'
  },
  {
    id: 2,
    image: '/images/hero-wig-revamp.jpg',
    title: 'Professional Wig Revamp Service',
    subtitle: 'Wash, Style, Trim & Reset — From ₦8,000',
    cta: 'Book Service',
    ctaLink: '/services/book',
    badge: 'SERVICE'
  },
  {
    id: 3,
    image: '/images/hero-curly-wigs.jpeg',
    title: 'Luxury Curly & Wavy Wigs',
    subtitle: 'Natural Curl Patterns • 150-180% Density',
    cta: 'Shop Curly Wigs',
    ctaLink: '/shop?category=curly',
    badge: 'BEST SELLER'
  },
];

// ✅ UPDATED: Categories now use slug for filtering
const categories = [
  {
    id: 1,
    name: 'Bone Straight',
    slug: 'bone-straight',
    image: '/images/category-bone-straight.jpg',
    productCount: 24
  },
  {
    id: 2,
    name: 'Curly Wigs',
    slug: 'curly',
    image: '/images/category-curly.jpg',
    productCount: 18
  },
  {
    id: 3,
    name: 'Colored Wigs',
    slug: 'colored',
    image: '/images/category-colored.jpg',
    productCount: 15
  },
  {
    id: 4,
    name: 'Closure Wigs',
    slug: 'closure',
    image: '/images/category-closure.jpeg',
    productCount: 22
  },
  {
    id: 5,
    name: 'Frontal Wigs',
    slug: 'frontal',
    image: '/images/category-frontal.jpg',
    productCount: 16
  },
  {
    id: 6,
    name: 'Wig Accessories',
    slug: 'accessories',
    image: '/images/category-accessories.jpg',
    productCount: 35
  },
];


const featuredProducts = [
  {
    _id: '1',
    name: 'Glueless Bone Straight Frontal Wig',
    slug: 'glueless-bone-straight-frontal',
    description: '180% density, 22 inches, natural black',
    price: 45000,
    discountPrice: 38000,
    type: ProductType.WIG,
    category: 'bone_straight',
    color: 'Natural Black',
    length: WigLength.LONG,
    density: 180,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 12,
    isPreOrder: false,
    images: ['/images/product-1.jpg'],
    rating: 4.8,
    reviewCount: 86,
    tags: ['Best Seller', 'Glueless', 'New']
  },
  {
    _id: '2',
    name: 'Water Wave Closure Wig',
    slug: 'water-wave-closure',
    description: 'Soft water waves, 150% density, 20 inches',
    price: 35000,
    discountPrice: 29500,
    type: ProductType.WIG,
    category: 'curly',
    color: 'Dark Brown',
    length: WigLength.MEDIUM,
    density: 150,
    laceType: WigLaceType.CLOSURE,
    inStock: true,
    stockCount: 8,
    images: ['/images/product-2.jpg'],
    rating: 4.6,
    reviewCount: 42,
    tags: ['Water Wave', 'Closure']
  },
  {
    _id: '3',
    name: 'Rose Gold Colored Wig',
    slug: 'rose-gold-colored-wig',
    description: 'Rose gold balayage, 180% density, frontal lace',
    price: 52000,
    type: ProductType.WIG,
    category: 'colored',
    color: 'Rose Gold',
    length: WigLength.LONG,
    density: 180,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 5,
    isPreOrder: true,
    images: ['/images/product-3.jpg'],
    rating: 4.9,
    reviewCount: 23,
    tags: ['Colored', 'Pre-order', 'Luxury']
  },
  {
    _id: '4',
    name: 'Bob Wig with Bangs',
    slug: 'bob-wig-with-bangs',
    description: 'Short bob style, 160% density, 14 inches',
    price: 28000,
    type: ProductType.WIG,
    category: 'bone_straight',
    color: 'Jet Black',
    length: WigLength.SHORT,
    density: 160,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 15,
    images: ['/images/product-4.jpg'],
    rating: 4.7,
    reviewCount: 31,
    tags: ['Bob', 'Short', 'Bangs']
  },
];

// In your marketing page.tsx
const services: IService[] = [
  { 
    _id: '1', 
    name: 'Wig Washing & Conditioning', 
    slug: 'washing', 
    description: 'Deep clean, detangle & nourish treatment', 
    basePrice: 3500, 
    durationMins: 60, 
    isActive: true,
    features: ['Shampoo & Condition', 'Detangling', 'Air Drying']
  },
  { 
    _id: '2', 
    name: 'Color Refresh & Dye', 
    slug: 'coloring', 
    description: 'Revive faded color or complete color change', 
    basePrice: 8000, 
    durationMins: 120, 
    isActive: true,
    features: ['Color Consultation', 'Professional Dyeing', 'Color Protection']
  },
  { 
    _id: '3', 
    name: 'Full Wig Revamp', 
    slug: 'revamping', 
    description: 'Complete restoration: wash, style, trim & reset', 
    basePrice: 12000, 
    durationMins: 180, 
    isActive: true,
    features: ['Complete Wash', 'Styling', 'Trimming', 'Lace Cleaning']
  },
  { 
    _id: '4', 
    name: 'Lace Ventilation Repair', 
    slug: 'repair', 
    description: 'Fix torn lace and ventilation issues', 
    basePrice: 6000, 
    durationMins: 90, 
    isActive: true,
    features: ['Lace Repair', 'Knot Sealing', 'Baby Hair Redo']
  },
];

// client/app/(marketing)/page.tsx
// Update the testimonials array with proper typing:

const testimonials: Array<{
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  type: 'service' | 'product';
}> = [
  {
    id: 1,
    name: 'Chioma A.',
    location: 'Lagos',
    rating: 5,
    comment: 'The bone straight wig I bought looks even better than the pictures! Quality is amazing and delivery was super fast.',
    date: '2 weeks ago',
    type: 'product' // explicitly typed
  },
  {
    id: 2,
    name: 'Amaka T.',
    location: 'Abuja',
    rating: 5,
    comment: 'Their wig revamp service brought my old wig back to life! Looks brand new again. Will definitely use their services regularly.',
    date: '1 month ago',
    type: 'service' // explicitly typed
  },
  {
    id: 3,
    name: 'Bisi O.',
    location: 'Port Harcourt',
    rating: 4,
    comment: 'Great customer service and the wig fits perfectly. The color match was exactly what I wanted.',
    date: '3 weeks ago',
    type: 'product' // explicitly typed
  },
];

const trustFeatures = [
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'On orders above ₦50,000'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Payment',
    description: '100% secure & encrypted'
  },
  {
    icon: ScissorsIcon,
    title: 'Expert Services',
    description: 'Professional wig care'
  },
  {
    icon: SparklesIcon,
    title: 'Quality Guarantee',
    description: 'Premium human hair'
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Alternative Hero Carousel - Better Control */}
<section className="relative overflow-hidden bg-gray-900">
  <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
    {heroSlides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Better Image Control - No fill */}
        <div className="absolute inset-0">
  <div className="relative w-full h-[110%] top-[-5%] overflow-hidden">
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      className="object-cover"
      priority={index === 0}
      sizes="100vw"
      quality={90}
      style={{
        objectPosition: 'top center',
        // Slight zoom to see more of the image
        transform: 'scale(1.0) translateY(-4%)',
        transformOrigin: 'top center'
      }}
    />
  </div>
</div>
        
        {/* Gradient overlay - lighter for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>
    ))}
    
    {/* Content */}
    <div className="absolute inset-0 flex px-9 items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          {heroSlides[currentSlide].badge && (
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-jify-primary-700 text-white text-xs md:text-sm font-semibold mb-4 md:mb-6">
              {heroSlides[currentSlide].badge}
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-4">
            {heroSlides[currentSlide].title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 max-w-lg">
            {heroSlides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link href={heroSlides[currentSlide].ctaLink}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-jify-primary-700 hover:bg-jify-primary-900 text-white px-6 py-3 md:px-8"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-white hover:text-jify-primary-500 hover:bg-white/10 border-white/30 px-6 py-3"
              >
                Browse All Wigs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Carousel Indicators */}
    <div className="absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
      {heroSlides.map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setIsAutoPlaying(false);
            setCurrentSlide(i);
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
          className={`rounded-full transition-all duration-300 ${
            i === currentSlide 
              ? 'w-6 md:w-8 bg-jify-primary-500 h-1.5 md:h-2' 
              : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/80'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>

    {/* Mobile Arrows at Bottom */}
    <div className="md:hidden absolute bottom-3 left-0 right-0 flex justify-center mb-1 space-x-4">
      <button
        onClick={prevSlide}
        className="bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronRightIcon className="w-5 h-5 rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>

    {/* Desktop Arrows at Sides */}
    <button
      onClick={prevSlide}
      className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all"
      aria-label="Previous slide"
    >
      <ChevronRightIcon className="w-6 h-6 rotate-180" />
    </button>
    <button
      onClick={nextSlide}
      className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center backdrop-blur-sm transition-all"
      aria-label="Next slide"
    >
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  </div>
</section>

      {/* Trust Badges Section */}
      <section className="py-8 bg-jify-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-jify-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-jify-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category - Single Row Infinite Carousel */}
<section className="py-16 bg-white">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-jify-primary-600 mb-4">
        Shop by Category
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover our premium wig collections curated for every style and occasion
      </p>
    </div>

    {/* Single Row Infinite Carousel Container */}
    <div className="relative overflow-hidden py-4">
      {/* Left Gradient Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
      
      {/* Carousel Track - Single Row */}
      <div className="flex animate-infinite-scroll-faster">
        {/* Duplicate categories for seamless loop */}
        {[...categories, ...categories, ...categories].map((category, index) => (
          <div 
            key={`${category.id}-${index}`} 
            className="flex-shrink-0 w-[180px] md:w-[200px] lg:w-[220px] px-3"
          >
           {/* ✅ CategoryCard links to /shop?category=${slug} */}
                  <Link href={`/shop?category=${category.slug}`} className="block">
                    <CategoryCard category={category} />
                  </Link>
                </div>
              ))}
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center mt-12">
      <Link href="/shop">
        <Button className="bg-jify-primary-600 hover:bg-jify-primary-700 text-white px-8">
          View All Categories
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-5xl font-bold text-jify-primary-600">Featured Wigs</h2>
              <p className="text-gray-600 mt-2">Best sellers and new arrivals</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="text-jify-primary hover:text-jify-primary/80">
                View All Products
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
                        
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    />
                ))}
              </div>
          
          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button size="lg" className="bg-jify-primary-600 hover:bg-jify-primary-600/90">
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Shop All Wigs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wig Care Services - Premium Design */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-jify-primary-100 rounded-full text-sm font-semibold text-jify-primary-700 mb-4">
        <ScissorsIcon className="w-4 h-4" />
        EXPERT WIG CARE
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Professional Wig <span className="text-jify-primary-600">Treatment</span> Services
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Keep your wigs looking fresh, vibrant, and flawless with our certified wig care specialists
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>

    {/* Additional Info & CTA */}
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Benefits */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Our Wig Care Services?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-jify-primary-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">Certified wig specialists with 5+ years experience</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-jify-primary-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">Premium products used for lasting results</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-jify-primary-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">24-hour turnaround for most services</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-jify-primary-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">Pickup & delivery options available</span>
            </li>
          </ul>
        </div>

        {/* Right Column - CTA */}
        <div className="bg-gradient-to-br from-jify-primary-50 to-jify-primary-100 rounded-2xl p-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Refresh Your Wig?</h4>
          <p className="text-gray-700 mb-6">
            Book a professional wig care service and bring your wig back to life. 
            Our experts handle everything from cleaning to styling.
          </p>
          <div className="space-y-4">
            <Link href="/services/book" className="block">
              <Button size="lg" className="w-full bg-jify-primary-500 hover:bg-jify-primary-700 text-white">
                Book Service Now
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="w-full border-jify-primary-500 text-jify-primary-700 hover:bg-jify-primary-500 hover:text-jify-primary-700 mt-4">
                View All Services
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section - Visual Layout */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-jify-primary-100 rounded-full mb-6">
        <svg className="w-5 h-5 text-jify-primary-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        <span className="text-sm font-semibold text-jify-primary-700">TRUSTED BY THOUSANDS</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Love from Our <span className="text-jify-primary-600">JifyWigs</span> Family
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        See why thousands of wig lovers choose us for premium quality and exceptional service
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
      {/* Left Column - Stats */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-5xl font-bold text-jify-primary-700 mb-2">4.8</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">1,200+</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Quality</span>
                <span className="font-semibold">4.9</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-jify-primary-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Service</span>
                <span className="font-semibold">4.8</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-jify-primary-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Delivery</span>
                <span className="font-semibold">4.7</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-jify-primary-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>

       <div className="bg-gradient-to-r from-jify-primary-600 to-jify-primary-700 rounded-3xl p-8 text-white">
  <div className="text-3xl font-bold mb-4">5,200+</div>
  <div className="text-xl font-semibold mb-2">Happy Customers</div>
  <p className="text-jify-primary-100">And counting every day</p>
  
  {/* Stacked Customer Avatars - In a straight line */}
  <div className="relative h-12 mt-6">
    {[
      { initials: 'CA', bg: 'bg-white' },
      { initials: 'AT', bg: 'bg-white' },
      { initials: 'BO', bg: 'bg-white' },
      { initials: 'SE', bg: 'bg-white' },
      { initials: 'ML', bg: 'bg-white' },
    ].map((customer, index) => (
      <div
        key={index}
        className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-jify-primary-600"
        style={{
          left: `${index * 28}px`,
          zIndex: 10 - index,
        }}
      >
        <span className="text-jify-primary-700 font-bold text-sm">
          {customer.initials}
        </span>
      </div>
    ))}
    
    {/* Count badge */}
    <div
      className="absolute w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30"
      style={{
        left: '160px', // 5 avatars * 28px = 140px
        zIndex: 5,
      }}
    >
      <span className="text-white font-bold text-sm">+5K</span>
    </div>
  </div>
</div>
      </div>

      {/* Right Column - Testimonials */}
      <div className="lg:col-span-3 space-y-8">
        {testimonials.map((testimonial) => (
    <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-jify-primary-400 to-jify-primary-600 flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${testimonial.type === 'service' ? 'bg-jify-primary-100 text-jify-primary-700' : 'bg-gray-100 text-gray-700'}`}>
                    {testimonial.type === 'service' ? 'Wig Care Service' : 'Wig Purchase'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  </div>
</section>

      {/* CTA Section - Minimalist Elegance */}
<section className="py-20 bg-jify-primary-200">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Decorative top border */}
    <div className="flex justify-center mb-12">
      <div className="w-24 h-1 bg-jify-primary rounded-full"></div>
    </div>
    
    <div className="text-center">
      {/* Headline */}
      <div className="mb-8">
        <span className="inline-block px-4 py-2 bg-white text-jify-primary rounded-full text-sm font-semibold mb-4">
          EXCLUSIVE ACCESS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-jify-primary-500 mb-4">
          Stay In The Loop
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Be the first to know about new wig collections, exclusive sales, and professional wig care insights.
        </p>
      </div>
      
      {/* Newsletter Form */}
      <div className="max-w-md mx-auto mb-16">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-sm">
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
              required
            />
            <Button 
              type="submit"
              className="bg-jify-primary-500 text-white hover:bg-jify-primary-600/90 px-8 py-4 rounded-xl font-semibold"
            >
              Join Now
            </Button>
          </form>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Unsubscribe anytime. We value your privacy.
        </p>
      </div>
      
      {/* Stats in a clean grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto bg-white p-6 rounded-2xl">
        <div className="text-center p-6 border border-gray-100 rounded-xl">
          <div className="text-3xl font-bold text-jify-primary-600 mb-2">5,200+</div>
          <div className="text-sm font-medium text-gray-600">Wigs Sold</div>
        </div>
        <div className="text-center p-6 border border-gray-100 rounded-xl">
          <div className="text-3xl font-bold text-jify-primary-600 mb-2">4.9★</div>
          <div className="text-sm font-medium text-gray-600">Customer Rating</div>
        </div>
        <div className="text-center p-6 border border-gray-100 rounded-xl">
          <div className="text-3xl font-bold text-jify-primary-600 mb-2">1-3</div>
          <div className="text-sm font-medium text-gray-600">Day Delivery</div>
        </div>
        <div className="text-center p-6 border border-gray-100 rounded-xl">
          <div className="text-3xl font-bold text-jify-primary-600 mb-2">24/7</div>
          <div className="text-sm font-medium text-gray-600">Support</div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}