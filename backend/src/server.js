/**
 * Express Server Configuration
 * Site da Luci - Backend API
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes and middlewares
import routes from './presentation/routes/index.js';
import { errorHandler } from './presentation/middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Security middleware - Helmet sets various HTTP headers for security
app.use(helmet());

// CORS middleware - Allow cross-origin requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // In production, set specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware - Parse JSON request bodies
app.use(express.json({ limit: '10mb' })); // Limit payload size for security
app.use(express.urlencoded({ extended: true }));

// Logging middleware - Log HTTP requests (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount API routes
app.use('/api', routes);

// Error handler middleware (MUST be last)
app.use(errorHandler);

// Start server (only if not in test environment)
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Site da Luci API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
}

// Export app for testing
export default app;