import express from 'express';
import { getUserProfile } from '../controllers/userProfile.controller.js';

const router = express.Router();
router.get('/userprofile/:id', getUserProfile);

export default router;
