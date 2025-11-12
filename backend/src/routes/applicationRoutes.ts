import { Router } from 'express';
import { createApplication } from '../controllers/applicationController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/', protect, createApplication);

export default router;