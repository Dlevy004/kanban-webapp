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
        const userResponse = { ...newUser.toObject};
        delete userResponse.passwordHash;

        return {
            user: userResponse,
            token: generateToken(newUser._id)
        };
    } else {
        throw new Error('Invalid user data.')
    }
}

module.exports = {
    registerUser
};