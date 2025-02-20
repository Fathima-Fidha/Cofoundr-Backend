import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const notification = await Notification.create({ senderId, receiverId, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to send notification" });
  }
};