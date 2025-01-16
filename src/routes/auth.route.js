const express = require('express');
const { registerUser } = require('../controllers/auth.controller');
const router = express.Router();

// Register route
router.post('/signup', registerUser);

module.exports = router;
