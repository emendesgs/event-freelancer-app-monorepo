import { Router } from 'express';
import { addSocialLink, getSocialLinks, deleteSocialLink } from '../controllers/socialController';
import { protect } from '../middleware/auth';

const router = Router();

router.route('/').post(protect, addSocialLink);
router.route('/user/:id').get(protect, getSocialLinks);
router.route('/:id').delete(protect, deleteSocialLink);

export default router;