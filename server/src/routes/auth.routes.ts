// server/src/routes/auth.routes.ts
import express from 'express';
import {
  register,
  login,
  googleAuth,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);



// Protected routes
router.get('/me', authenticate, getMe);

export default router;