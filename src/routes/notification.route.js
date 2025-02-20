import express from 'express';
import { getNotifications,sendNotification } from '../controllers/notifications.controller.js';
 

const router = express.Router();
router.get('/notifications', getNotifications);
router.post("/send", sendNotification);

export default router;
