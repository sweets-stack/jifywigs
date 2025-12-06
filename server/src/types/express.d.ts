// server/src/types/express.d.ts
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