import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About JifyWigs | Premium Human Hair Wigs in Nigeria',
  description: 'Learn about JifyWigs — Nigeria\'s trusted source for premium human hair wigs and professional wig care services.',
};

const milestones = [
  { year: '2020', event: 'Founded in Lagos with a passion for authentic wig experiences' },
  { year: '2021', event: 'Launched first premium bone straight collection' },
  { year: '2022', event: 'Introduced professional wig care services' },
  { year: '2023', event: 'Served over 2,500 customers nationwide' },
  { year: '2024', event: 'Expanded to wholesale partnerships across West Africa' },
  { year: '2025', event: 'Reached 4.8★ average customer rating' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jify-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 bg-jify-primary-100 rounded-full text-sm font-semibold text-jify-primary-700 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              OUR STORY
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Crafting Confidence, <span className="text-jify-primary-600">One Wig at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              At JifyWigs, we believe every person deserves to feel beautiful, confident, and empowered — 
              and the right wig can be transformative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-jify-primary-500 hover:bg-jify-primary-600 px-8 py-4">
                  Explore Our Collection
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-jify-primary-500 text-jify-primary-500 hover:bg-jify-primary-50/10 px-8 py-4">
                  Discover Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-jify-primary-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To provide Nigeria and beyond with premium, ethically-sourced human hair wigs and 
                professional wig care services that empower individuals to express their beauty with confidence.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We combine craftsmanship, technology, and personalized service to create wigs that look, feel, 
                and behave like natural hair — because everyone deserves to feel their best.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3 h-3 text-jify-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Ethical Sourcing</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3 h-3 text-jify-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Craftsmanship</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3 h-3 text-jify-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Customer First</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-jify-primary-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3 h-3 text-jify-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Innovation</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-jify-primary-400 to-jify-primary-600 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">Our Workshop</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-jify-primary-100 rounded-full opacity-30"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-jify-primary-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-jify-primary-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600">
              From a small workshop in Yaba to Nigeria's trusted wig brand
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-jify-primary-200 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jify-primary-500 flex items-center justify-center text-white font-bold z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 md:ml-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <span className="text-jify-primary-600 font-semibold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-2">{milestone.event}</h3>
                      </div>
                      {index === milestones.length - 1 && (
                        <span className="mt-2 md:mt-0 px-3 py-1 bg-gradient-to-r from-jify-primary-500 to-jify-primary-600 text-white text-sm font-semibold rounded-full">
                          Present
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-jify-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Wig?
          </h2>
          <p className="text-xl text-jify-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust JifyWigs for quality, service, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-white text-jify-primary-600 hover:bg-gray-100 px-8 py-4 font-semibold">
                Shop Wigs
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}