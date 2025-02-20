import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import SavedPost from "../models/savedPost.model.js";
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






export const savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if already saved
    const existingSave = await SavedPost.findOne({ userId, postId });
    if (existingSave) return res.status(400).json({ message: "Post already saved" });

    // Save the post
    await SavedPost.create({ userId, postId });
    res.status(200).json({ message: "Post saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch saved posts for a user
export const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedPosts = await SavedPost.find({ userId }).populate({
      path: "postId",
      model: "Post",
      select: "content category image createdAt",
    });
    console.log("Saved Posts Retrieved:", savedPosts);
    res.status(200).json(savedPosts.map((saved) => saved.postId));
  } catch (error) {
    console.error("Error in getSavedPosts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove saved post
export const removeSavedPost = async (req, res) => {
  try {



    const deleted = await SavedPost.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Post not found in saved list" });

    res.status(200).json({ message: "Post removed from saved" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });
  }
};
