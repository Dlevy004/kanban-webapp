const Column = require('../models/columnModel');
const Board = require('../models/boardModel');
const Task = require('../models/taskModel');

const createColumn = async (title, boardId, order) => {
    const newColumn = await Column.create({
        title,
        board: boardId,
        order: order || 0,
        tasks: []
    });

    await Board.findByIdAndUpdate(
        boardId, 
        { $push: { columns: newColumn._id } }
    );

    return newColumn;
};

const deleteColumn = async (columnId) => {
    const column = await Column.findById(columnId);

    if (!column) {
        throw new Error('Column not found');
    }

    await Task.deleteMany({ column: columnId });

    await Board.findByIdAndUpdate(
        column.board,
        { $pull: { columns: columnId } }
    );

    await Column.findByIdAndDelete(columnId);

    return { message: 'Column and associated tasks deleted successfully' };
};

const updateColumn = async (columnId, updateData) => {
    const updatedColumn = await Column.findByIdAndUpdate(
        columnId,
        updateData,
        { new: true }
    );

    if (!updatedColumn) {
        throw new Error('Column not found');
    }

    return updatedColumn;
};

module.exports = {
    createColumn,
    deleteColumn,
    updateColumn
};
