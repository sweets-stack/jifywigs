// server/src/routes/admin.routes.ts
import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '@jifywigs/shared';
import {
  getAnalyticsDashboard,
  exportAnalytics,
} from '../controllers/admin.controller';

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER));

router.get('/analytics', getAnalyticsDashboard);
router.get('/analytics/export', exportAnalytics);

export default router;