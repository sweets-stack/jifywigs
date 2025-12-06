// server/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
// server/src/server.ts - Update CORS
app.use(cors({
  origin: 'http://localhost:3005', // Frontend on port 3005
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('❌ JWT_SECRET is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 JWT_SECRET configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
    });
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure:');
    console.log('1. MongoDB Atlas cluster is running');
    console.log('2. IP address is whitelisted in MongoDB Atlas');
    console.log('3. Database user credentials are correct');
    process.exit(1);
  }
};

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start the server
connectDB();