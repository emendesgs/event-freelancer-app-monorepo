import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/calendarController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/events', protect, createEvent);
router.get('/events', protect, getEvents);

export default router;