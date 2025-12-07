import { Schema, model, Document } from 'mongoose'; // Add model import

export const WishlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

export const Wishlist = model('Wishlist', WishlistSchema); // ADD THIS LINE

export interface IWishlistDocument extends Document {
  userId: string;
  items: string[];
  createdAt: Date;
  updatedAt: Date;
}