import Notification from '../models/notification.model.js';
import { sendPushNotification } from '../config/firebase.js'; // Import the FCM function
import User from '../models/user.model.js'; // Assuming the User model contains FCM tokens


export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('post', 'title') // Optionally populate related post info
      .populate('senderId', 'name'); // Populate sender details

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message, postId } = req.body;

    // Ensure notification is being sent to the correct receiver
    const notification = await Notification.create({
      senderId,
      user: receiverId, // The user receiving the notification (post owner)
      message,
      post: postId,
      type: 'interest',
      isRead: false,
    });

     // Fetch the receiver's FCM token
     const receiver = await User.findById(receiverId);
     if (receiver?.fcmToken) {
         await sendPushNotification(receiver.fcmToken, message);
     }

    res.status(201).json(notification);
  } catch (error) {
    console.error('Failed to send notification:', error);
    res.status(500).json({ message: 'Failed to send notification' });
  }
};

export const saveFcmToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    const userId = req.user.id; // Assuming the user is authenticated

    await User.findByIdAndUpdate(userId, { fcmToken });
    res.status(200).json({ message: "FCM token saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save FCM token" });
  }
};
