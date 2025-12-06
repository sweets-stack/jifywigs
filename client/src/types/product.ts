import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared/enums';

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  description: string;
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
  videoUrl?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
}
