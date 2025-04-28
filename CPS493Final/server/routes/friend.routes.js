import express from 'express';
import * as friendController from '../controllers/friend.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', friendController.getFriends);
router.post('/add', friendController.addFriend);
router.delete('/:friendId', friendController.removeFriend);

export default router;
