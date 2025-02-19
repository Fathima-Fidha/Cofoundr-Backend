import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import mongoose from "mongoose";

// Add a new post
export const addPost = async (req, res) => {
  try {
    let { userId, content, category } = req.body;
    const image = req.file ? req.file.path : null; // Handle image upload

    if (!userId || !content || !category) {
      return res.status(400).json({ message: "User ID, content, and category are required" });
    }

    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const newPost = new Post({
      userId: new mongoose.Types.ObjectId(userId), // Ensure userId is converted properly
      content,
      category,
      image,
      impressions: 0,
    });

    await newPost.save();
    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error("Error in addPost:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Edit (Update) a Post
export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, category, image } = req.body;

    const post = await Post.findOne({ postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Update only the provided fields
    if (content) post.content = content;
    if (category) post.category = category;
    if (image) post.image = image;

    await post.save();
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({ postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
