import express from 'express';
import { exploreProfiles } from '../controllers/exploreprofiles.controller.js';

const router = express.Router();
router.get('/exploreprofiles', exploreProfiles);

export default router;
