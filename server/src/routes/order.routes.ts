// server/src/routes/order.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createOrder, getOrdersByUser, updateOrderStatus } from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/me', getOrdersByUser);
router.patch('/:id/status', updateOrderStatus);

export default router;