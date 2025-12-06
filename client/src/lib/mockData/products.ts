import { IProduct } from '@jifywigs/shared/types';
import { ProductType, WigLength, WigLaceType } from '@jifywigs/shared/enums';

export const products: IProduct[] = [
  {
    _id: 'prod_001',
    name: 'Bone Straight Wig',
    slug: 'bone-straight',
    description: '180% density',
    price: 45000,
    discountPrice: 38000,
    type: ProductType.WIG,
    category: 'bone_straight',
    color: 'Black',
    length: WigLength.LONG,
    density: 180,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 12,
    images: ['/images/wig1.jpg'],
  },
];