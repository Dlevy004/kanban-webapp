const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, userController.handleUpdateUserProfile);

router.put('/password', protect, userController.handleUpdateUserPassword);

router.put('/profile-picture', protect, userController.updateProfilePicture);

module.exports = router;