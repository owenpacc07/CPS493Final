import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/update-password', authenticateToken, userController.updatePassword);
router.get('/', authenticateToken, isAdmin, userController.getUsers);
router.get('/:id', authenticateToken, userController.getUser);

export default router;
