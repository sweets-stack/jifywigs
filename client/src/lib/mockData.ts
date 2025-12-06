// client/src/lib/mockData.ts
import { IProduct } from '@jifywigs/shared/types';
import { ProductType, WigLength, WigLaceType } from '@jifywigs/shared/enums'; // ✅ enums from enums.ts

export const products: IProduct[] = [
  {
    _id: '1',
    name: 'Premium Bone Straight Wig',
    slug: 'premium-bone-straight',
    description: '180% density, frontal lace',
    price: 45000,
    discountPrice: 38000,
    type: ProductType.WIG, // ✅ enum value
    category: 'bone_straight',
    color: 'Natural Black',
    length: WigLength.LONG, // ✅ enum value
    density: 180,
    laceType: WigLaceType.FRONTAL, // ✅ enum value
    inStock: true,
    stockCount: 12,
    isPreOrder: false,
    images: ['/images/wig1.jpg'],
    rating: 4.8,
    reviewCount: 86,
  },
  // ... add more
];