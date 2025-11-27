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

const updateUserPassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select('+passwordHash');
    
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new Error('A jelenlegi jelszó hibás.');
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);

    await user.save();

    return true;
};

const updateProfilePicture = async (userId, base64Image) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { profilePictureUrl: base64Image },
        { new: true }
    ).select('-passwordHash');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

module.exports = {
    updateUserProfile,
    updateUserPassword,
    updateProfilePicture
}