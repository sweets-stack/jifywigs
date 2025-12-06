// shared/models/User.ts
import { Schema, model } from 'mongoose';
import { UserRole } from '../enums';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model('User', UserSchema);

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}