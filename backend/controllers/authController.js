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

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const { user, token } = await authService.loginUser(email, password);

        res.status(200).json({
            message: 'Login successful!',
            user: user,
            token: token
        });

    } catch (error) {
        res.status(401).json({ message: error.message || 'Login failed.' });
    }
};

module.exports = {
    handleRegister,
    handleLogin
}