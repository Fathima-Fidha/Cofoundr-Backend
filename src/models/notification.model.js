import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['like', 'comment', 'follow', 'message', 'interest'] }, // Added 'interest'
  message: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);

