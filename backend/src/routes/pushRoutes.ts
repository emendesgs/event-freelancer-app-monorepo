import { Router } from 'express';
import { subscribe, send } from '../controllers/pushController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/subscribe', subscribe);
router.post('/send', protect, send);

export default router;