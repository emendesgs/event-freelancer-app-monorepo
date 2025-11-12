import { Router } from 'express';
import { 
  createJob, 
  getJobs, 
  getJobById, 
  updateJob, 
  deleteJob, 
  getMyJobs 
} from '../controllers/jobController';
import { protect, optionalAuth } from '../middleware/auth';

const router = Router();

// Public routes (with optional auth for personalized results)
router.get('/', optionalAuth, getJobs);
router.get('/:id', optionalAuth, getJobById);

// Protected routes
router.post('/', protect, createJob);
router.get('/user/me', protect, getMyJobs);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;