import { Router } from 'express';
import { createPaymentIntent, handlePaymentWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/create-intent', protect, createPaymentIntent);
router.post('/webhook', handlePaymentWebhook);

export default router;