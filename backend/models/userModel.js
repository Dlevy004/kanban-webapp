const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required.'],
        unique: true,
        trim: true,
        minlength: [3, 'The username must be at least 3 characters long.']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }
}, {
    timestamps: true
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
}

const User = mongoose.model('User', userSchema);
module.exports = User;