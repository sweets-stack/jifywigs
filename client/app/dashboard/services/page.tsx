// client/app/dashboard/services/page.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressTracker } from '@/components/services/ProgressTracker';
import { BookingStatus } from '@jifywigs/shared/enums';
import { Button } from '@/components/ui/Button';
interface Booking {
  id: string;
  date: string;
  services: string[];
  status: BookingStatus;
  trackingNumber: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK-1234',
    date: 'Dec 1, 2025',
    services: ['Wig Washing & Conditioning', 'Color Refresh'],
    status: BookingStatus.IN_PROGRESS,
    trackingNumber: 'JWABC123',
  },
  {
    id: 'BK-1198',
    date: 'Nov 20, 2025',
    services: ['Full Revamp'],
    status: BookingStatus.COMPLETED,
    trackingNumber: 'JWABC102',
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Service Bookings</h1>
        <p className="text-gray-600 mt-1">Track your wig treatment progress.</p>
      </div>

      <div className="space-y-6">
        {mockBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Booking #{booking.id}</h3>
                  <p className="text-sm text-gray-600">{booking.date}</p>
                </div>
                <Badge variant={booking.status === BookingStatus.COMPLETED ? 'success' : 'secondary'}>
                  {booking.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="font-medium">Services:</p>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {booking.services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Progress</p>
                <ProgressTracker currentStatus={booking.status} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Tracking: <span className="font-mono">{booking.trackingNumber}</span>
                  </p>
                </div>
                <Button size="sm">Chat Support</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}