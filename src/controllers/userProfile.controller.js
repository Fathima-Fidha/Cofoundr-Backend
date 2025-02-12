import User from '../models/user.model.js';
import Post from '../models/post.model.js';


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from JWT token

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ userId: userId });

    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

