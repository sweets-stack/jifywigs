// server/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products';
import serviceRoutes from './routes/service.routes';
import bookingRoutes from './routes/book';
import orderRoutes from './routes/order.routes';
import trackingRoutes from './routes/tracking.routes';
import { authenticate } from './middleware/auth.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan(':method :url :status :res\[content-length\] - :response-time ms'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', authenticate, bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to DB
connectDB();

export default app;
