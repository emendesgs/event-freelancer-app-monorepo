import { Router } from 'express';
import authRoutes from './authRoutes';
import jobRoutes from './jobRoutes';
import applicationRoutes from './applicationRoutes';
import paymentRoutes from './paymentRoutes';
import messageRoutes from './messageRoutes';
import pushRoutes from './pushRoutes';
import categoryRoutes from './categoryRoutes';
import contractRoutes from './contractRoutes';
import analyticsRoutes from './analyticsRoutes';
import calendarRoutes from './calendarRoutes';
import publicRoutes from './publicRoutes';
import matchingRoutes from './matchingRoutes';
import certificationRoutes from './certificationRoutes';
import serviceRoutes from './serviceRoutes';
import socialRoutes from './socialRoutes';
import productRoutes from './productRoutes';

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
router.use('/payments', paymentRoutes);
router.use('/messages', messageRoutes);
router.use('/push', pushRoutes);
router.use('/contracts', contractRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/categories', categoryRoutes);
router.use('/calendar', calendarRoutes);
router.use('/public', publicRoutes);
router.use('/matching', matchingRoutes);
router.use('/certifications', certificationRoutes);
router.use('/services', serviceRoutes);
router.use('/socials', socialRoutes);
router.use('/products', productRoutes);

export default router;