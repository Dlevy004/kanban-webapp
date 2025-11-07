const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

const registerUser = async (username, email, password) => {
    const emailExists = await User.findOne({email});
    if (emailExists) throw new Error('This email is already in use.');

    const usernameExists = await User.findOne({username});
    if (usernameExists) throw new Error('This username is already in use.')

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        passwordHash: passwordHash
    })

    if (newUser) {
        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        return {
            user: userResponse,
            token: generateToken(newUser._id)
        };
    } else {
        throw new Error('Invalid user data.')
    }
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password); 

    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }

    const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    return {
        user: userResponse,
        token: generateToken(user._id)
    };
};

module.exports = {
    registerUser,
    loginUser
};