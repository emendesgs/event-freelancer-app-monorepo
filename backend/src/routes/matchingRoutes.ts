import { Router } from 'express';
import { getJobMatches, getFreelancerMatches } from '../controllers/matchingController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/jobs/:id', protect, getJobMatches);
router.get('/freelancers/:id', protect, getFreelancerMatches);

export default router;