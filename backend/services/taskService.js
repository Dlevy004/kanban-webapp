const Task = require('../models/taskModel');
const Column = require('../models/columnModel');


const createTask = async (title, description, boardId, columnId, assigneeId, dueDate) => {
    const column = await Column.findById(columnId);

    if (!column) {
        throw new Error('Column not found.');
    }

    if (column.board.toString() !== boardId.toString()) {
        throw new Error('Column does not belong to the specified board.');
    }

    const order = column.tasks.length;

    const newTask = await Task.create({
        title,
        description: description || '',
        board: boardId,
        column: columnId,
        assignee: assigneeId || null,
        dueDate: dueDate || null,
        order
    });

    column.tasks.push(newTask._id);
    await column.save();

    return newTask;
};


const readTaskById = async (taskId) => {
    const task = await Task.findById(taskId)
        .populate('column')
        .populate('assignee', '_id username email');

    if (!task) {
        throw new Error('Task not found.');
    }

    return task;
};


const readTasksByColumn = async (columnId) => {
    const tasks = await Task.find({ column: columnId })
        .sort({ order: 1 });

    return tasks;
};


const readTasksByBoard = async (boardId) => {
    const tasks = await Task.find({ board: boardId })
        .sort({ column: 1, order: 1 });

    return tasks;
};


const updateTask = async (taskId, updateData) => {
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        updateData,
        { new: true }
    );

    if (!updatedTask) {
        throw new Error('Task not found.');
    }

    return updatedTask;
};


const deleteTask = async (taskId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error('Task not found.');
    }

    await Column.findByIdAndUpdate(
        task.column,
        { $pull: { tasks: task._id } }
    );

    await Task.deleteOne({ _id: taskId });

    return { message: 'Task deleted successfully.' };
};

module.exports = {
    createTask,
    readTaskById,
    readTasksByColumn,
    readTasksByBoard,
    updateTask,
    deleteTask
};
