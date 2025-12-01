const authService = require('../services/authService');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService - registerUser', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1. teszteset: sikeres regisztráció
    it('should register a new user and return token if data is valid', async () => {
        // Arrange
        const mockData = {
            username: 'TesztElek',
            email: 'teszt@mail.com',
            password: 'password123'
        };

        User.findOne.mockResolvedValue(null);

        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword123');

        const mockCreatedUser = {
            _id: 'new_user_id',
            username: mockData.username,
            email: mockData.email,
            passwordHash: 'hashedPassword123',
            createdAt: new Date(),
            updatedAt: new Date(),
            toObject: function() { return this; }
        };
        User.create.mockResolvedValue(mockCreatedUser);

        jwt.sign.mockReturnValue('fake_jwt_token');

        // Act
        const result = await authService.registerUser(mockData.username, mockData.email, mockData.password);

        // Assert
        expect(User.create).toHaveBeenCalledWith({
            username: mockData.username,
            email: mockData.email,
            passwordHash: 'hashedPassword123'
        });

        expect(result).toHaveProperty('token', 'fake_jwt_token');
        expect(result.user).toHaveProperty('email', 'teszt@mail.com');
        expect(result.user).not.toHaveProperty('passwordHash');
    });

    // 2. teszteset: foglalt email
    it('should throw an error if email is already taken', async () => {
        // Arrange
        const mockData = {
            username: 'UjUser',
            email: 'letezo@mail.com',
            password: '123'
        };

        User.findOne.mockResolvedValueOnce({ email: 'letezo@mail.com' });

        // Act és Assert
        await expect(authService.registerUser(mockData.username, mockData.email, mockData.password))
            .rejects
            .toThrow('This email is already in use.');

        expect(User.create).not.toHaveBeenCalled();
    });
});