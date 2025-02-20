import express from 'express';
const router = express.Router();
import { sendInterest } from '../controllers/interest.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

// Route to handle sending interest
router.post('/interest/:postId', protect, sendInterest);

export default router;
