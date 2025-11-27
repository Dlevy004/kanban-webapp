const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const updateUserProfile = async (userId, updateData) => {
    const allowedUpdates = {};

    if (updateData.username) allowedUpdates.username = updateData.username;
    
    const updateUser = await User.findByIdAndUpdate(
        userId,
        allowedUpdates,
        {
            new: true,
            runValidators: true
        }
    ).select('-passwordHash');

    if (!updateUser) {
        throw new Error('User not found');
    }
    
    return updateUser;
}

module.exports = {
    updateUserProfile
}