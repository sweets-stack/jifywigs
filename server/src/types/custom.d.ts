// server/src/types/custom.d.ts
import { UserRole } from '@jifywigs/shared';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

// This file doesn't need exports
export {};