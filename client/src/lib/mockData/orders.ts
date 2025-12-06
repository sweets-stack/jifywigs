import { IOrder, IOrderItem } from '@jifywigs/shared/types';
import { OrderStatus } from '@jifywigs/shared/enums';

export const orders: IOrder[] = [
  {
    _id: 'ord_001',
    userId: 'usr_001',
    items: [
      { productId: 'prod_001', name: 'Wig', price: 38000, qty: 1, image: '/images/wig1.jpg' }
    ],
    totalAmount: 38000,
    status: OrderStatus.SHIPPED,
    shippingAddress: {
      firstName: 'Sweetstack',
      lastName: 'J.',
      address: '123 Lekki',
      city: 'Lagos',
      state: 'Lagos',
      phone: '+2348031234567',
    },
    trackingNumber: 'JW-ORD-001',
  },
];