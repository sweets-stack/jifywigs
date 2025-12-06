// server/src/routes/tracking.routes.ts
import { Router } from 'express';
import { getTrackingInfo } from '../controllers/tracking.controller';

const router = Router();

router.get('/:id', getTrackingInfo);

export default router;