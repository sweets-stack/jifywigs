// client/app/services/[id]/page.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const service = {
  _id: '1',
  name: 'Wig Washing & Conditioning',
  slug: 'washing',
  description: 'Our professional washing and conditioning service restores your wig to like-new condition. We use sulfate-free products and gentle techniques to cleanse without damage.',
  basePrice: 3500,
  durationMins: 60,
  isActive: true,
  details: [
    'Deep cleanse to remove product buildup',
    'Hydrating conditioner treatment',
    'Gentle detangling and styling',
    'Heat protection application',
    'Final shine treatment',
  ],
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto pt-8 pb-52">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{service.name}</h1>
        <p className="text-gray-600 mt-2">
          From ₦{service.basePrice.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <h3 className="font-medium mb-3">What's Included:</h3>
              <ul className="space-y-2 text-gray-600">
                {service.details.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="font-medium mb-2">Duration</h3>
                <p className="text-gray-600">{Math.floor(service.durationMins / 60)} hour(s)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-jify-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-jify-primary font-bold text-xl">
                    ₦{service.basePrice.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">Starting From</h3>
              </div>

              <Button
                onClick={() => (window.location.href = '/services/book')}
                className="w-full"
              >
                Book This Service
              </Button>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{Math.floor(service.durationMins / 60)} hour(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Available</span>
                  <span>Yes</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty</span>
                  <span>7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}