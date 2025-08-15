import { Router } from 'express';
import { 
  createJob, 
  getJobs, 
  getJobById, 
  updateJob, 
  deleteJob, 
  getMyJobs 
} from '../controllers/jobController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

// Public routes (with optional auth for personalized results)
router.get('/', optionalAuth, getJobs);
router.get('/:id', optionalAuth, getJobById);

// Protected routes
router.post('/', authenticateToken, createJob);
router.get('/user/me', authenticateToken, getMyJobs);
router.put('/:id', authenticateToken, updateJob);
router.delete('/:id', authenticateToken, deleteJob);

export default router;
