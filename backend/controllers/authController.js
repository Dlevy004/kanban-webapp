const authService = require('../services/authService');

const handleRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password)
            return res.status(400).json({message: 'All fields are required.'});

        const {user, token} = await authService.registerUser(username, email, password);

        res.status(201).json({
            message: 'Registration successful.',
            user: user,
            token: token
        });

    } catch (error) {
        res.status(400).json({message: error.message || 'Registration failed.'})
    }
};

module.exports = {
    handleRegister
}