import { Router } from 'express';
import { createService, getServices, getServiceById } from '../controllers/serviceController';
import { protect } from '../middleware/auth';

const router = Router();

router.route('/').post(protect, createService).get(getServices);
router.route('/:id').get(getServiceById);

export default router;