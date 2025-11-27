const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, userController.handleUpdateUserProfile);

router.put('/password', protect, userController.handleUpdateUserPassword);

module.exports = router;