import express from 'express';  // Using ES6 import
import { registerUser, loginUser } from '../controllers/auth.controller.js';  // Using ES6 import and including .js extension
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;  // Use export default instead of module.exports
