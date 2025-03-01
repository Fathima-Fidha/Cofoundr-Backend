import express from 'express';
import { addPost, deletePost, editPost, savePost, getSavedPosts, removeSavedPost } from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/add-post', protect, upload.single('image'), addPost);
router.put('/edit-post/:postId', protect, upload.single('image'), editPost);
router.delete('/delete-post/:postId', protect, deletePost);

router.post("/save/:postId", protect, savePost); // Save post
router.get("/saved", protect, getSavedPosts); // Get all saved posts
router.delete("/saved/:postId", protect, removeSavedPost); // Remove saved post
export default router;


