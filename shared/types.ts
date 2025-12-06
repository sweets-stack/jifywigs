// shared/types.ts
import { UserRole, ProductType, WigLaceType, WigLength, BookingStatus, OrderStatus } from './enums';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string;
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
  isPreOrder?: boolean;
  images: string[];
  videoUrl?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  durationMins: number;
  isActive: boolean;
  features?: string[];
  createdAt?: Date;
}

export interface IReview {
  _id?: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWishlist {
  _id?: string;
  userId: string;
  items: string[]; // array of product IDs
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  _id?: string;
  userId: string;
  items: IOrderItem[];
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
  createdAt?: Date;
}