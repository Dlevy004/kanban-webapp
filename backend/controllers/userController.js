const userService = require('../services/userService');

const handleUpdateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        if (!updateData.username) {
            return res.status(400)
            .json({
                message: 'Username is required for update.'
            });
        }

        const updatedUser = await userService.updateUserProfile(userId, updateData);

        res.status(200).json({
            message: 'User profile updated successfully.',
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || 'Failed to update user profile.'
        })
    }
}

const handleUpdateUserPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Minden mező kitöltése kötelező.' });
        }

        await userService.updateUserPassword(userId, currentPassword, newPassword);

        res.status(200).json({
            message: 'A jelszó sikeresen megváltozott.'
        });

    } catch (error) {
        res.status(400).json({ message: error.message || 'Hiba a jelszócsere során.' });
    }
}

module.exports = {
    handleUpdateUserProfile,
    handleUpdateUserPassword
}