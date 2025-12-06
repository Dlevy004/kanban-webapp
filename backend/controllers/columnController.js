const columnService = require('../services/columnService');

exports.handleCreateColumn = async (req, res) => {
    try {
        const { title, boardId, order } = req.body;

        if (!title || !boardId) {
            return res.status(400).json({ message: 'Title and Board ID are required' });
        }

        const newColumn = await columnService.createColumn(title, boardId, order);

        res.status(201).json(newColumn);
    } catch (error) {
        console.error("Error creating column:", error);
        res.status(500).json({ message: error.message || 'Server error while creating column' });
    }
};

exports.handleDeleteColumn = async (req, res) => {
    try {
        const { id } = req.params;

        await columnService.deleteColumn(id);

        res.status(200).json({ message: 'Column deleted successfully' });
    } catch (error) {
        console.error("Error deleting column:", error);
        const status = error.message === 'Column not found' ? 404 : 500;
        res.status(status).json({ message: error.message || 'Server error while deleting column' });
    }
};

exports.handleUpdateColumn = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedColumn = await columnService.updateColumn(id, updateData);

        res.status(200).json(updatedColumn);
    } catch (error) {
        console.error("Error updating column:", error);
        const status = error.message === 'Column not found' ? 404 : 500;
        res.status(status).json({ message: error.message || 'Server error while updating column' });
    }
};
