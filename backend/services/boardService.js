const Board = require('../models/boardModel');
const Task = require('../models/taskModel');
const Column = require('../models/columnModel');

const createBoard = async (title, ownerId) => {
    const newBoard = await Board.create({
        title,
        owner: ownerId,
        columns: []
    });

    return newBoard;
}

const readByIdBoard = async (boardId) => {
    const board = await Board.findById(boardId).populate({
        path: 'columns',
        populate: {
            path: 'tasks',
            model: 'Task'
        }
    });

    if (!board) {
        throw new Error('Board not found.');
    }

    return board;
}

const readAllBoards = async (ownerId) => {
    const boards = await Board.find({ owner: ownerId});

    return boards;
}

const updateBoard = async (boardId, updateData) => {
    const updatedBoard = await Board.findByIdAndUpdate(boardId, updateData, { new: true });
    
    if (!updatedBoard) throw new Error('Board not found.');

    return updatedBoard;
}

const deleteBoard = async (boardId) => {
    await Task.deleteMany({ board: boardId });
    await Column.deleteMany({ board: boardId });
    const result = await Board.findByIdAndDelete(boardId);

    if (!result) throw new Error('Board not found.');

    return result;
}

module.exports = {
    createBoard,
    readByIdBoard,
    readAllBoards,
    updateBoard,
    deleteBoard
}