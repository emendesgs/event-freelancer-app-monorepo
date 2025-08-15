import { Router } from 'express';
import { createApplication } from '../controllers/applicationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, createApplication);

export default router;
