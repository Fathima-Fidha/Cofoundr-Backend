const express = require('express');
const { registerUser } = require('../controllers/authController');
const router = express.Router();

// Register route
router.post('/signup', registerUser);

module.exports = router;
