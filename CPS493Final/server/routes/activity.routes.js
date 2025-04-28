import express from 'express';
import * as activityController from '../controllers/activity.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', activityController.getActivities);
router.post('/', activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);
router.get('/friends', activityController.getFriendActivities);

export default router;
