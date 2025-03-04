import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import mongoose from "mongoose";

export const getSingleProfile = async (req, res) => {
  try {
    console.log("Backend Received User ID:", req.params.userId); // Debugging

    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ userId: req.params.userId }).populate("userId", "name profilePicture");

    res.status(200).json({ user, posts });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


