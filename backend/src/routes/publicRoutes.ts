import { Router } from 'express';
import { getPublicJobs, getPublicCategories } from '../controllers/publicController';

const router = Router();

router.get('/jobs', getPublicJobs);
router.get('/categories', getPublicCategories);

export default router;