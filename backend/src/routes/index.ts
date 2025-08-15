import { Router } from 'express';
import authRoutes from './authRoutes';
import jobRoutes from './jobRoutes';
import applicationRoutes from './applicationRoutes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ 
    success: true, 
    message: 'Event Freelancer API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
