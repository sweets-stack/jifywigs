// client/src/types/user.ts
import { UserRole } from '@jifywigs/shared/enums';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt?: Date;
}