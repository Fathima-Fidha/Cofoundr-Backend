import express from 'express';
import { exploreProfiles } from '../controllers/exploreprofiles.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/exploreprofiles', protect, exploreProfiles);

export default router;
