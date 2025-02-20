import Post from '../models/post.model.js';
import User from '../models/user.model.js';


export const getHomeFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.preferences) {
      return res
        .status(400)
        .json({ message: "Complete your profile to view posts" });
    }


    // Fetch posts based on the user's preferences and populate user data
    // const posts = await Post.find({ userId: { $ne: req.user.id }, })
    const posts = await Post.find({
      category: req.user.preferences,
      userId: { $ne: req.user.id }
    })
      .populate("userId", "name profilePhoto")
      .sort({ createdAt: -1 });


    // Increment impressions count for each post
    await Promise.all(
      posts.map(async (post) => {
        post.impressions += 1;
        await post.save();
      })
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


