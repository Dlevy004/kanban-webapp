const aiService = require('../services/aiService');

const handleGenerateDescription = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Task title is required.' });
        }

        const description = await aiService.generateTaskDescription(title);

        res.status(200).json({ description });

    } catch (error) {
        res.status(500).json({ message: error.message || 'AI generation failed.' });
    }
};

module.exports = {
    handleGenerateDescription
};
