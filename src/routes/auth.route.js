import express from 'express';  // Using ES6 import
import { registerUser, loginUser, editUserProfile, deleteUserProfile } from '../controllers/auth.controller.js';  // Using ES6 import and including .js extension
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.put('/edit-profile', protect, editUserProfile);
router.delete('/delete-profile', protect, deleteUserProfile);

export default router;  // Use export default instead of module.exports
