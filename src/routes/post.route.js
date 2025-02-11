import express from 'express';
import { addPost, deletePost, editPost } from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/add-post', protect, addPost);
router.put('/edit-post/:postId', protect, editPost);
router.delete('/delete-post/:postId', protect, deletePost);
export default router;


