const taskService = require('../services/taskService');

const handleCreateTask = async (req, res) => {
    try {
        const { title, description, boardId, columnId, assigneeId, dueDate } = req.body;

        const targetColumnId = columnId || column;

        if (!title || !boardId || !targetColumnId) {
            return res.status(400).json({ message: 'Title, boardId and columnId are required.' });
        }

        const newTask = await taskService.createTask(
            title,
            description,
            boardId,
            targetColumnId,
            assigneeId,
            dueDate
        );

        res.status(201).json({
            message: 'Task created successfully.',
            task: newTask
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Task creation failed.'
        });
    }
};


const handleReadTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await taskService.readTaskById(taskId);

        res.status(200).json({
            message: 'Task retrieved successfully.',
            task: task
        });

    } catch (error) {
        res.status(404).json({
            message: error.message || 'Task not found.'
        });
    }
};


const handleReadTasksByColumn = async (req, res) => {
    try {
        const columnId = req.params.columnId;

        const tasks = await taskService.readTasksByColumn(columnId);

        res.status(200).json({
            message: 'Tasks retrieved successfully.',
            tasks: tasks
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Failed to retrieve tasks.'
        });
    }
};


const handleReadTasksByBoard = async (req, res) => {
    try {
        const boardId = req.params.boardId;

        const tasks = await taskService.readTasksByBoard(boardId);

        res.status(200).json({
            message: 'Tasks retrieved successfully.',
            tasks: tasks
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Failed to retrieve tasks.'
        });
    }
};


const handleUpdateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { destColumnId, sourceColumnId, destIndex, ...otherUpdates } = req.body;

        let updatedTask;

        
        if (destColumnId && destIndex !== undefined && sourceColumnId) {
            updatedTask = await taskService.moveTask(
                taskId, 
                sourceColumnId, 
                destColumnId, 
                destIndex
            );
        } 
        else {
            updatedTask = await taskService.updateTask(taskId, otherUpdates);
        }

        res.status(200).json({ 
            message: 'Task updated successfully.', 
            task: updatedTask 
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(400).json({ 
            message: error.message || 'Task update failed.' 
        });
    }
};


const handleDeleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        await taskService.deleteTask(taskId);

        res.status(200).json({
            message: 'Task deleted successfully.'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || 'Task deletion failed.'
        });
    }
};


module.exports = {
    handleCreateTask,
    handleReadTaskById,
    handleReadTasksByColumn,
    handleReadTasksByBoard,
    handleUpdateTask,
    handleDeleteTask
};
