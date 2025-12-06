import { IBooking } from '@jifywigs/shared/types';
import { BookingStatus } from '@jifywigs/shared/enums';

export const bookings: IBooking[] = [
  {
    _id: 'bk_001',
    userId: 'usr_001',
    services: [{ serviceId: 'svc_001' }],
    wigPhotos: ['/images/wig1.jpg'],
    appointmentDate: new Date(),
    pickupOption: 'dropoff',
    status: BookingStatus.CONFIRMED,
    trackingNumber: 'JW-BK-001',
  },
];