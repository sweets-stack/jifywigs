// server/src/schemas/User.ts
import { Schema, model, Document } from 'mongoose';
import { UserRole } from '@jifywigs/shared';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  loginMethod: string;
  profilePicture?: string;
  isGoogleAuth?: boolean;
  isActive?: boolean;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  wishlist?: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  // Add comparePassword method for authentication
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define a separate interface for JSON representation without password
export interface IUserJSON {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  loginMethod: string;
  profilePicture?: string;
  isGoogleAuth?: boolean;
  isActive?: boolean;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  wishlist?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: { 
      type: String, 
      default: '' 
    },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.CUSTOMER,
      validate: {
        validator: function(value: string) {
          return Object.values(UserRole).includes(value as UserRole);
        },
        message: '{VALUE} is not a valid role'
      }
    },
    loginMethod: { 
      type: String, 
      default: 'email' 
    },
    profilePicture: { 
      type: String, 
      default: '' 
    },
    isGoogleAuth: { 
      type: Boolean, 
      default: false 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    shippingAddress: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: 'Nigeria' },
      postalCode: { type: String, default: '' },
    },
    wishlist: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Product', 
      default: [] 
    }],
  },
  { 
    timestamps: true
  }
);

// Virtual for JSON representation without sensitive data
UserSchema.virtual('toJSON').get(function(): IUserJSON {
  const user = this.toObject() as any;
  
  // Transform the object to remove sensitive data
  const userJSON: IUserJSON = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    loginMethod: user.loginMethod,
    profilePicture: user.profilePicture,
    isGoogleAuth: user.isGoogleAuth,
    isActive: user.isActive,
    shippingAddress: user.shippingAddress,
    wishlist: user.wishlist?.map((id: any) => id.toString()),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  
  return userJSON;
});

// Method to get safe user object (without password)
UserSchema.methods.toSafeObject = function(): IUserJSON {
  const user = this.toObject() as any;
  
  // Remove password and other sensitive fields
  const { password, __v, ...safeUser } = user;
  
  return {
    ...safeUser,
    _id: safeUser._id.toString(),
    wishlist: safeUser.wishlist?.map((id: any) => id.toString())
  } as IUserJSON;
};

// Optional: Add pre-save hook to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Add comparePassword method for authentication
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Add index for frequently queried fields
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

export const User = model<IUser>('User', UserSchema);

// Type guard to check if object is IUser
export function isUser(obj: any): obj is IUser {
  return obj && 
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    Object.values(UserRole).includes(obj.role);
}

// Helper function to convert IUser to IUserJSON
export function toUserJSON(user: IUser | any): IUserJSON {
  const userObj = user.toObject ? user.toObject() : user;
  
  const { password, __v, ...safeUser } = userObj;
  
  return {
    ...safeUser,
    _id: safeUser._id?.toString() || safeUser._id,
    wishlist: safeUser.wishlist?.map((id: any) => id?.toString() || id)
  } as IUserJSON;
}