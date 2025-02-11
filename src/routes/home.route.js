import express from 'express';
import { getHomeFeed } from '../controllers/home.Controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/home', protect, getHomeFeed);

export default router;
