// server/src/types/express.d.ts
import { UserRole } from '@jifywigs/shared';
import express from 'express';

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

// Export nothing since it's a declaration file
export {};