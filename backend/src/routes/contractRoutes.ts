import { Router } from 'express';
import { create, getById, updateStatus } from '../controllers/contractController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', protect, create);
router.get('/:id', protect, getById);
router.put('/:id/status', protect, updateStatus);

export default router;