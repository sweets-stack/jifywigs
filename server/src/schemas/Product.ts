// server/src/schemas/Product.ts
import { Schema, model } from 'mongoose';
import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared'; // âœ… Now resolvable

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    type: { type: String, enum: Object.values(ProductType), default: ProductType.WIG },
    category: { type: String, required: true },
    color: { type: String, required: true },
    length: { type: String, enum: Object.values(WigLength), required: true },
    density: { type: Number, required: true, min: 100, max: 250 },
    laceType: { type: String, enum: Object.values(WigLaceType), required: true }, // âœ… Object.values, not Object:values
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
    isPreOrder: { type: Boolean, default: false },
    images: [{ type: String, required: true }],
    videoUrl: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = model('Product', ProductSchema);