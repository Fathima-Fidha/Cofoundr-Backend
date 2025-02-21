import express from 'express';
import { getNotifications,sendNotification } from '../controllers/notifications.controller.js';
import { saveFcmToken } from '../controllers/notifications.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/notifications', getNotifications);
router.post("/send", sendNotification);
router.post('/notifications/save-fcm-token', protect, saveFcmToken);

export default router;
