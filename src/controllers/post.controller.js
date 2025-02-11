import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// Add a new post
export const addPost = async (req, res) => {
  try {
    const { userId, content, category, image } = req.body;

    if (!userId || !content || !category) {
      return res.status(400).json({ message: 'User ID, content, and category are required' });
    }

    const newPost = new Post({
      userId,
      content,
      category,
      image,
      impressions: 0, // Default impressions to 0
    });

    await newPost.save();
    res.status(201).json({ message: 'Post added successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
