import { Router } from 'express';
import { getMessageHistory } from '../controllers/messageController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/:room', protect, getMessageHistory);

export default router;