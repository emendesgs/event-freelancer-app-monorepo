import { Router } from 'express';
import { addCertification, getCertifications } from '../controllers/certificationController';
import { protect } from '../middleware/auth';

const router = Router();

router.route('/').post(protect, addCertification);
router.route('/freelancer/:id').get(protect, getCertifications);

export default router;