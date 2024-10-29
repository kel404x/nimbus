// userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user_controller');

// POST route to create a user
router.post('/create', createUser);

module.exports = router;
