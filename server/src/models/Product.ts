// server/src/models/Product.ts
import { Schema, model, Document } from 'mongoose';
import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared/enums';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number;
  type: ProductType;
  category: string;
  color: string;
  length: WigLength;
  density: number;
  laceType: WigLaceType;
  inStock: boolean;
  stockCount: number;
  isPreOrder: boolean;
  images: string[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  type: { type: String, required: true, enum: Object.values(ProductType) },
  category: { type: String, required: true },
  color: { type: String, required: true },
  length: { type: String, required: true, enum: Object.values(WigLength) },
  density: { type: Number, required: true },
  laceType: { type: String, required: true, enum: Object.values(WigLaceType) },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },
  isPreOrder: { type: Boolean, default: false },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
}, { timestamps: true });

export const Product = model<IProduct>('Product', productSchema);