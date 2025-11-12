import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { protect } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = Router();

router.get('/', protect, admin, getAnalytics);

export default router;