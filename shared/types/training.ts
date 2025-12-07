// shared/types/training.ts
import { TrainingMode, TrainingStatus, CertificateStatus } from '../enums';

export interface ITraining {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  outline: string[]; // e.g., ["Module 1: Wig Anatomy", "Module 2: Glueless Installation"]
  price: number;
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR';
  durationWeeks: number;
  mode: TrainingMode;
  instructor: {
    name: string;
    bio?: string;
    photo?: string;
  };
  capacity: number;
  enrolledCount: number;
  startDate?: Date;
  location?: string; // for physical
  materials: { title: string; url: string; type: 'pdf' | 'video' | 'zip' }[];
  status: TrainingStatus;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonical?: string;
  };
  createdAt?: Date;
}

export interface IEnrollment {
  _id?: string;
  userId: string;
  trainingId: string;
  paymentMethod: string;
  amountPaid: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  proofOfPayment?: string; // Cloudinary URL
  enrolledAt: Date;
  completedAt?: Date;
}

export interface ICertificate {
  _id?: string;
  enrollmentId: string;
  userId: string;
  trainingId: string;
  url: string; // Cloudinary PDF
  issuedAt: Date;
  status: CertificateStatus;
}