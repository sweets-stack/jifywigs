'use client'; // ✅ Add this at the top

import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ArrowRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// ❌ Move metadata to a parent layout file instead
// export const metadata: Metadata = {
//   title: 'Contact JifyWigs | Premium Wig Store in Lagos',
//   description: 'Visit our Lagos showroom or contact us for inquiries about premium human hair wigs and wig care services.',
// };

const faqs = [
  {
    question: "What are your business hours?",
    answer: "We're open Monday to Friday from 9AM to 6PM, and Saturday from 10AM to 4PM. Sundays and public holidays are closed."
  },
  {
    question: "Do you offer nationwide delivery?",
    answer: "Yes! We deliver to all states in Nigeria. Delivery takes 1-3 business days depending on your location."
  },
  {
    question: "Can I visit your showroom?",
    answer: "Absolutely! Our Lagos showroom is open during business hours. We recommend booking an appointment to ensure personalized service."
  },
  {
    question: "How do I book a wig care service?",
    answer: "You can book online via our Services page, or call/WhatsApp us to schedule an appointment."
  },
  {
    question: "Do you offer custom wig making?",
    answer: "Yes, we specialize in custom wig creation. Contact us to discuss your specific requirements and get a quote."
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In real app: POST to /api/contact
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schema.org JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JifyWigs",
    "url": "https://jifywigs.com",
    "logo": "/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2349049355400",
      "contactType": "Customer Service",
      "areaServed": "NG",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "16 Lagos Street, Mainland Yaba",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos",
      "postalCode": "100001",
      "addressCountry": "NG"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-jify-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-4 py-2 bg-jify-primary-100 rounded-full text-sm font-semibold text-jify-primary-700 mb-6">
            <MapPinIcon className="w-4 h-4 mr-2" />
            GET IN TOUCH
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Visit Us or <span className="text-jify-primary-600">Reach Out</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            We're here to help with any questions about our wigs, services, or orders. 
            Visit our Lagos showroom or contact us online.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jify-primary-100 flex items-center justify-center mr-4">
                    <MapPinIcon className="w-6 h-6 text-jify-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      16 Lagos Street, Mainland Yaba<br />
                      Lagos, Nigeria
                    </p>
                    <Link 
                      href="https://maps.app.goo.gl/..." 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-jify-primary-600 hover:text-jify-primary-700 font-medium mt-1 inline-flex items-center"
                    >
                      Get Directions
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jify-primary-100 flex items-center justify-center mr-4">
                    <PhoneIcon className="w-6 h-6 text-jify-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone & WhatsApp</h3>
                    <p className="text-gray-600">
                      <Link href="tel:+2349049355400" className="hover:text-jify-primary-600">
                        +234 904 935 5400
                      </Link>
                      <br />
                      <Link href="https://wa.me/2349049355400" target="_blank" className="hover:text-jify-primary-600">
                        WhatsApp Us
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jify-primary-100 flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-6 h-6 text-jify-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <Link href="mailto:hello@shopjifywigs.com.ng" className="hover:text-jify-primary-600">
                        hello@shopjifywigs.com.ng
                      </Link>
                      <br />
                      <span className="text-sm text-gray-500">For orders & general inquiries</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-jify-primary-100 flex items-center justify-center mr-4">
                    <ClockIcon className="w-6 h-6 text-jify-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link 
                    href="https://instagram.com/jifywigs" 
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-jify-primary-500 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </Link>
                  <Link 
                    href="https://facebook.com/jifywigs" 
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-jify-primary-500 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>
                  <Link 
                    href="https://wa.me/2349049355400" 
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                {/* Replace with actual Google Maps embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952852960433!2d3.3792123!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae6828071%3A0xdc93f7e5a6a6a6a6!2sYaba%2C%20Lagos!5e0!3m2!1sen!2sng!4v1717111111111!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JifyWigs Location"
                ></iframe>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                <strong>Note:</strong> We recommend booking an appointment before visiting to ensure personalized service.
              </p>
              <Button 
                onClick={() => window.open('https://calendly.com/jifywigs/consultation', '_blank')}
                className="mt-4 bg-jify-primary-500 hover:bg-jify-primary-600"
              >
                Book a Showroom Visit
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-20 bg-gradient-to-br from-white to-jify-primary-50 rounded-3xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Send Us a Message</h2>
            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              Have a question about our products or services? Fill out the form and we'll get back to you within 24 hours.
            </p>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll respond to your inquiry within 24 business hours.
                </p>
                <Button 
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline"
                  className="mt-4 border-jify-primary-500 text-jify-primary-500 hover:bg-jify-primary-50/10"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    placeholder="e.g. Order Inquiry, Wig Service, Wholesale"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-jify-primary-500 hover:bg-jify-primary-600 py-4 font-semibold"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Answers to common questions about our products and services
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <ChevronDownIcon 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6 pt-2 text-gray-600 bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}