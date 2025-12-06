import { Schema, model } from 'mongoose';
import { OrderStatus } from '../enums';

export const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: String,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    shipping: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
    },
    payment: {
      method: { type: String, required: true },
      transactionId: String,
    },
  },
  { timestamps: true }
);

export const Order = model('Order', OrderSchema); // ADD THIS LINE

export interface IOrderDocument extends Document {
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  total: number;
  status: OrderStatus;
  shipping: {
    address: string;
    city: string;
    state: string;
    phone: string;
  };
  payment: {
    method: 'paystack' | 'flutterwave' | 'bank_transfer' | 'cash';
    transactionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}