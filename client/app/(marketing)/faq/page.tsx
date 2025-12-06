// client/app/(marketing)/faq/page.tsx
export default function FAQPage() {
  const faqs = [
    {
      question: "What types of wigs do you sell?",
      answer: "We specialize in premium human hair wigs including bone straight, curly, colored, frontal, and closure wigs. All our wigs are made with 100% human hair for a natural look and feel."
    },
    {
      question: "How do I book a wig treatment service?",
      answer: "Visit our Services page, select the treatment you need, upload photos of your wig, choose a date, and complete payment. We'll confirm your booking within 24 hours."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Paystack (cards, bank transfer) for Nigerian customers and Stripe (cards) for international customers. Bank transfer is also available for all customers."
    },
    {
      question: "How long does shipping take?",
      answer: "Lagos: 1-2 business days. Other Nigerian states: 2-5 business days. International: 5-10 business days depending on location."
    },
    {
      question: "Can I return a wig if I'm not satisfied?",
      answer: "Yes, we offer a 7-day return policy for unworn wigs in original packaging. Custom wigs and used treatment services are non-refundable."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-gray-600 mt-4">
          Everything you need to know about JifyWigs
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50">
              <span className="font-medium">{faq.question}</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Still have questions?
        </p>
        <a
          href="/contact"
          className="inline-block bg-jify-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-jify-primary/90"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}