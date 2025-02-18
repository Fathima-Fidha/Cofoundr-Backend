import express from 'express';
import { getUserProfile } from '../controllers/userProfile.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/user-profile', protect, getUserProfile);

export default router;
