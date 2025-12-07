import { Schema, model, Document } from 'mongoose'; // Add model import

export const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model('Cart', CartSchema); // ADD THIS LINE

export interface ICartDocument extends Document {
  userId: string;
  items: { productId: string; quantity: number }[];
  createdAt: Date;
  updatedAt: Date;
}