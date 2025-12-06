'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon, ChevronDownIcon, ScissorsIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ServiceCard } from '@/components/services/ServiceCard';
import { IService } from '@jifywigs/shared/types';


// Same services as homepage
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

const processSteps = [
  {
    number: '1',
    title: 'Book Online',
    description: 'Select your service, upload wig photos, and choose a date/time',
  },
  {
    number: '2',
    title: 'Drop Off or Pickup',
    description: 'Bring your wig to our Lagos showroom or choose pickup/delivery',
  },
  {
    number: '3',
    title: 'Professional Treatment',
    description: 'Our experts care for your wig with premium products and techniques',
  },
  {
    number: '4',
    title: 'Ready for Pickup',
    description: 'We notify you when your wig is ready — looking better than new!',
  },
];

const pricingTiers = [
  {
    name: 'Basic Care',
    price: 'From ₦3,500',
    description: 'Washing & conditioning for everyday maintenance',
    features: ['Deep cleaning', 'Detangling', 'Basic styling'],
    cta: 'Book Washing',
    href: '/services/book?service=washing'
  },
  {
    name: 'Premium Revamp',
    price: 'From ₦12,000',
    description: 'Complete restoration for tired or damaged wigs',
    features: ['Full wash & condition', 'Cutting & styling', 'Lace cleaning', 'Baby hair refresh'],
    cta: 'Book Revamp',
    href: '/services/book?service=revamping'
  },
  {
    name: 'Specialty Services',
    price: 'From ₦6,000',
    description: 'Targeted treatments for specific issues',
    features: ['Lace repair', 'Color refresh', 'Elastic band replacement', 'Ventilation repair'],
    cta: 'See All Services',
    href: '/services/book'
  },
];

const faqs = [
  {
    question: "How long does wig care take?",
    answer: "Most services are completed within 24-48 hours. Complex repairs may take up to 72 hours. We'll provide an estimated completion time when you book."
  },
  {
    question: "Do you pickup and deliver?",
    answer: "Yes! We offer pickup and delivery within Lagos for ₦2,000 each way. For locations outside Lagos, we partner with reliable courier services."
  },
  {
    question: "What if my wig is severely damaged?",
    answer: "We assess all wigs upon receipt and will contact you if additional work is needed. No extra charges without your approval."
  },
  {
    question: "Can I watch the process?",
    answer: "While we don't allow customers in the treatment area for hygiene and quality control reasons, we provide progress photos and updates throughout the process."
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-jify-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-4 py-2 bg-jify-primary-100 rounded-full text-sm font-semibold text-jify-primary-700 mb-6">
            <ScissorsIcon className="w-4 h-4 mr-2" />
            PROFESSIONAL WIG CARE
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Expert <span className="text-jify-primary-600">Wig Treatment</span> Services
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Bring your wigs back to life with our certified specialists. 
            From deep cleaning to full revamps, we restore beauty and longevity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/book">
              <Button className="bg-jify-primary-500 hover:bg-jify-primary-600 px-8 py-4">
                Book a Service
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" className="border-jify-primary-500 text-jify-primary-700 hover:bg-jify-primary-50/10 px-8 py-4">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-jify-primary-600">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional treatments for every wig need — from routine maintenance to full restoration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-jify-primary-600">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple, transparent process from booking to pickup
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.number} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-jify-primary-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-jify-primary-600 font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent <span className="text-jify-primary-600">Pricing</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              No hidden fees. What you see is what you pay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={tier.name} 
                className={`rounded-2xl p-8 border-2 ${
                  index === 1 
                    ? 'border-jify-primary-500 bg-gradient-to-b from-jify-primary-50 to-white' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-jify-primary-600 mb-1">{tier.price}</div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={tier.href} className="block">
                  <Button 
                    className={`w-full ${
                      index === 1 
                        ? 'bg-jify-primary-500 hover:bg-jify-primary-600' 
                        : 'bg-white border border-jify-primary-500 text-jify-primary-700 hover:bg-jify-primary-50/10'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-jify-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-jify-primary-600">JifyWigs</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We go beyond basic wig care to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-jify-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-jify-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Certified Experts</h3>
              <p className="text-gray-600">
                Our specialists have 5+ years of experience and ongoing training in the latest techniques.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-jify-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-jify-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Products</h3>
              <p className="text-gray-600">
                We use only professional-grade, wig-safe products that protect and enhance your investment.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-jify-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-jify-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
              <p className="text-gray-600">
                Pay online securely via Paystack or Flutterwave, or cash on delivery/pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-jify-primary-600">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </button>
                <div className="px-6 pb-6 pt-2 text-gray-600 bg-gray-50">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-jify-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Refresh Your Wig?
          </h2>
          <p className="text-xl text-jify-primary-100 mb-10 max-w-2xl mx-auto">
            Book a professional wig care service today and experience the JifyWigs difference.
          </p>
          <Link href="/services/book">
            <Button className="bg-white text-jify-primary-600 hover:bg-gray-100 px-8 py-4 font-semibold">
              Book Service Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}