// client/app/track/[trackingId]/page.tsx
import { notFound } from 'next/navigation';
import { generateSeo } from '@/lib/seo';
import { SeoMeta } from '@/components/marketing/SeoMeta';
import { trackViewTrackingPage } from '@/lib/analytics';
import { ProgressTracker } from '@/components/services/ProgressTracker';
import { Badge } from '@/components/ui/Badge';
import { BookingStatus } from '@jifywigs/shared/enums';
import { CheckCircleIcon, SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface TrackingData {
  type: 'order' | 'booking';
  trackingNumber: string;
  status: string;
  items?: { name: string; qty: number }[];
  services?: string[];
  history: { status: string; date: Date }[];
}

export async function generateMetadata({ params }: { params: { trackingId: string } }) {
  const res = await fetch(`http://localhost:3001/api/tracking/${params.trackingId}`);
  const data: TrackingData | { message: string } = await res.json();

  if ('message' in data) {
    return generateSeo({
      title: 'Tracking Not Found - JifyWigs',
      description: 'Track your JifyWigs order or service booking.',
    });
  }

  const title =
    data.type === 'order'
      ? `Order #${data.trackingNumber} Status`
      : `Booking #${data.trackingNumber} Status`;
  const description =
    data.type === 'order'
      ? `Track your JifyWigs order: ${data.items?.map((i) => i.name).join(', ')}.`
      : `Track your wig treatment: ${data.services?.join(', ')}.`;

  return generateSeo({
    title,
    description,
    url: `/track/${params.trackingId}`,
  });
}

export default async function TrackingPage({ params }: { params: { trackingId: string } }) {
  const res = await fetch(`http://localhost:3001/api/tracking/${params.trackingId}`);
  const data: TrackingData | { message: string } = await res.json();

  if ('message' in data) {
    notFound();
  }

  // GA4 Event
  trackViewTrackingPage(data.trackingNumber, data.type);

  const isCompleted =
    (data.type === 'order' && data.status === 'delivered') ||
    (data.type === 'booking' && data.status === 'completed');

  return (
    <>
      <SeoMeta
        page={{
          title: `Track ${data.type === 'order' ? 'Order' : 'Booking'} #${data.trackingNumber}`,
          description: `Live tracking for JifyWigs ${data.type} ${data.trackingNumber}`,
          url: `/track/${params.trackingId}`,
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-jify-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {data.type === 'order' ? (
              <ShoppingBagIcon className="w-8 h-8 text-jify-primary" />
            ) : (
              <SparklesIcon className="w-8 h-8 text-jify-primary" />
            )}
          </div>
          <h1 className="text-2xl font-bold">
            {data.type === 'order' ? 'Order' : 'Booking'} #{data.trackingNumber}
          </h1>
          <p className="text-gray-600 mt-2">
            {data.type === 'order' ? 'Your wig order' : 'Your wig treatment'}
          </p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center mb-8">
          <Badge
            variant={
              isCompleted
                ? 'success'
                : data.status === 'pending' || data.status === 'processing'
                ? 'warning'
                : 'secondary'
            }
          >
            {data.status.replace('_', ' ')}
          </Badge>
          {isCompleted && (
            <div className="mt-4 flex justify-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Timeline</h2>
          {data.type === 'order' ? (
            <div className="space-y-4">
              {data.history.map((event, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-jify-primary flex items-center justify-center text-white mt-0.5">
                    {i + 1}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{event.status}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProgressTracker 
  currentStatus={data.status as BookingStatus} // ✅ cast to enum
/>
          )}
        </div>

        {/* Items/Services */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">
            {data.type === 'order' ? 'Order Items' : 'Services'}
          </h2>
          <ul className="space-y-2">
            {(data.items || data.services)?.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {typeof item === 'string' ? item : `${item.name} × ${item.qty}`}
                </span>
                <span className="text-gray-600">
                  {typeof item === 'string' ? '' : `₦${(item as any).price * (item as any).qty}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Need help? Contact us at{' '}
          <a href="mailto:support@jifywigs.com" className="text-jify-primary">
            support@jifywigs.com
          </a>
        </div>
      </div>
    </>
  );
}