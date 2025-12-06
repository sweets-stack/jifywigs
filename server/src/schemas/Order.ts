// server/src/schemas/Order.ts
import { Schema, model } from 'mongoose';
import { OrderStatus } from '@jifywigs/shared';

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String },
      phone: { type: String, required: true },
    },
    trackingNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Auto-generate tracking number
OrderSchema.pre('save', function (next) {
  if (this.isNew && !this.trackingNumber) {
    this.trackingNumber = 'JW' + Date.now().toString(36).toUpperCase();
  }
  next();
});

export const Order = model('Order', OrderSchema); // âœ… EXPORT HERE