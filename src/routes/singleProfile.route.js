import express from 'express';
import { getSingleProfile } from '../controllers/singleProfiles.controller.js';

const router = express.Router();
router.get('/singleprofile/:userId', getSingleProfile);

export default router;
