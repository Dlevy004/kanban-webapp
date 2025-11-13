const boardService = require('../services/boardService');

const handleCreateBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const ownerId = req.user.id;

        if (!title) throw new Error('Board title is required.');

        const newBoard = await boardService.createBoard(title, ownerId);

        res.status(201).json({
            message: 'Board created successfully.',
            board: newBoard
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Board creation failed.'
        })
    }
}

const handleReadByIdBoard = async (req, res) => {
    try {
        const boardId = req.params.id;

        const board = await boardService.readByIdBoard(boardId);

        res.status(200).json({
            message: 'Board retrieved successfully.',
            board: board
        })

    } catch (error) {
        res.status(404).json({
            message: error.message || 'Board not found.'
        })
    }
}

const handleReadAllBoards = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const board = await boardService.readAllBoards(ownerId);

        res.status(200).json({
            message: 'Boards retrieved successfully.',
            board: board
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Failed to retrieve boards.'
        })
    }
}

const handleUpdateBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        const updateData = req.body;

        const board = await boardService.updateBoard(boardId, updateData);

        res.status(200).json({
            message: 'Board update successfully.',
            board: board
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Board update failed.'
        })
    }
}

const handleDeleteBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        await boardService.deleteBoard(boardId);

        res.status(200).json({
            message: 'Board deleted successfully.'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Board deletion failed.'
        })
    }
}

module.exports = {
    handleCreateBoard,
    handleReadByIdBoard,
    handleReadAllBoards,
    handleUpdateBoard,
    handleDeleteBoard
}