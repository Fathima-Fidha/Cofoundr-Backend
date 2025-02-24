import Interest from '../models/interest.model.js';
import Post from '../models/post.model.js';
import Notification from '../models/notification.model.js'; // Import Notification model
import { sendPushNotification } from '../config/firebase.js';


// Send Interest Controller
export const sendInterest = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Check if the post exists
        const post = await Post.findById(postId).populate('userId', 'fcmToken');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if interest has already been sent
        const existingInterest = await Interest.findOne({ postId, userId });
        console.log(post,'existing interest');
        
        if (existingInterest) {
            return res.status(400).json({ message: 'Interest already sent for this post' });
        }

        // Create a new interest
        const interest = new Interest({
            postId,
            userId,
            postOwnerId: post.userId,
        });
        
        await interest.save();

        // Send a notification to the post owner
        const notification = new Notification({
            user: post.userId, // Post owner ID
            type: 'interest', // Must match the updated enum
            message: `User ${userId} sent interest to your post`,
            post: postId,
        });

        await notification.save();

        await sendPushNotification(post.userId.fcmToken, "hello world")

        res.status(201).json({
            message: 'Interest sent successfully',
            interest,
        });
    } catch (error) {
        console.error('Error sending interest:', error);
        res.status(500).json({ message: 'Failed to send interest' });
    }
};
