const userService = require('../services/userService');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// mock adatok
jest.mock('../models/userModel');
jest.mock('bcryptjs');

describe('UserService Tesztek', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: név változtatás
    describe('updateUserProfile', () => {
        it('should update username successfully', async () => {
            // Arrange
            const userId = 'fake_user_id';
            const updateData = { username: 'UjNev' };

            const mockUpdatedUser = { _id: userId, username: 'UjNev', email: 'test@test.com' };

            const mockSelect = jest.fn().mockResolvedValue(mockUpdatedUser);
            User.findByIdAndUpdate.mockReturnValue({ select: mockSelect });

            // Act
            const result = await userService.updateUserProfile(userId, updateData);

            // Assert
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                userId, 
                { username: 'UjNev' }, 
                expect.any(Object)
            );
            expect(result).toEqual(mockUpdatedUser);
        });
    });

    // 2. teszteset: jelszó csere
    describe('updateUserPassword', () => {
        it('should update password if current password is correct', async () => {
            // arrange
            const userId = 'fake_user_id';
            const currentPassword = 'oldPassword';
            const newPassword = 'newPassword';

            const mockUserInstance = {
                _id: userId,
                passwordHash: 'oldHash',
                comparePassword: jest.fn().mockResolvedValue(true),
                save: jest.fn().mockResolvedValue(true)
            };

            const mockSelect = jest.fn().mockResolvedValue(mockUserInstance);
            User.findById.mockReturnValue({ select: mockSelect });

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('newHashedPassword');

            // act
            const result = await userService.updateUserPassword(userId, currentPassword, newPassword);

            // assert
            expect(User.findById).toHaveBeenCalledWith(userId);
            expect(mockUserInstance.comparePassword).toHaveBeenCalledWith(currentPassword);

            expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 'salt');

            expect(mockUserInstance.passwordHash).toBe('newHashedPassword');
            expect(mockUserInstance.save).toHaveBeenCalled();

            expect(result).toBe(true);
        });

        it('should throw error if current password is wrong', async () => {
            // arrange
            const mockUserInstance = {
                comparePassword: jest.fn().mockResolvedValue(false)
            };
            const mockSelect = jest.fn().mockResolvedValue(mockUserInstance);
            User.findById.mockReturnValue({ select: mockSelect });

            // act és assert
            await expect(userService.updateUserPassword('id', 'wrong', 'new'))
                .rejects
                .toThrow('A jelenlegi jelszó hibás.');
        });
    });

    // 3. teszteset: profilkép frissítése
    describe('updateProfilePicture', () => {
        it('should update profile picture successfully', async () => {
            // arrange
            const userId = 'fake_id';
            const base64Img = 'data:image/png;base64,...';
            const mockUser = { _id: userId, profilePictureUrl: base64Img };

            const mockSelect = jest.fn().mockResolvedValue(mockUser);
            User.findByIdAndUpdate.mockReturnValue({ select: mockSelect });

            // act
            const result = await userService.updateProfilePicture(userId, base64Img);

            // assert
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                userId,
                { profilePictureUrl: base64Img },
                { new: true }
            );
            expect(result).toEqual(mockUser);
        });
    });

});