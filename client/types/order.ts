// client/src/types/order.ts
import { OrderStatus } from '@jifywigs/shared/enums';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface IOrder {
  _id?: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
    phone: string;
  };
  trackingNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}