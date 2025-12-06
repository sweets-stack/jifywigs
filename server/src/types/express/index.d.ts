// server/src/types/express/index.d.ts
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

// Export nothing - this is just for type declaration
export {};