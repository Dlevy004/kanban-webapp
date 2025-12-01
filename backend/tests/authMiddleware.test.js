const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// mock adatok
jest.mock('jsonwebtoken');
jest.mock('../models/userModel');

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
});

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    // 1. teszt
    it('should call next() if token is valid and user exists', async () => {
        req.headers.authorization = 'Bearer valid_token';
        const mockUser = { _id: 'user_123', username: 'Teszt' };
        
        jwt.verify.mockReturnValue({ id: 'user_123' });
        const mockSelect = jest.fn().mockResolvedValue(mockUser);
        User.findById.mockReturnValue({ select: mockSelect });

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('valid_token', process.env.JWT_SECRET);
        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });

    it('should set status 401 and call next(error) if no token', async () => {
        req.headers.authorization = undefined;

        try {
            await protect(req, res, next);
        } catch (error) {}

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should set status 401 and call next(error) if token is invalid', async () => {
        req.headers.authorization = 'Bearer invalid_token';
        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should set status 401 and call next(error) if user not found', async () => {
        req.headers.authorization = 'Bearer valid_token';
        jwt.verify.mockReturnValue({ id: 'unknown_user' });
        
        const mockSelect = jest.fn().mockResolvedValue(null);
        User.findById.mockReturnValue({ select: mockSelect });

        try {
            await protect(req, res, next);
        } catch (error) {}

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});